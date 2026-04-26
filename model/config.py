"""
Configuration file for the Brain Tumor Classification pipeline.
Contains all constant values and hyperparameters used across the modules.
"""

# File paths
TRAIN_PATH = '/content/drive/MyDrive/Brain_tumor/Training'
TEST_PATH = '/content/drive/MyDrive/Brain_tumor/Testing'
CHECKPOINT_PATH = '/content/drive/MyDrive/Brain_tumor/best_model.keras'

# Data parameters
IMAGE_SIZE = (224, 224)
INPUT_SHAPE = (224, 224, 3)
BATCH_SIZE = 32
SEED = 1
VALIDATION_SPLIT = 0.1

# Model parameters
NUM_CLASSES = 4
LEARNING_RATE = 1e-4
DROPOUT_RATE = 0.3

# Training parameters
EPOCHS = 15
EARLY_STOPPING_PATIENCE = 5
