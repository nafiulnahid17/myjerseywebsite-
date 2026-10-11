import { Icon, ICON_NAMES } from '../../components/ui/icon';

export default function IconDemo() {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    {ICON_NAMES.map(name=><div key={name} className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <Icon name={name} className="text-primary"/><span className="text-sm">{name}</span>
    </div>)}
  </div>;
}
