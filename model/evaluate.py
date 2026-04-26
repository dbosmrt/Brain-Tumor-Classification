"""
Module for evaluating the trained model.
"""
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
import logging

logger = logging.getLogger(__name__)

class ModelEvaluator:
    """
    A class to evaluate the model's performance on the testing dataset.
    
    Attributes:
        model (tf.keras.Model): The trained Keras model.
    """
    def __init__(self, model):
        """Initializes the ModelEvaluator."""
        self.model = model

    def evaluate(self, test_ds, class_names):
        """
        Evaluates the model by generating predictions, accuracy, classification report, 
        and plotting confusion matrices.
        
        Args:
            test_ds (tf.data.Dataset): Testing dataset to evaluate on.
            class_names (list): List of class name strings.
            
        Raises:
            Exception: If an error occurs during evaluation.
        """
        try:
            logger.info("Starting model evaluation...")
            
            y_pred_probs = self.model.predict(test_ds)
            y_pred = np.argmax(y_pred_probs, axis=1)

            y_true = np.concatenate([y for x, y in test_ds], axis=0)
            y_true = np.argmax(y_true, axis=1)

            accuracy = accuracy_score(y_true, y_pred)
            logger.info(f"Overall Accuracy: {accuracy:.4f}")
            print(f"\nOverall Accuracy: {accuracy:.4f}")

            report = classification_report(
                y_true,
                y_pred,
                target_names=class_names,
                digits=4
            )
            logger.info("Classification Report generated.")
            print("\nClassification Report")
            print(report)

            self.plot_confusion_matrix(y_true, y_pred, class_names)
            
        except Exception as e:
            logger.error(f"Error during evaluation: {e}")
            raise

    def plot_confusion_matrix(self, y_true, y_pred, class_names):
        """
        Plots standard and normalized confusion matrices.
        
        Args:
            y_true (numpy.ndarray): Ground truth labels.
            y_pred (numpy.ndarray): Predicted labels.
            class_names (list): List of class name strings.
            
        Raises:
            Exception: If an error occurs while plotting.
        """
        try:
            logger.info("Plotting confusion matrices...")
            cm = confusion_matrix(y_true, y_pred)
            
            # Standard Confusion Matrix
            plt.figure(figsize=(7, 6))
            sns.heatmap(
                cm,
                annot=True,
                fmt='d',
                cmap='Blues',
                xticklabels=class_names,
                yticklabels=class_names
            )
            plt.xlabel("Predicted Label")
            plt.ylabel("True Label")
            plt.title("Confusion Matrix")
            plt.tight_layout()
            plt.show()

            # Normalized Confusion Matrix
            cm_norm = cm.astype('float') / cm.sum(axis=1, keepdims=True)
            plt.figure(figsize=(7, 6))
            sns.heatmap(
                cm_norm,
                annot=True,
                fmt='.2f',
                cmap='Blues',
                xticklabels=class_names,
                yticklabels=class_names
            )
            plt.xlabel("Predicted Label")
            plt.ylabel("True Label")
            plt.title("Normalized Confusion Matrix")
            plt.tight_layout()
            plt.show()
            
        except Exception as e:
            logger.error(f"Error plotting confusion matrix: {e}")
            raise
