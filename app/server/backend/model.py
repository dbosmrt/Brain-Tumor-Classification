import tensorflow as tf
import logging
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class Load:

    @staticmethod
    def load_model():
        try:
            model_path = os.getenv("MODEL_PATH")

            if not model_path:
                raise ValueError("MODEL_PATH not set in environment variables")

            print(f"Loading model from: {model_path}")

            model = tf.keras.models.load_model(model_path)

            print("Model loaded successfully")
            return model

        except Exception as e:
            logger.error(f"Model loading failed: {e}")
            raise e
        