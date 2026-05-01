import { Shield, Zap, Clock, HeartPulse } from 'lucide-react';

const features = [
  { icon: Shield,     title: 'Secure & Private',     desc: 'Your data is encrypted and handled with care' },
  { icon: Zap,        title: 'AI-Powered',           desc: 'Advanced deep learning model for accurate results' },
  { icon: Clock,      title: 'Fast Results',         desc: 'Get results in seconds, not hours' },
  { icon: HeartPulse, title: 'Clinically Inspired',  desc: 'Built with medical standards in mind' },
];

export default function FeatureBar({ dark }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border p-5 ${
      dark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'
    }`}>
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            dark ? 'bg-primary/20' : 'bg-blue-50'
          }`}>
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className={`text-sm font-semibold ${dark ? 'text-dark-text' : 'text-text'}`}>{title}</p>
            <p className={`text-xs leading-snug ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
