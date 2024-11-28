"""
Text retrieval functionality for the RAG system
"""

import os
from typing import List, Dict
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle
from config import EMBEDDING_MODEL, VECTOR_DB_PATH

class TextRetriever:
    def __init__(self):
        self.embedding_model = SentenceTransformer(EMBEDDING_MODEL)
        self.index = None
        self.documents = []
        self.index_path = os.path.join(VECTOR_DB_PATH, "faiss_index")
        self.docs_path = os.path.join(VECTOR_DB_PATH, "documents.pkl")
        self._load_or_create_index()

    def _load_or_create_index(self):
        """Load existing index or create a new one"""
        if os.path.exists(self.index_path) and os.path.exists(self.docs_path):
            self.index = faiss.read_index(self.index_path)
            with open(self.docs_path, 'rb') as f:
                self.documents = pickle.load(f)
        else:
            self.index = faiss.IndexFlatL2(384)  # 384 is the dimension of the embedding model

    def add_documents(self, documents: List[str]):
        """Add new documents to the index"""
        if not documents:
            return

        # Generate embeddings
        embeddings = self.embedding_model.encode(documents)
        
        # Add to FAISS index
        self.index.add(np.array(embeddings).astype('float32'))
        
        # Store original documents
        self.documents.extend(documents)
        
        # Save to disk
        faiss.write_index(self.index, self.index_path)
        with open(self.docs_path, 'wb') as f:
            pickle.dump(self.documents, f)

    def search(self, query: str, k: int = 5) -> List[Dict[str, any]]:
        """Search for similar documents"""
        # Generate query embedding
        query_embedding = self.embedding_model.encode([query])
        
        # Search in FAISS index
        distances, indices = self.index.search(
            np.array(query_embedding).astype('float32'), k
        )
        
        # Prepare results
        results = []
        for i, idx in enumerate(indices[0]):
            if idx < len(self.documents):  # Ensure index is valid
                results.append({
                    'content': self.documents[idx],
                    'score': float(distances[0][i])
                })
        
        return results

    def clear_index(self):
        """Clear the entire index"""
        self.index = faiss.IndexFlatL2(384)
        self.documents = []
        
        # Save empty index
        faiss.write_index(self.index, self.index_path)
        with open(self.docs_path, 'wb') as f:
            pickle.dump(self.documents, f)