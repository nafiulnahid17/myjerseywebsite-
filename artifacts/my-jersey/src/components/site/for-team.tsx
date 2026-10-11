import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon, type IconName } from '@workspace/my-jersey-design/components/ui/icon';
import type { TeamStep } from './team-order-dialog';

type Props = { onStep: (step: TeamStep) => void; onTrack: () => void };

const STEPS: { title: string; text: string; icon: IconName; action: string; step: TeamStep | 'track' }[] = [
  { title: 'Upload your design', text: 'Select a PNG, JPEG, WebP or PDF reference to preview here, or start from one of our designs.', icon: 'upload', action: 'Choose design', step: 'design' },
  { title: 'Give details', text: 'Team name, contact, quantity, sizes, names and numbers.', icon: 'clipboard', action: 'Add details', step: 'details' },
  { title: 'Place order', text: 'Review your request and send it to our team on WhatsApp.', icon: 'send', action: 'Review & send', step: 'review' },
  { title: 'Track order', text: 'See requests prepared on this device and ask us for a status update.', icon: 'track', action: 'Track request', step: 'track' },
];

export function ForTeam({ onStep, onTrack }: Props) {
  return (
    <section id="team-order" className="ft-sec">
      <div className="ft rv">
        <div className="ft-head">
          <div>
            <span className="eb">For your Team</span>
            <h2>One kit. <em>Your whole squad.</em></h2>
            <p className="ft-lead">A designer-led order for clubs, schools, offices and tournaments. Tell us the idea; we shape it into a kit your team will wear with pride.</p>
          </div>
          <div className="ft-price" data-testid="text-team-price">
            <small>Starting From</small>
            <b>299<span>TK</span></b>
            <p>Final quote depends on design, quantity and fabric.</p>
          </div>
        </div>
        <ol className="ft-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="ft-step">
              <span className="ft-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="ft-ic"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Button variant="outline" size="small" onClick={() => (s.step === 'track' ? onTrack() : onStep(s.step))} data-testid={`button-team-step-${i + 1}`}>{s.action} <Icon name="arrow" /></Button>
            </li>
          ))}
        </ol>
        <div className="ft-foot">
          <Button onClick={() => onStep('design')} data-testid="button-team-start">Order for your Team <Icon name="arrow" /></Button>
          <p>Ordering continues on WhatsApp with our team. Nothing is charged on this website.</p>
        </div>
      </div>
    </section>
  );
}
