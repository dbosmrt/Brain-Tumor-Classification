"""
Main execution script for the Brain Tumor Classification pipeline.
"""
import logging
import tensorflow as tf
from data import DataLoader
from preprocess import DataPreprocessor
from model import BrainTumorModel
from train import ModelTrainer
from evaluate import ModelEvaluator
import config

# Setup root logger
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """
    Main function to run the full training and evaluation pipeline.
    It relies on parameters defined in the config.py module.
    """
    try:
        logger.info("Starting Brain Tumor Classification Pipeline...")
        
        # 1. Load Data
        data_loader = DataLoader(
            train_path=config.TRAIN_PATH, 
            test_path=config.TEST_PATH,
            image_size=config.IMAGE_SIZE,
            batch_size=config.BATCH_SIZE,
            seed=config.SEED,
            validation_split=config.VALIDATION_SPLIT
        )
        train_ds, val_ds, test_ds = data_loader.load_data()
        class_names = train_ds.class_names
        
        # 2. Preprocess Data
        preprocessor = DataPreprocessor()
        train_ds, val_ds, test_ds = preprocessor.preprocess(train_ds, val_ds, test_ds)
        
        # 3. Build and Compile Model
        tumor_model = BrainTumorModel(
            input_shape=config.INPUT_SHAPE,
            num_classes=config.NUM_CLASSES,
            learning_rate=config.LEARNING_RATE,
            dropout_rate=config.DROPOUT_RATE
        )
        model = tumor_model.build_model()
        model = tumor_model.compile_model()
        
        # 4. Train Model
        trainer = ModelTrainer(
            model=model, 
            checkpoint_path=config.CHECKPOINT_PATH,
            patience=config.EARLY_STOPPING_PATIENCE
        )
        history = trainer.train(train_ds, val_ds, epochs=config.EPOCHS)
        trainer.plot_history(history)
        
        # 5. Evaluate Model
        logger.info(f"Loading best model from {config.CHECKPOINT_PATH} for evaluation...")
        best_model = tf.keras.models.load_model(config.CHECKPOINT_PATH)
        evaluator = ModelEvaluator(model=best_model)
        evaluator.evaluate(test_ds, class_names)
        
        logger.info("Pipeline executed successfully.")
        
    except Exception as e:
        logger.error(f"Pipeline failed: {e}")

if __name__ == "__main__":
    main()
