import { Heart } from 'lucide-react';

export default function Footer({ dark }) {
  return (
    <footer className={`border-t py-6 text-center text-sm ${
      dark ? 'border-dark-border text-dark-text-secondary' : 'border-border text-text-secondary'
    }`}>
      © {new Date().getFullYear()} Brain Tumor Classifier. All rights reserved. <Heart className="inline w-3.5 h-3.5 text-primary -mt-0.5" />
    </footer>
  );
}
