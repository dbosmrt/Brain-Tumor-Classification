<div align="center">

<br>

<h1>Brain Tumor Classification</h1>

<p>
  <strong>A full-stack deep learning application for classifying brain tumors from MRI scans.</strong><br>
  Built with EfficientNetB1, FastAPI, and React.
</p>

<br>

<table>
  <tr>
    <td><strong>Classes</strong></td>
    <td>Glioma &middot; Meningioma &middot; Pituitary &middot; No Tumor</td>
  </tr>
  <tr>
    <td><strong>Architecture</strong></td>
    <td>EfficientNetB1 (transfer learning, ImageNet weights)</td>
  </tr>
  <tr>
    <td><strong>Input</strong></td>
    <td>224 &times; 224 RGB MRI image</td>
  </tr>
  <tr>
    <td><strong>License</strong></td>
    <td>CC0 1.0 Universal</td>
  </tr>
</table>

<br>

</div>

---

<br>

## Tech Stack

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Deep Learning</strong></td>
      <td>
        <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="TensorFlow">
        <img src="https://img.shields.io/badge/Keras-D00000?style=flat-square&logo=keras&logoColor=white" alt="Keras">
      </td>
      <td>Model training, inference, and EfficientNetB1 backbone</td>
    </tr>
    <tr>
      <td><strong>Computer Vision</strong></td>
      <td>
        <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white" alt="OpenCV">
        <img src="https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white" alt="NumPy">
      </td>
      <td>Image preprocessing (resize, color conversion, normalization)</td>
    </tr>
    <tr>
      <td><strong>Backend API</strong></td>
      <td>
        <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI">
        <img src="https://img.shields.io/badge/Uvicorn-2C2C2C?style=flat-square&logo=gunicorn&logoColor=white" alt="Uvicorn">
        <img src="https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white" alt="Pydantic">
      </td>
      <td>REST API, request validation, static file serving</td>
    </tr>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
        <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
        <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
      </td>
      <td>Single-page application with drag-and-drop upload</td>
    </tr>
    <tr>
      <td><strong>Containerization</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
      </td>
      <td>Multi-stage build for production deployment</td>
    </tr>
    <tr>
      <td><strong>Language</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
      </td>
      <td>Backend logic and frontend interactivity</td>
    </tr>
  </tbody>
</table>

<br>

---

<br>

## Project Structure

```
Brain-Tumor-Classification/
|
|-- app/
|   |-- client/                   # React frontend (Vite + Tailwind CSS)
|   |   |-- src/
|   |   |   |-- components/       # Navbar, UploadBox, ResultCard, ConfidenceChart, etc.
|   |   |   |-- services/api.js   # API client (calls /api/predict)
|   |   |   |-- App.jsx           # Root component
|   |   |   |-- index.css         # Global styles
|   |   |-- package.json
|   |   |-- vite.config.js
|   |
|   |-- server/
|       |-- api/
|       |   |-- api.py            # FastAPI application, routes, and SPA serving
|       |-- backend/
|           |-- model.py          # Model loader (reads MODEL_PATH from env)
|           |-- predict.py        # Predictor class (preprocess + inference)
|
|-- model/                        # Training pipeline (not shipped in Docker)
|   |-- config.py                 # Hyperparameters and file paths
|   |-- data.py                   # Dataset loading via image_dataset_from_directory
|   |-- preprocess.py             # Training-time preprocessing
|   |-- model.py                  # EfficientNetB1 architecture definition
|   |-- train.py                  # Training loop with callbacks
|   |-- evaluate.py               # Evaluation metrics and confusion matrix
|   |-- main.py                   # Pipeline entrypoint
|
|-- artifact/
|   |-- Brain_tumorbest_model.keras   # Trained model weights (~80 MB)
|
|-- Dockerfile                    # Multi-stage build (Node + Python)
|-- requirements.txt              # Python dependencies
|-- .env                          # Local environment variables
|-- .dockerignore
|-- .gitignore
```

<br>

---

<br>

## Getting Started

### Prerequisites

| Requirement | Minimum Version |
|:--|:--|
| Python | 3.11+ |
| Node.js | 22+ |
| Docker *(optional)* | 24+ |
| Trained model file | `artifact/Brain_tumorbest_model.keras` |

<br>

---

### Option 1 &mdash; Docker (Recommended)

The Docker image bundles the backend, frontend, and model into a single container.

**Build and run locally:**

```bash
docker build -t brain-tumor-classifier .
docker run -p 8000:8000 brain-tumor-classifier
```

**Pull from Docker Hub:**

```bash
docker pull dbosmrt/brain_tumor:1.0
docker run -p 8000:8000 dbosmrt/brain_tumor:1.0
```

Open `http://localhost:8000` in your browser. The React frontend will load automatically.

<br>

---

### Option 2 &mdash; Local Development

This runs the backend and frontend as separate processes with hot-reload.

**1. Clone the repository**

```bash
git clone https://github.com/dbosmrt/Brain-Tumor-Classification.git
cd Brain-Tumor-Classification
```

**2. Set up the Python backend**

```bash
python -m venv btvenv
btvenv\Scripts\activate        # Windows
# source btvenv/bin/activate   # macOS / Linux

pip install -r requirements.txt
```

**3. Configure the environment**

Create a `.env` file in the project root (or edit the existing one):

```
MODEL_PATH=C:\path\to\artifact\Brain_tumorbest_model.keras
```

Adjust the path to match your local file system.

**4. Start the API server**

```bash
uvicorn app.server.api.api:app --reload --port 8000
```

The API will be available at `http://localhost:8000/api/health`.

**5. Start the frontend dev server**

Open a second terminal:

```bash
cd app/client
npm install
npm run dev
```

Vite will start on `http://localhost:5173` and proxy API requests to the backend automatically.

<br>

---

<br>

## API Reference

All API routes are prefixed with `/api`.

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>GET</code></td>
      <td><code>/api/health</code></td>
      <td>Returns server status and whether the model is loaded.</td>
    </tr>
    <tr>
      <td><code>POST</code></td>
      <td><code>/api/predict</code></td>
      <td>Accepts a multipart image upload and returns classification probabilities.</td>
    </tr>
  </tbody>
</table>

<br>

**POST /api/predict**

Request:
```
Content-Type: multipart/form-data
Field: file (image/png, image/jpeg, etc.)
Max size: 10 MB
```

Response:
```json
{
  "glioma": 0.85,
  "meningioma": 0.05,
  "pituitary": 0.02,
  "no_tumor": 0.08,
  "predicted_class": "glioma"
}
```

Each value represents the softmax probability for that class. `predicted_class` is the label with the highest probability.

<br>

---

<br>

## Model Training Pipeline

The `model/` directory contains a modular training pipeline. It is excluded from the Docker image since only the trained artifact is needed for inference.

**Pipeline stages:**

<table>
  <thead>
    <tr>
      <th>Module</th>
      <th>Responsibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>config.py</code></td>
      <td>Centralizes hyperparameters (image size, batch size, learning rate, epochs).</td>
    </tr>
    <tr>
      <td><code>data.py</code></td>
      <td>Loads training, validation, and test splits using <code>image_dataset_from_directory</code>.</td>
    </tr>
    <tr>
      <td><code>preprocess.py</code></td>
      <td>Applies training-time preprocessing (resize to 224x224, RGB conversion).</td>
    </tr>
    <tr>
      <td><code>model.py</code></td>
      <td>Builds EfficientNetB1 with GlobalAveragePooling, Dropout (0.3), and a 4-class softmax head.</td>
    </tr>
    <tr>
      <td><code>train.py</code></td>
      <td>Runs the training loop with early stopping (patience=5) and checkpoint saving.</td>
    </tr>
    <tr>
      <td><code>evaluate.py</code></td>
      <td>Generates accuracy, AUC, precision, recall metrics and confusion matrices.</td>
    </tr>
    <tr>
      <td><code>main.py</code></td>
      <td>Orchestrates the full pipeline end-to-end.</td>
    </tr>
  </tbody>
</table>

**Run the training pipeline:**

```bash
python -m model.main
```

Training expects a directory structure with class-labeled subfolders:

```
Training/
|-- glioma/
|-- meningioma/
|-- no_tumor/
|-- pituitary/
```

Update the dataset paths in `model/config.py` before running.

<br>

---

<br>

## Architecture Overview

```
                          +----------------------------+
                          |        Docker Container     |
                          |                            |
  Browser Request   ----> |   Uvicorn (port 8000)      |
  (http://host:8000)      |        |                   |
                          |        v                   |
                          |   FastAPI (api.py)          |
                          |     |           |          |
                          |     |     /api/predict     |
                          |     |     /api/health      |
                          |     |                      |
                          |   Catch-all route           |
                          |     serves React SPA        |
                          |     from /server/static/    |
                          |                            |
                          |   Predictor (predict.py)    |
                          |     OpenCV preprocessing    |
                          |     EfficientNetB1 model    |
                          |     (Brain_tumorbest.keras) |
                          +----------------------------+
```

In production (Docker), the FastAPI server handles both API requests and static file serving. During development, Vite runs separately and proxies API calls to the backend.

<br>

---

<br>

## Environment Variables

| Variable | Description | Default |
|:--|:--|:--|
| `MODEL_PATH` | Absolute path to the `.keras` model file. | Set in `.env` (local) or Dockerfile (Docker) |

<br>

---

<br>

## Dependencies

**Python** (defined in `requirements.txt`):

| Package | Version | Purpose |
|:--|:--|:--|
| tensorflow | 2.21.0 | Deep learning framework |
| numpy | 2.4.4 | Numerical operations |
| opencv-python | 4.13.0.92 | Image reading and preprocessing |
| fastapi | 0.136.1 | REST API framework |
| uvicorn | 0.46.0 | ASGI server |
| pydantic | 2.13.3 | Request/response validation |
| python-dotenv | 1.2.2 | Environment variable loading |
| python-multipart | 0.0.27 | File upload parsing |
| scikit-learn | >=1.6.0 | Training evaluation metrics |
| matplotlib | >=3.10.0 | Training visualization |
| seaborn | >=0.13.0 | Confusion matrix plotting |

**JavaScript** (defined in `app/client/package.json`):

| Package | Purpose |
|:--|:--|
| react / react-dom | UI framework |
| vite | Build tool and dev server |
| tailwindcss | Utility-first CSS framework |
| recharts | Chart components for confidence visualization |
| lucide-react | Icon library |

<br>

---

<br>

<div align="center">
  <sub>Built by <strong>Deepanshu Bhatt</strong></sub>
</div>
