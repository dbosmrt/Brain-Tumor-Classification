import { Brain, Sun, Moon, Info } from 'lucide-react';

export default function Navbar({ dark, setDark }) {
  const navLinks = ['Home', 'About', 'How It Works', 'Contact'];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${
      dark ? 'bg-dark-bg/80 border-dark-border' : 'bg-white/80 border-border'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className={`text-lg font-bold ${dark ? 'text-dark-text' : 'text-text'}`}>
            Brain Tumor <span className="text-primary">Classifier</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium transition-colors ${
                i === 0
                  ? 'text-primary'
                  : dark
                    ? 'text-dark-text-secondary hover:text-dark-text'
                    : 'text-text-secondary hover:text-text'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              dark ? 'hover:bg-dark-surface text-dark-text-secondary' : 'hover:bg-gray-100 text-text-secondary'
            }`}
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
            dark
              ? 'border-dark-border text-dark-text hover:bg-dark-surface'
              : 'border-border text-text hover:bg-gray-50'
          }`}>
            <Info className="w-4 h-4" /> About Model
          </button>
        </div>
      </div>
    </nav>
  );
}
