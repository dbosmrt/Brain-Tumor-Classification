import { useRef, useState, useCallback } from 'react';
import { Upload, CheckCircle, XCircle } from 'lucide-react';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function UploadBox({ file, setFile, dark }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFile = useCallback((f) => {
    setError('');
    if (!ALLOWED.includes(f.type)) {
      setError('Only JPG, PNG, WEBP files are allowed.');
      return;
    }
    if (f.size > MAX_SIZE) {
      setError('File exceeds the 10 MB limit.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, [setFile]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  return (
    <div className={`rounded-2xl border p-6 ${dark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}`}>
      <h3 className={`text-base font-semibold mb-4 ${dark ? 'text-dark-text' : 'text-text'}`}>
        Upload MRI Scan
      </h3>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-colors ${
            dragOver
              ? 'border-primary bg-primary/5'
              : dark
                ? 'border-dark-border hover:border-primary/50'
                : 'border-gray-300 hover:border-primary/50'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            dark ? 'bg-primary/20' : 'bg-blue-50'
          }`}>
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className={`text-sm ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
            Drag & drop your MRI image here
          </p>
          <span className={`text-xs ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>or</span>
          <button className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" /> Browse Files
          </button>
          <p className={`text-xs ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
            Supports: JPG, PNG, WEBP &nbsp;•&nbsp; Max size: 10MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          />
        </div>

        {/* Preview */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <h4 className={`text-sm font-medium self-start ${dark ? 'text-dark-text' : 'text-text'}`}>
            Image Preview
          </h4>
          <div className={`w-full aspect-square max-w-[220px] rounded-xl overflow-hidden border ${
            dark ? 'border-dark-border bg-dark-bg' : 'border-border bg-gray-50'
          } flex items-center justify-center`}>
            {preview ? (
              <img src={preview} alt="MRI Preview" className="w-full h-full object-cover" />
            ) : (
              <p className={`text-xs ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                No image selected
              </p>
            )}
          </div>
          {file && (
            <div className="flex items-center gap-2">
              <span className={`text-xs truncate max-w-[160px] ${dark ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
                {file.name}
              </span>
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-danger text-sm">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}
    </div>
  );
}
