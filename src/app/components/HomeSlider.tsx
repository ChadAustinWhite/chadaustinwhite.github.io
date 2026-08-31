import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { homeSliderSlides, HOME_SLIDER_HERO_IMG, type HomeSliderSlide } from '../data/homeSliderSlides';
import type { CaseStudyRoute } from '../data/portfolioData';
import { canNavigateToCaseStudyRoute } from '../lib/caseStudyNavigation';
import '../../styles/home-slider.css';

const CONFIG = {
  minHeight: 1.25,
  maxHeight: 1.25,
  aspectRatio: 1.5,
  gap: 0.14,
  smoothing: 0.05,
  distortionStrength: 2.5,
  distortionSmoothing: 0.1,
  momentumFriction: 0.95,
  momentumThreshold: 0.001,
  wheelSpeed: 0.01,
  wheelMax: 150,
  dragSpeed: 0.01,
  dragMomentum: 0.01,
  touchSpeed: 0.01,
  touchMomentum: 0.1,
} as const;

const zeroPad = (n: number) => String(n).padStart(2, '0');

const wrap = (value: number, range: number) => ((value % range) + range) % range;

const heroSlideIndex = homeSliderSlides.findIndex((slide) => slide.img === HOME_SLIDER_HERO_IMG);
const initialSlideIndex = heroSlideIndex >= 0 ? heroSlideIndex : 0;

interface HomeSliderProps {
  onViewCaseStudy: (route: CaseStudyRoute) => void;
}

export function HomeSlider({ onViewCaseStudy }: HomeSliderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onViewCaseStudyRef = useRef(onViewCaseStudy);
  const [activeTitle, setActiveTitle] = useState(
    homeSliderSlides[initialSlideIndex]?.name ?? '',
  );
  const [activeCount, setActiveCount] = useState(
    homeSliderSlides.length
      ? `${zeroPad(initialSlideIndex + 1)} / ${zeroPad(homeSliderSlides.length)}`
      : '',
  );

  onViewCaseStudyRef.current = onViewCaseStudy;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const viewport = canvas.parentElement;
    if (!viewport) return;

    const getViewSize = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        width: rect.width || window.innerWidth,
        height: rect.height || window.innerHeight,
      };
    };

    const pointerToNdc = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const resizeRenderer = () => {
      const { width, height } = getViewSize();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slides = homeSliderSlides;
    const totalSlides = slides.length;

    const slideHeights = Array.from(
      { length: totalSlides },
      () => CONFIG.minHeight + Math.random() * (CONFIG.maxHeight - CONFIG.minHeight),
    );

    const slideOffsets: number[] = Array(totalSlides).fill(0);
    let loopLength = 1;
    let halfLoop = 0.5;
    const meshes: THREE.Mesh[] = [];
    let hasUserScrolled = false;
    let scrollPosition = 0;
    let scrollTarget = 0;
    let activeSlideIndex = -1;

    const updateActiveSlide = (index: number) => {
      if (index === activeSlideIndex) return;
      activeSlideIndex = index;
      const slide = slides[index];
      setActiveTitle(slide.name);
      setActiveCount(`${zeroPad(index + 1)} / ${zeroPad(totalSlides)}`);

      const route = slide.route;
      canvas.classList.toggle('home-slider__canvas--clickable', canNavigateToCaseStudyRoute(route));
    };

    const applyHeroScroll = () => {
      if (hasUserScrolled || heroSlideIndex < 0) return;
      scrollPosition = slideOffsets[heroSlideIndex];
      scrollTarget = slideOffsets[heroSlideIndex];
      updateActiveSlide(heroSlideIndex);
    };

    const rebuildStack = () => {
      let stackPosition = 0;
      for (let i = 0; i < totalSlides; i++) {
        const visualHeight = slideHeights[i] * (meshes[i]?.scale.y || 1);
        if (i === 0) {
          slideOffsets[i] = 0;
          stackPosition = visualHeight / 2;
        } else {
          stackPosition += CONFIG.gap + visualHeight / 2;
          slideOffsets[i] = stackPosition;
          stackPosition += visualHeight / 2;
        }
        if (meshes[i]) {
          meshes[i].userData.offset = slideOffsets[i];
        }
      }
      const firstHeight = slideHeights[0] * (meshes[0]?.scale.y || 1);
      loopLength = stackPosition + CONFIG.gap + firstHeight / 2;
      halfLoop = loopLength / 2;
      applyHeroScroll();
    };

    rebuildStack();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(getViewSize().width, getViewSize().height, false);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414);

    const initialSize = getViewSize();
    const camera = new THREE.PerspectiveCamera(
      45,
      initialSize.width / initialSize.height,
      0.1,
      100,
    );
    camera.position.z = 5;

    const textureLoader = new THREE.TextureLoader();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    for (let i = 0; i < totalSlides; i++) {
      const height = slideHeights[i];
      const width = height * CONFIG.aspectRatio;
      const geometry = new THREE.PlaneGeometry(width, height, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x999999,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.userData = {
        originalVertices: [...geometry.attributes.position.array],
        offset: slideOffsets[i],
        slide: slides[i] as HomeSliderSlide,
        index: i,
      };

      textureLoader.load(slides[i].img, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;

        const imageAspect = texture.image.width / texture.image.height;
        const planeAspect = width / height;
        const ratio = imageAspect / planeAspect;

        if (ratio > 1) mesh.scale.y = 1 / ratio;
        else mesh.scale.x = ratio;

        rebuildStack();
      });

      scene.add(mesh);
      meshes.push(mesh);
    }

    rebuildStack();

    const applyDistortion = (mesh: THREE.Mesh, positionY: number, strength: number) => {
      const positions = mesh.geometry.attributes.position;
      const original = mesh.userData.originalVertices as Float32Array | number[];

      for (let i = 0; i < positions.count; i++) {
        const x = original[i * 3];
        const y = original[i * 3 + 1];
        const distance = Math.sqrt(x * x + (positionY + y) ** 2);
        const falloff = Math.max(0, 1 - distance / 2);
        const bend = Math.pow(Math.sin((falloff * Math.PI) / 2), 1.5);
        positions.setZ(i, bend * strength);
      }

      positions.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    };

    let scrollMomentum = 0;
    let isScrolling = false;
    let lastFrameTime = 0;
    let animationId = 0;

    let distortionAmount = 0;
    let distortionTarget = 0;
    let velocityPeak = 0;
    let scrollDirection = 0;
    let directionTarget = 0;
    const velocityHistory = [0, 0, 0, 0, 0];

    let isDragging = false;
    let dragStartY = 0;
    let dragDelta = 0;
    let pointerDownY = 0;
    let pointerMoved = false;

    let touchStartY = 0;
    let touchLastY = 0;

    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
    let momentumTimeout: ReturnType<typeof setTimeout> | undefined;

    const addDistortionBurst = (amount: number) => {
      distortionTarget = Math.min(1, distortionTarget + amount);
    };

    const navigateFromPointer = (clientX: number, clientY: number) => {
      pointerToNdc(clientX, clientY);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(meshes);
      if (!hits.length) return;

      const slide = hits[0].object.userData.slide as HomeSliderSlide | undefined;
      if (canNavigateToCaseStudyRoute(slide?.route)) {
        onViewCaseStudyRef.current(slide.route);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      hasUserScrolled = true;
      const clampedDelta =
        Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), CONFIG.wheelMax);
      addDistortionBurst(Math.abs(clampedDelta) * 0.001);
      scrollTarget += clampedDelta * CONFIG.wheelSpeed;
      isScrolling = true;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const onTouchStart = (e: TouchEvent) => {
      hasUserScrolled = true;
      touchStartY = touchLastY = e.touches[0].clientY;
      isScrolling = false;
      scrollMomentum = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = e.touches[0].clientY - touchLastY;
      touchLastY = e.touches[0].clientY;
      addDistortionBurst(Math.abs(deltaY) * 0.02);
      scrollTarget -= deltaY * CONFIG.touchSpeed;
      isScrolling = true;
    };

    const onTouchEnd = () => {
      const swipeVelocity = (touchLastY - touchStartY) * 0.005;
      if (Math.abs(swipeVelocity) > 0.5) {
        scrollMomentum = -swipeVelocity * CONFIG.touchMomentum;
        addDistortionBurst(Math.abs(swipeVelocity) * 0.45);
        isScrolling = true;
        clearTimeout(momentumTimeout);
        momentumTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      hasUserScrolled = true;
      isDragging = true;
      dragStartY = e.clientY;
      pointerDownY = e.clientY;
      pointerMoved = false;
      dragDelta = 0;
      scrollMomentum = 0;
      canvas.classList.remove('home-slider__canvas--grab', 'home-slider__canvas--clickable');
      canvas.classList.add('home-slider__canvas--grabbing');
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      if (Math.abs(e.clientY - pointerDownY) > 4) pointerMoved = true;

      const deltaY = e.clientY - dragStartY;
      dragStartY = e.clientY;
      dragDelta = deltaY;
      addDistortionBurst(Math.abs(deltaY) * 0.02);
      scrollTarget -= deltaY * CONFIG.dragSpeed;
      isScrolling = true;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.classList.remove('home-slider__canvas--grabbing');
      canvas.classList.add('home-slider__canvas--grab');

      if (!pointerMoved) {
        navigateFromPointer(e.clientX, e.clientY);
      } else if (Math.abs(dragDelta) > 2) {
        scrollMomentum = -dragDelta * CONFIG.dragMomentum;
        addDistortionBurst(Math.abs(dragDelta) * 0.005);
        isScrolling = true;
        clearTimeout(momentumTimeout);
        momentumTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      }

      const route = slides[activeSlideIndex]?.route;
      canvas.classList.toggle('home-slider__canvas--clickable', canNavigateToCaseStudyRoute(route));
    };

    const onResize = () => {
      resizeRenderer();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resizeRenderer();
          })
        : null;
    resizeObserver?.observe(viewport);
    requestAnimationFrame(resizeRenderer);

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = lastFrameTime ? (time - lastFrameTime) / 1000 : 0.016;
      lastFrameTime = time;

      const previousScroll = scrollPosition;

      if (isScrolling) {
        scrollTarget += scrollMomentum;
        scrollMomentum *= CONFIG.momentumFriction;
        if (Math.abs(scrollMomentum) < CONFIG.momentumThreshold) scrollMomentum = 0;
      }

      scrollPosition += (scrollTarget - scrollPosition) * CONFIG.smoothing;

      const frameDelta = scrollPosition - previousScroll;

      if (Math.abs(frameDelta) > 0.00001) {
        directionTarget = frameDelta > 0 ? 1 : -1;
      }
      scrollDirection += (directionTarget - scrollDirection) * 0.08;

      const velocity = Math.abs(frameDelta) / deltaTime;
      velocityHistory.push(velocity);
      velocityHistory.shift();
      const averageVelocity =
        velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;

      if (averageVelocity > velocityPeak) velocityPeak = averageVelocity;

      const isDecelerating =
        averageVelocity / (velocityPeak + 0.001) < 0.7 && velocityPeak > 0.5;
      velocityPeak *= 0.99;

      if (velocity > 0.05) {
        distortionTarget = Math.max(distortionTarget, Math.min(1, velocity * 0.1));
      }
      if (isDecelerating || averageVelocity < 0.2) {
        distortionTarget *= isDecelerating ? 0.95 : 0.855;
      }

      distortionAmount +=
        (distortionTarget - distortionAmount) * CONFIG.distortionSmoothing;

      const signedDistortion = reduceMotion ? 0 : distortionAmount * scrollDirection;

      let closestDistance = Infinity;
      let closestIndex = 0;

      meshes.forEach((mesh) => {
        const { offset } = mesh.userData as { offset: number };
        let y = -(offset - wrap(scrollPosition, loopLength));
        y = wrap(y + halfLoop, loopLength) - halfLoop;
        mesh.position.y = y;
        mesh.renderOrder = 1000 - Math.round(Math.abs(y) * 100);

        if (Math.abs(y) < closestDistance) {
          closestDistance = Math.abs(y);
          closestIndex = (mesh.userData as { index: number }).index;
        }

        if (Math.abs(y) < halfLoop + CONFIG.maxHeight) {
          applyDistortion(mesh, y, CONFIG.distortionStrength * signedDistortion);
        }
      });

      updateActiveSlide(closestIndex);
      renderer.render(scene, camera);
    };

    canvas.classList.add('home-slider__canvas--grab');
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(scrollTimeout);
      clearTimeout(momentumTimeout);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', onResize);

      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.map?.dispose();
        material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section className="home-slider" aria-label="Work">
      <div className="home-slider__about">
        <div className="home-slider__block home-slider__block--tl">
          <p>I&apos;m Chad 👋</p>
          <p className="home-slider__lead">
            I turn complex problems into experiences
            <br />
            people understand, trust, and remember.
          </p>
          <dl>
            <dt>Currently</dt>
            <dd>Product Designer</dd>
            <dd>Expedia Group</dd>
            <dd>Los Angeles, CA</dd>
          </dl>
        </div>
        <div className="home-slider__block home-slider__block--tr">
          <dl>
            <dt>Expertise</dt>
            <dd>0→1 product development</dd>
            <dd>Human-centered design</dd>
            <dd>Cross-functional leadership</dd>
          </dl>
          <dl>
            <dt>Impact</dt>
            <dd>$300M gross revenue</dd>
            <dd>+30% search visibility</dd>
            <dd>72.4K active users</dd>
          </dl>
        </div>
      </div>

      <div className="home-slider__viewport">
        <canvas ref={canvasRef} className="home-slider__canvas" aria-hidden />
      </div>

      <div className="home-slider__info" aria-live="polite">
        <p>{activeTitle}</p>
        <p>{activeCount}</p>
      </div>
    </section>
  );
}
