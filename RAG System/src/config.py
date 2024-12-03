"""
Configuration settings for the RAG system
"""

import os
from pathlib import Path

# Project root directory
ROOT_DIR = Path(__file__).parent.parent

# Data directory
DATA_DIR = os.path.join(ROOT_DIR, "data")

# Model configurations
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
LLM_MODEL = "gpt-3.5-turbo"  # If using OpenAI

# Vector store settings
VECTOR_DB_PATH = os.path.join(DATA_DIR, "vector_store")

# Chunk settings
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# Create directories if they don't exist
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(VECTOR_DB_PATH, exist_ok=True)