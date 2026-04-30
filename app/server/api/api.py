"""Brain Tumor Classification API — minimal FastAPI server."""

import os, sys, shutil, uuid, logging

from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

server_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if server_dir not in sys.path:
    sys.path.append(server_dir)

from backend.model import Load
from backend.predict import Predictor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPI(title="Brain Tumor Classifier", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])


model = None

@app.on_event("startup")
async def startup():
    global model
    model = Load.load_model()
    logger.info("Model loaded." if model else "Model failed to load!")



class PredictionResponse(BaseModel):
    glioma: float = Field(..., ge=0, le=1)
    meningioma: float = Field(..., ge=0, le=1)
    pituitary: float = Field(..., ge=0, le=1)
    no_tumor: float = Field(..., ge=0, le=1)
    predicted_class: str



@app.get("/")
async def root():
    return {"status": "running", "model_loaded": model is not None}


@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """Upload an MRI image → get tumor classification probabilities."""

  
    if not (file.content_type or "").startswith("image/"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Upload must be an image file.")

   
    if model is None:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "Model not loaded.")


    data = await file.read()
    if len(data) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "File is empty.")
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "File exceeds 10 MB limit.")


    temp_dir = os.path.join(server_dir, "temp_uploads")
    os.makedirs(temp_dir, exist_ok=True)
    ext = os.path.splitext(file.filename or "img.png")[1] or ".png"
    temp_path = os.path.join(temp_dir, f"{uuid.uuid4()}{ext}")

    try:
        with open(temp_path, "wb") as f:
            f.write(data)


        predictor = Predictor(model, temp_path)
        predictor.preprocess_cv2()
        preds = predictor.predict()

        return PredictionResponse(
            **preds,
            predicted_class=max(preds, key=preds.get),
        )

    except ValueError as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(e))
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction failed: {e}", exc_info=True)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Prediction failed.")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
