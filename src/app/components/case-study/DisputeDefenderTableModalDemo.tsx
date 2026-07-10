import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronDown, Info, ShieldCheck, X } from 'lucide-react';

type ResponderCell = 'dash' | 'chip' | 'text';

interface DisputeRow {
  caseId: string;
  amount: string;
  status: string;
  responder: { type: ResponderCell; value?: string };
  updated: string;
}

const TABLE_ROWS: DisputeRow[] = [
  { caseId: 'DD-1042', amount: '$1,240.00', status: 'Open', responder: { type: 'dash' }, updated: 'Jul 8' },
  {
    caseId: 'DD-1041',
    amount: '$890.50',
    status: 'In review',
    responder: { type: 'chip' },
    updated: 'Jul 7',
  },
  {
    caseId: 'DD-1040',
    amount: '$2,105.00',
    status: 'Submitted',
    responder: { type: 'chip' },
    updated: 'Jul 7',
  },
  {
    caseId: 'DD-1039',
    amount: '$475.25',
    status: 'Won',
    responder: { type: 'chip' },
    updated: 'Jul 6',
  },
  {
    caseId: 'DD-1038',
    amount: '$3,420.00',
    status: 'Won',
    responder: { type: 'chip' },
    updated: 'Jul 5',
  },
  { caseId: 'DD-1037', amount: '$612.00', status: 'Open', responder: { type: 'dash' }, updated: 'Jul 5' },
  {
    caseId: 'DD-1036',
    amount: '$1,890.00',
    status: 'Assigned',
    responder: { type: 'text', value: 'Bill Gates' },
    updated: 'Jul 4',
  },
  {
    caseId: 'DD-1035',
    amount: '$220.00',
    status: 'Assigned',
    responder: { type: 'text', value: 'Bill Gates' },
    updated: 'Jul 4',
  },
];

const RECOVERIES = [
  {
    title: 'Caught duplicate merchant charge',
    subtitle: 'Auto-resolved in 2 days · June 3, 2026',
    amount: '+$4,200.00',
  },
  {
    title: 'Recovered friendly fraud dispute',
    subtitle: 'Auto-resolved in 4 days · June 12, 2026',
    amount: '+$1,850.00',
  },
  {
    title: 'Prevented chargeback on subscription',
    subtitle: 'Auto-resolved in 1 day · June 18, 2026',
    amount: '+$980.00',
  },
  {
    title: 'Matched delivery proof to claim',
    subtitle: 'Auto-resolved in 3 days · June 24, 2026',
    amount: '+$720.00',
  },
];

const NAV_ITEMS = ['Home', 'Transactions', 'Disputes', 'Reports', 'Settings'];

type DemoPhase = 'table' | 'overlay' | 'modal';

const PHASE_MS: Record<DemoPhase, number> = {
  table: 1800,
  overlay: 700,
  modal: 5200,
};

function DisputeDefenderChip() {
  return (
    <span className="dd-table-demo__chip">
      <ShieldCheck className="dd-table-demo__chip-icon" aria-hidden />
      Dispute Defender
    </span>
  );
}

function ResponderCellContent({ cell }: { cell: DisputeRow['responder'] }) {
  if (cell.type === 'dash') {
    return <span className="dd-table-demo__cell-muted">-</span>;
  }
  if (cell.type === 'chip') {
    return <DisputeDefenderChip />;
  }
  return <span className="dd-table-demo__cell-text">{cell.value}</span>;
}

function PerformanceModal({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="dd-table-demo__modal"
      role="dialog"
      aria-label="Dispute Defender performance summary"
      aria-hidden={!visible}
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.96, y: 12 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dd-table-demo__modal-header">
        <div className="dd-table-demo__modal-title-row">
          <div className="dd-table-demo__modal-shield" aria-hidden>
            <ShieldCheck className="dd-table-demo__modal-shield-icon" />
          </div>
          <button type="button" className="dd-table-demo__modal-close" aria-label="Close" tabIndex={-1}>
            <X className="dd-table-demo__modal-close-icon" />
          </button>
        </div>
        <h3 className="dd-table-demo__modal-title">Dispute Defender™ performance summary</h3>
        <p className="dd-table-demo__modal-lead">
          Dispute Defender™ automatically protected <strong>$44,650</strong> and resolved{' '}
          <strong>147</strong> disputes on your behalf in July.
        </p>
      </div>

      <div className="dd-table-demo__metrics">
        <div className="dd-table-demo__metric-card">
          <p className="dd-table-demo__metric-label">Sales protected</p>
          <p className="dd-table-demo__metric-value">+$44,650</p>
        </div>
        <div className="dd-table-demo__metric-card">
          <p className="dd-table-demo__metric-label">Time saved</p>
          <p className="dd-table-demo__metric-value">~500 hrs</p>
        </div>
        <div className="dd-table-demo__metric-card">
          <p className="dd-table-demo__metric-label">Disputes handled</p>
          <p className="dd-table-demo__metric-value">147</p>
        </div>
      </div>

      <div className="dd-table-demo__modal-section">
        <h4 className="dd-table-demo__section-title">What Dispute Defender™ did this month</h4>
        <ul className="dd-table-demo__bullet-list">
          <li>Protected <strong>$24,650</strong> sales for July 2026.</li>
          <li>Monitored <strong>147 disputes</strong> across all your transactions.</li>
          <li>Filed <strong>150 dispute claims</strong> with card networks.</li>
        </ul>
      </div>

      <div className="dd-table-demo__modal-section">
        <h4 className="dd-table-demo__section-title">Top recoveries</h4>
        <ul className="dd-table-demo__recoveries">
          {RECOVERIES.map((item) => (
            <li key={item.title} className="dd-table-demo__recovery">
              <div className="dd-table-demo__recovery-copy">
                <p className="dd-table-demo__recovery-title">{item.title}</p>
                <p className="dd-table-demo__recovery-subtitle">{item.subtitle}</p>
              </div>
              <p className="dd-table-demo__recovery-amount">{item.amount}</p>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="dd-table-demo__modal-cta" tabIndex={-1}>
        Close
      </button>
    </motion.div>
  );
}

export function DisputeDefenderTableModalDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, once: false });
  const [phase, setPhase] = useState<DemoPhase>('table');

  useEffect(() => {
    if (!inView) {
      setPhase('table');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('modal');
      return;
    }

    const sequence: DemoPhase[] = ['table', 'overlay', 'modal', 'overlay', 'table'];
    let index = 0;
    let timeoutId = 0;

    const advance = () => {
      index = (index + 1) % sequence.length;
      setPhase(sequence[index]);
      timeoutId = window.setTimeout(advance, PHASE_MS[sequence[index]]);
    };

    timeoutId = window.setTimeout(advance, PHASE_MS.table);

    return () => window.clearTimeout(timeoutId);
  }, [inView]);

  const showOverlay = phase === 'overlay' || phase === 'modal';
  const showModal = phase === 'modal';

  return (
    <div ref={rootRef} className="dd-table-demo" data-phase={phase}>
      <div className="dd-table-demo__shell" aria-hidden={showModal}>
        <aside className="dd-table-demo__sidebar">
          <p className="dd-table-demo__brand">worldpay for platforms</p>
          <nav className="dd-table-demo__nav">
            {NAV_ITEMS.map((item) => (
              <span
                key={item}
                className={`dd-table-demo__nav-item${item === 'Disputes' ? ' dd-table-demo__nav-item--active' : ''}`}
              >
                {item}
              </span>
            ))}
          </nav>
        </aside>

        <div className="dd-table-demo__main">
          <header className="dd-table-demo__page-header">
            <h3 className="dd-table-demo__page-title">Disputes</h3>
            <p className="dd-table-demo__page-subtitle">Monitor open cases and automated responses</p>
          </header>

          <div className="dd-table-demo__table-wrap">
            <table className="dd-table-demo__table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>
                    <span className="dd-table-demo__th-content">
                      Responder
                      <Info className="dd-table-demo__th-icon" aria-hidden />
                      <ChevronDown className="dd-table-demo__th-icon" aria-hidden />
                    </span>
                  </th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr key={row.caseId}>
                    <td>{row.caseId}</td>
                    <td>{row.amount}</td>
                    <td>
                      <span className="dd-table-demo__status">{row.status}</span>
                    </td>
                    <td>
                      <ResponderCellContent cell={row.responder} />
                    </td>
                    <td className="dd-table-demo__cell-muted">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          className="dd-table-demo__overlay"
          aria-hidden={!showOverlay}
          initial={false}
          animate={{ opacity: showOverlay ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        <div className="dd-table-demo__modal-layer">
          <PerformanceModal visible={showModal} />
        </div>
      </div>

      <p className="dd-table-demo__caption">
        Performance summary surfaces over the disputes table so operators see impact without leaving their workflow.
      </p>
    </div>
  );
}
