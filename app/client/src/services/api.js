const API_BASE = '/predict';

export async function predictTumor(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(API_BASE, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Server error (${res.status})`);
  }

  const data = await res.json();

  // Map backend response to the shape the UI expects
  return {
    prediction: data.predicted_class,
    confidence: Math.max(data.glioma, data.meningioma, data.pituitary, data.no_tumor),
    probabilities: {
      no_tumor: data.no_tumor,
      glioma: data.glioma,
      meningioma: data.meningioma,
      pituitary: data.pituitary,
    },
  };
}
