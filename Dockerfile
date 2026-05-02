
FROM node:22-alpine AS frontend-build

WORKDIR /frontend

# Install dependencies first (cache-friendly)
COPY app/client/package.json app/client/package-lock.json ./
RUN npm install 

# Copy source and build static assets
COPY app/client/ ./
RUN npm run build


FROM python:3.11-slim AS runtime

# System packages required by OpenCV and TensorFlow
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies (cache-friendly — only re-runs if requirements change)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the trained model artifact
COPY artifact/ ./artifact/

# Copy backend server code
COPY app/server/ ./server/

# Copy built frontend into a directory the backend can serve
COPY --from=frontend-build /frontend/dist ./server/static/

# Set the model path environment variable
ENV MODEL_PATH=/app/artifact/Brain_tumorbest_model.keras

# Expose the API port
EXPOSE 8000

# Health check — hit the root endpoint every 30s
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/health')" || exit 1

# Start the FastAPI server
CMD ["uvicorn", "server.api.api:app", "--host", "0.0.0.0", "--port", "8000"]
