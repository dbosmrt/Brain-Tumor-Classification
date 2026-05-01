import cv2
import numpy as np
import logging
from tensorflow.keras.applications.efficientnet import preprocess_input

logger = logging.getLogger(__name__)

class Predictor:
    class_names = ['glioma', 'meningioma', 'pituitary', 'no_tumor']

    def __init__(self, model, file_path):
        self.model = model
        self.file_path = file_path
        self.img = None

    def preprocess_cv2(self, img_size=(224, 224)):
        # Load image
        self.img = cv2.imread(self.file_path)

        if self.img is None:
            raise ValueError(f"Image not found at path: {self.file_path}")

        # Preprocess
        self.img = cv2.resize(self.img, img_size)

        self.img = np.expand_dims(self.img, axis=0)
        self.img = preprocess_input(self.img.astype(np.float32))

        return self.img

    def predict(self):
        if self.img is None:
            raise ValueError("Image not preprocessed. Call preprocess_cv2() first.")

        preds = self.model.predict(self.img)[0]

        return {
            self.class_names[i]: float(preds[i])
            for i in range(len(self.class_names))
        }