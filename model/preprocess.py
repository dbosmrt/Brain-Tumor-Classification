"""
Module for data preprocessing.
"""
import tensorflow as tf
from tensorflow.keras.applications.efficientnet import preprocess_input
import logging

logger = logging.getLogger(__name__)

class DataPreprocessor:
    """
    A class to handle preprocessing of image datasets.
    """
    def __init__(self):
        """Initializes the DataPreprocessor."""
        pass

    def preprocess(self, train_ds, val_ds, test_ds):
        """
        Applies EfficientNet preprocessing to the datasets.
        
        Args:
            train_ds (tf.data.Dataset): Training dataset.
            val_ds (tf.data.Dataset): Validation dataset.
            test_ds (tf.data.Dataset): Testing dataset.
            
        Returns:
            tuple: A tuple containing preprocessed (train_ds, val_ds, test_ds).
            
        Raises:
            Exception: If an error occurs during preprocessing.
        """
        try:
            logger.info("Preprocessing data using EfficientNet preprocess_input...")
            train_ds = train_ds.map(lambda x, y: (preprocess_input(x), y), num_parallel_calls=tf.data.AUTOTUNE)
            val_ds = val_ds.map(lambda x, y: (preprocess_input(x), y), num_parallel_calls=tf.data.AUTOTUNE)
            test_ds = test_ds.map(lambda x, y: (preprocess_input(x), y), num_parallel_calls=tf.data.AUTOTUNE)
            
            # Prefetch for performance optimization
            train_ds = train_ds.prefetch(tf.data.AUTOTUNE)
            val_ds = val_ds.prefetch(tf.data.AUTOTUNE)
            test_ds = test_ds.prefetch(tf.data.AUTOTUNE)
            
            logger.info("Preprocessing complete.")
            return train_ds, val_ds, test_ds
            
        except Exception as e:
            logger.error(f"Error during preprocessing: {e}")
            raise
