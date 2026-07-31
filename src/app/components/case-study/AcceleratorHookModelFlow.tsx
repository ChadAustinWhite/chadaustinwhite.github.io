type Mode = 'input' | 'inform' | 'both';
type NodeKind = 'milestone' | 'step' | 'decision';

type FlowNode = {
  id: string;
  label: string;
  kind: NodeKind;
  mode?: Mode;
};

function ModeTag({ mode }: { mode: Mode }) {
  if (mode === 'both') {
    return (
      <span className="accelerator-hook__modes" aria-hidden>
        <span className="accelerator-hook__mode accelerator-hook__mode--input">Input</span>
        <span className="accelerator-hook__mode accelerator-hook__mode--inform">Inform</span>
      </span>
    );
  }

  return (
    <span className={`accelerator-hook__mode accelerator-hook__mode--${mode}`} aria-hidden>
      {mode === 'input' ? 'Input' : 'Inform'}
    </span>
  );
}

function Node({ node }: { node: FlowNode }) {
  return (
    <div
      className={`accelerator-hook__node accelerator-hook__node--${node.kind}`}
      data-node={node.id}
    >
      <span className="accelerator-hook__node-label">{node.label}</span>
      {node.mode ? <ModeTag mode={node.mode} /> : null}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="accelerator-hook__arrow" aria-hidden>
      <svg viewBox="0 0 40 16" width="40" height="16" fill="none">
        <path
          d="M1 8h32M28 3l7 5-7 5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 3"
        />
      </svg>
      {label ? <span className="accelerator-hook__arrow-label">{label}</span> : null}
    </div>
  );
}

function BranchFork() {
  return (
    <div className="accelerator-hook__fork" aria-hidden>
      <svg viewBox="0 0 28 56" width="22" height="48" fill="none">
        <path
          d="M2 28h10M12 28c8 0 8-16 8-16M20 12h6M12 28c8 0 8 16 8 16M20 44h6"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}

/** Hook Model user-flow diagram for Accelerator create → report → recreate. */
export function AcceleratorHookModelFlow() {
  return (
    <figure
      className="accelerator-hook"
      aria-label="Accelerator Hook Model user flow diagram across Trigger, Action, Variable reward, and Investment"
    >
      <div className="accelerator-hook__top">
        <p className="accelerator-hook__eyebrow">Hook model · user flow</p>
        <ul className="accelerator-hook__legend" aria-label="Node types">
          <li>
            <span className="accelerator-hook__swatch accelerator-hook__swatch--milestone" />
            Milestone
          </li>
          <li>
            <span className="accelerator-hook__swatch accelerator-hook__swatch--step" />
            Step
          </li>
          <li>
            <span className="accelerator-hook__mode accelerator-hook__mode--input">Input</span>
            Partner action
          </li>
          <li>
            <span className="accelerator-hook__mode accelerator-hook__mode--inform">Inform</span>
            System guidance
          </li>
        </ul>
      </div>

      <div
        className="accelerator-hook__viewport"
        tabIndex={0}
        role="region"
        aria-label="Scrollable Accelerator user flow"
      >
        <div className="accelerator-hook__canvas">
          <div className="accelerator-hook__lanes">
            <section className="accelerator-hook__lane" aria-label="Trigger">
              <header className="accelerator-hook__phase-header">
                <span className="accelerator-hook__phase-num">1</span>
                <span className="accelerator-hook__phase-title">Trigger</span>
              </header>
              <Node node={{ id: 'new-user', label: 'New user', kind: 'milestone' }} />
              <div className="accelerator-hook__split">
                <BranchFork />
                <div className="accelerator-hook__split-paths">
                  <Node
                    node={{
                      id: 'direct',
                      label: 'Direct path to product',
                      kind: 'step',
                      mode: 'input',
                    }}
                  />
                  <Node
                    node={{
                      id: 'marketing',
                      label: 'Product marketing',
                      kind: 'step',
                      mode: 'inform',
                    }}
                  />
                </div>
              </div>
              <div className="accelerator-hook__merge" aria-hidden>
                <svg viewBox="0 0 28 56" width="22" height="48" fill="none">
                  <path
                    d="M2 12h6M2 44h6M8 12c8 0 8 16 8 16s0 16-8 16M16 28h10"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeDasharray="3 3"
                  />
                </svg>
              </div>
              <Node
                node={{
                  id: 'start-create',
                  label: 'Start creation process',
                  kind: 'milestone',
                  mode: 'both',
                }}
              />
            </section>

            <div className="accelerator-hook__lane-join" aria-hidden>
              <Arrow />
            </div>

            <section className="accelerator-hook__lane accelerator-hook__lane--action" aria-label="Action">
              <header className="accelerator-hook__phase-header">
                <span className="accelerator-hook__phase-num">2</span>
                <span className="accelerator-hook__phase-title">Action</span>
              </header>
              <div className="accelerator-hook__cluster">
                <p className="accelerator-hook__cluster-label">Configure</p>
                <div className="accelerator-hook__cluster-grid">
                  <Node
                    node={{
                      id: 'stay-dates',
                      label: 'Select stay dates',
                      kind: 'step',
                      mode: 'input',
                    }}
                  />
                  <Node
                    node={{
                      id: 'margin',
                      label: 'Select margin',
                      kind: 'step',
                      mode: 'input',
                    }}
                  />
                  <Node
                    node={{
                      id: 'recs',
                      label: 'Recommendation system',
                      kind: 'step',
                      mode: 'inform',
                    }}
                  />
                  <Node
                    node={{
                      id: 'comp-set',
                      label: 'Competitive set',
                      kind: 'step',
                      mode: 'inform',
                    }}
                  />
                </div>
              </div>
              <Arrow />
              <Node
                node={{
                  id: 'preview',
                  label: 'Preview sort simulation',
                  kind: 'step',
                  mode: 'inform',
                }}
              />
              <Arrow />
              <div className="accelerator-hook__row">
                <Node
                  node={{
                    id: 'summary',
                    label: 'Summary',
                    kind: 'step',
                    mode: 'inform',
                  }}
                />
                <Node
                  node={{
                    id: 'delete',
                    label: 'Delete',
                    kind: 'decision',
                    mode: 'input',
                  }}
                />
              </div>
              <Arrow />
              <Node
                node={{
                  id: 'launch',
                  label: 'Launch',
                  kind: 'milestone',
                  mode: 'both',
                }}
              />
            </section>

            <div className="accelerator-hook__lane-join" aria-hidden>
              <Arrow />
            </div>

            <section className="accelerator-hook__lane accelerator-hook__lane--reward" aria-label="Variable reward">
              <header className="accelerator-hook__phase-header">
                <span className="accelerator-hook__phase-num">3</span>
                <span className="accelerator-hook__phase-title">Variable reward</span>
              </header>
              <Node
                node={{
                  id: 'reporting',
                  label: 'Reporting on past campaigns',
                  kind: 'milestone',
                }}
              />
              <div className="accelerator-hook__hub-lines" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className="accelerator-hook__satellites" aria-label="Campaign management actions">
                <Node
                  node={{
                    id: 'favorite',
                    label: 'Favorite / Save',
                    kind: 'step',
                    mode: 'input',
                  }}
                />
                <Node
                  node={{
                    id: 'duplicate',
                    label: 'Duplicate & relaunch',
                    kind: 'step',
                    mode: 'input',
                  }}
                />
                <Node
                  node={{
                    id: 'export',
                    label: 'Export reports',
                    kind: 'step',
                    mode: 'input',
                  }}
                />
                <Node
                  node={{
                    id: 'pause',
                    label: 'Pause',
                    kind: 'step',
                    mode: 'input',
                  }}
                />
                <Node
                  node={{
                    id: 'social',
                    label: 'Social signifiers',
                    kind: 'step',
                    mode: 'inform',
                  }}
                />
                <Node
                  node={{
                    id: 'reward-comp',
                    label: 'Competitive set',
                    kind: 'step',
                    mode: 'inform',
                  }}
                />
                <Node
                  node={{
                    id: 'guidance',
                    label: 'Guidance and coaching',
                    kind: 'step',
                    mode: 'inform',
                  }}
                />
              </div>
            </section>

            <div className="accelerator-hook__lane-join" aria-hidden>
              <Arrow label="loop" />
            </div>

            <section className="accelerator-hook__lane accelerator-hook__lane--invest" aria-label="Investment">
              <header className="accelerator-hook__phase-header">
                <span className="accelerator-hook__phase-num">4</span>
                <span className="accelerator-hook__phase-title">Investment</span>
              </header>
              <Node
                node={{
                  id: 'reinvest',
                  label: 'Start creation process',
                  kind: 'milestone',
                  mode: 'input',
                }}
              />
              <p className="accelerator-hook__loop-note">
                Performance insight pulls partners back into create—closing the habit loop.
              </p>
            </section>
          </div>
        </div>
      </div>
    </figure>
  );
}
