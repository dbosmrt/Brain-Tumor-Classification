from model import Load
from predict import Predictor

image_path = r'C:\Users\deepa\Downloads\Deepanshu Bhatt\Brain-Tumor-Classification\data\archive (2)\Training\no_tumor\image (16).jpg'
model = Load.load_model()

predictor = Predictor(model, image_path)

predictor.preprocess_cv2()
result = predictor.predict()

print(result)