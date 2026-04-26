"""
Module for loading the training, validation, and testing datasets.
"""
import tensorflow as tf
import logging

logger = logging.getLogger(__name__)

class DataLoader:
    """
    A class to handle loading of image datasets from directories.
    
    Attributes:
        train_path (str): Directory path for the training data.
        test_path (str): Directory path for the testing data.
        image_size (tuple): Target size for the images (height, width).
        batch_size (int): Size of the batches of data.
        seed (int): Random seed for reproducibility.
        validation_split (float): Fraction of training data to use for validation.
    """
    def __init__(self, train_path, test_path, image_size, batch_size, seed, validation_split):
        """Initializes the DataLoader with the given configurations."""
        self.train_path = train_path
        self.test_path = test_path
        self.image_size = image_size
        self.batch_size = batch_size
        self.seed = seed
        self.validation_split = validation_split

    def load_data(self):
        """
        Loads the training, validation, and testing datasets.
        
        Returns:
            tuple: A tuple containing (train_ds, val_ds, test_ds) as tf.data.Dataset objects.
            
        Raises:
            Exception: If an error occurs during dataset loading.
        """
        try:
            logger.info(f"Loading training data from {self.train_path}...")
            train_ds = tf.keras.utils.image_dataset_from_directory(
                self.train_path,
                seed=self.seed,
                image_size=self.image_size,
                batch_size=self.batch_size,
                shuffle=True,
                label_mode='categorical',
                subset='training',
                validation_split=self.validation_split
            )
            
            logger.info(f"Loading validation data from {self.train_path}...")
            val_ds = tf.keras.utils.image_dataset_from_directory(
                self.train_path,
                seed=self.seed,
                image_size=self.image_size,
                batch_size=self.batch_size,
                shuffle=True,
                label_mode='categorical',
                subset='validation',
                validation_split=self.validation_split
            )
            
            logger.info(f"Loading testing data from {self.test_path}...")
            test_ds = tf.keras.utils.image_dataset_from_directory(
                self.test_path,
                seed=self.seed,
                image_size=self.image_size,
                batch_size=self.batch_size,
                shuffle=False,
                label_mode='categorical'
            )
            
            return train_ds, val_ds, test_ds
            
        except Exception as e:
            logger.error(f"Error loading data: {e}")
            raise
