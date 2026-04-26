"""
Module for training the model.
"""
import tensorflow as tf
from tensorflow.keras import callbacks
import logging
import matplotlib.pyplot as plt

logger = logging.getLogger(__name__)

class ModelTrainer:
    """
    A class to handle the training process and history plotting.
    
    Attributes:
        model (tf.keras.Model): The compiled Keras model to train.
        checkpoint_path (str): File path to save the best model weights.
        patience (int): Number of epochs with no improvement after which training will be stopped.
    """
    def __init__(self, model, checkpoint_path, patience):
        """Initializes the ModelTrainer."""
        self.model = model
        self.checkpoint_path = checkpoint_path
        self.patience = patience

    def train(self, train_ds, val_ds, epochs):
        """
        Trains the model using the provided training and validation datasets.
        
        Args:
            train_ds (tf.data.Dataset): Training dataset.
            val_ds (tf.data.Dataset): Validation dataset.
            epochs (int): Number of epochs to train the model.
            
        Returns:
            tf.keras.callbacks.History: The training history object.
            
        Raises:
            Exception: If an error occurs during training.
        """
        try:
            logger.info("Setting up callbacks...")
            checkpoint_cb = tf.keras.callbacks.ModelCheckpoint(
                self.checkpoint_path,
                monitor="val_loss",
                save_best_only=True,
                mode="min",
                verbose=1
            )

            early_stopping = callbacks.EarlyStopping(
                monitor='val_loss',
                patience=self.patience,
                verbose=1,
                restore_best_weights=True
            )

            logger.info(f"Starting training for {epochs} epochs...")
            history = self.model.fit(
                train_ds,
                validation_data=val_ds,
                epochs=epochs,
                callbacks=[checkpoint_cb, early_stopping]
            )
            logger.info("Training complete.")
            return history
            
        except Exception as e:
            logger.error(f"Error during training: {e}")
            raise

    def plot_history(self, history):
        """
        Plots the training and validation accuracy and loss.
        
        Args:
            history (tf.keras.callbacks.History): The history object returned by model.fit().
            
        Raises:
            Exception: If an error occurs during plotting.
        """
        try:
            logger.info("Plotting training history...")
            acc = history.history['accuracy']
            val_acc = history.history['val_accuracy']
            loss = history.history['loss']
            val_loss = history.history['val_loss']
            epochs_range = range(1, len(acc) + 1)

            plt.figure(figsize=(12, 5))
            
            # Accuracy Plot
            plt.subplot(1, 2, 1)
            plt.plot(epochs_range, acc, 'b', label='Training accuracy')
            plt.plot(epochs_range, val_acc, 'r', label='Validation accuracy')
            plt.title('Training and Validation Accuracy')
            plt.xlabel('Epochs')
            plt.ylabel('Accuracy')
            plt.legend()

            # Loss Plot
            plt.subplot(1, 2, 2)
            plt.plot(epochs_range, loss, 'b', label='Training Loss')
            plt.plot(epochs_range, val_loss, 'r', label='Validation Loss')
            plt.title('Training and Validation Loss')
            plt.xlabel('Epochs')
            plt.ylabel('Loss')
            plt.legend()

            plt.tight_layout()
            plt.show()
            
        except Exception as e:
            logger.error(f"Error plotting history: {e}")
            raise
