import { CheckCircle, AlertTriangle, Download, RefreshCw, Info } from 'lucide-react';
import ConfidenceChart from './ConfidenceChart';

const CLASS_META = {
  no_tumor:    { label: 'No Tumor',         color: '#22c55e' },
  glioma:      { label: 'Glioma Tumor',     color: '#f59e0b' },
  meningioma:  { label: 'Meningioma Tumor',  color: '#ef4444' },
  pituitary:   { label: 'Pituitary Tumor',  color: '#8b5cf6' },
};

export default function ResultCard({ result, onReset, dark }) {
  if (!result) {
    return (
      <div className={`rounded-2xl border p-8 text-center ${
        dark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'
      }`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          dark ? 'bg-dark-bg' : 'bg-gray-100'
        }`}>
          <Info className={`w-7 h-7 ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`} />
        </div>
        <h3 className={`text-lg font-semibold mb-1 ${dark ? 'text-dark-text' : 'text-text'}`}>
          Analysis Result
        </h3>
        <p className={`text-sm ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
          Upload an MRI scan and click <strong>"Analyze Scan"</strong> to see the results here.
        </p>
      </div>
    );
  }

  const { prediction, confidence, probabilities } = result;
  const isTumor = prediction !== 'no_tumor';
  const meta = CLASS_META[prediction] || CLASS_META.no_tumor;

  return (
    <div className={`rounded-2xl border p-6 space-y-6 ${
      dark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
        <h3 className={`text-lg font-semibold ${dark ? 'text-dark-text' : 'text-text'}`}>Analysis Result</h3>
      </div>

      {/* Banner */}
      <div className={`rounded-xl p-4 flex items-start gap-3 ${
        isTumor
          ? 'bg-red-50 border border-red-200 dark-tumor'
          : 'bg-green-50 border border-green-200'
      } ${dark && isTumor ? '!bg-red-950/30 !border-red-900' : ''} ${dark && !isTumor ? '!bg-green-950/30 !border-green-900' : ''}`}>
        <div className="flex-shrink-0 mt-0.5">
          {isTumor
            ? <AlertTriangle className="w-6 h-6 text-danger" />
            : <CheckCircle className="w-6 h-6 text-success" />}
        </div>
        <div>
          <p className={`font-semibold ${isTumor ? 'text-danger' : 'text-success'}`}>
            {isTumor ? 'Tumor Detected' : 'No Tumor Detected'}
          </p>
          <p className={`text-sm mt-0.5 ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
            {isTumor
              ? `The AI model detected a ${meta.label.toLowerCase()} in this scan.`
              : 'The AI model did not detect any tumor in this scan.'}
          </p>
        </div>
      </div>

      {/* Confidence */}
      <div>
        <h4 className={`text-sm font-semibold mb-3 ${dark ? 'text-dark-text' : 'text-text'}`}>
          Confidence Score
        </h4>
        <div className="flex items-center gap-6">
          <ConfidenceChart confidence={confidence} dark={dark} />
          <div className="space-y-2 flex-1">
            {Object.entries(probabilities).map(([key, val]) => {
              const m = CLASS_META[key];
              return (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className={dark ? 'text-dark-text' : 'text-text'}>{m.label}</span>
                  </span>
                  <span className={`font-medium ${dark ? 'text-dark-text' : 'text-text'}`}>
                    {Math.round(val * 100)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Predicted class */}
      <div>
        <h4 className={`text-sm font-semibold mb-2 ${dark ? 'text-dark-text' : 'text-text'}`}>
          Predicted Class
        </h4>
        <div className={`rounded-xl p-3 flex items-center justify-between border ${
          dark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-border'
        }`}>
          <span className="font-semibold" style={{ color: meta.color }}>{meta.label}</span>
          <CheckCircle className="w-5 h-5" style={{ color: meta.color }} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className={`rounded-xl p-4 text-sm flex items-start gap-2 ${
        dark ? 'bg-blue-950/20 border border-blue-900' : 'bg-blue-50 border border-blue-100'
      }`}>
        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className={`font-medium ${dark ? 'text-dark-text' : 'text-text'}`}>Disclaimer</p>
          <p className={`mt-0.5 ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
            This is an AI-generated result and should not replace professional medical advice. 
            Please consult a qualified healthcare provider.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
          dark
            ? 'border-dark-border text-dark-text hover:bg-dark-bg'
            : 'border-border text-text hover:bg-gray-50'
        }`}>
          <Download className="w-4 h-4" /> Download Report
        </button>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary hover:bg-primary-dark text-white transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> New Analysis
        </button>
      </div>
    </div>
  );
}
