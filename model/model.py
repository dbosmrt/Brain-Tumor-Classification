"""
Module for building and compiling the Brain Tumor Classification model.
"""
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB1
import logging

logger = logging.getLogger(__name__)

class BrainTumorModel:
    """
    A class to build and compile the EfficientNetB1 based classification model.
    
    Attributes:
        input_shape (tuple): Shape of the input images.
        num_classes (int): Number of output classes.
        learning_rate (float): Learning rate for the optimizer.
        dropout_rate (float): Dropout rate for the regularization layer.
        model (tf.keras.Model): The constructed Keras model.
    """
    def __init__(self, input_shape, num_classes, learning_rate, dropout_rate):
        """Initializes the BrainTumorModel with given hyperparameters."""
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.learning_rate = learning_rate
        self.dropout_rate = dropout_rate
        self.model = None

    def build_model(self):
        """
        Builds the underlying EfficientNetB1 model with custom top layers.
        
        Returns:
            tf.keras.Model: The constructed and uncompiled Keras model.
            
        Raises:
            Exception: If an error occurs during model building.
        """
        try:
            logger.info("Building EfficientNetB1 model...")
            effnet = EfficientNetB1(
                include_top=False,
                weights='imagenet',
                input_shape=self.input_shape,
            )
            
            x = effnet.output
            x = tf.keras.layers.GlobalAveragePooling2D()(x)
            x = tf.keras.layers.Dropout(self.dropout_rate)(x)
            outputs = tf.keras.layers.Dense(self.num_classes, activation='softmax')(x)
            
            self.model = tf.keras.models.Model(inputs=effnet.input, outputs=outputs)
            logger.info("Model built successfully.")
            self.model.summary(print_fn=logger.info)
            return self.model
            
        except Exception as e:
            logger.error(f"Error building model: {e}")
            raise

    def compile_model(self):
        """
        Compiles the constructed model with loss function, optimizer, and metrics.
        
        Returns:
            tf.keras.Model: The compiled Keras model.
            
        Raises:
            ValueError: If the model has not been built prior to compilation.
            Exception: If an error occurs during compilation.
        """
        if self.model is None:
            logger.error("Model has not been built yet. Call build_model() first.")
            raise ValueError("Model has not been built yet. Call build_model() first.")
        
        try:
            logger.info("Compiling model...")
            self.model.compile(
                loss='categorical_crossentropy',
                optimizer=tf.keras.optimizers.Adam(learning_rate=self.learning_rate),
                metrics=[
                    'accuracy',
                    tf.keras.metrics.AUC(name='auc'),
                    tf.keras.metrics.Precision(name='precision'),
                    tf.keras.metrics.Recall(name='recall')
                ]
            )
            logger.info("Model compiled successfully.")
            return self.model
            
        except Exception as e:
            logger.error(f"Error compiling model: {e}")
            raise
