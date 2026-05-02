import { useState } from 'react';
import { Sparkles, Lock, Loader2 } from 'lucide-react';
import { predictTumor } from './services/api';
import Navbar from './components/Navbar';
import UploadBox from './components/UploadBox';
import ResultCard from './components/ResultCard';
import FeatureBar from './components/FeatureBar';
import Footer from './components/Footer';

export default function App() {
  const [dark, setDark] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await predictTumor(file);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  return (
    <div className={`min-h-screen flex flex-col ${dark ? 'bg-dark-bg' : 'bg-surface-alt'}`}>
      <Navbar dark={dark} setDark={setDark} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* Hero */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">🧠</span>
          </div>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${dark ? 'text-dark-text' : 'text-text'}`}>
              AI-Powered Brain Tumor Classification
            </h1>
            <p className={`text-sm mt-1 max-w-lg ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
              Upload an MRI scan and our advanced AI model will analyze it to help identify the type of brain tumor.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT — Upload panel (3/5) */}
          <div className="lg:col-span-3 space-y-5">
            <UploadBox file={file} setFile={setFile} dark={dark} />

            {/* Analyze button */}
            <button
              onClick={analyze}
              disabled={!file || loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold transition-all cursor-pointer ${
                !file || loading
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-gradient-to-r from-primary to-blue-700 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Analyze Scan</>
              )}
            </button>

            {/* Error */}
            {error && (
              <p className="text-sm text-danger text-center">{error}</p>
            )}

            {/* Security note */}
            <p className={`text-xs text-center flex items-center justify-center gap-1.5 ${
              dark ? 'text-dark-text-secondary' : 'text-text-secondary'
            }`}>
              <Lock className="w-3.5 h-3.5" /> Your data is secure and will not be stored.
            </p>

            <FeatureBar dark={dark} />
          </div>

          {/* RIGHT — Result panel (2/5) */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className={`rounded-2xl border p-12 flex flex-col items-center gap-4 ${
                dark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'
              }`}>
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className={`text-sm font-medium ${dark ? 'text-dark-text' : 'text-text'}`}>
                  Analyzing your MRI scan...
                </p>
                <p className={`text-xs ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                  This may take a few seconds.
                </p>
              </div>
            ) : (
              <ResultCard result={result} onReset={reset} dark={dark} />
            )}
          </div>
        </div>
      </main>

      <Footer dark={dark} />
    </div>
  );
}
