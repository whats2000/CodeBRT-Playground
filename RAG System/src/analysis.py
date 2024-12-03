"""
Text analysis functionality for the RAG system
"""

import spacy
from typing import List, Dict
import re
from collections import Counter

class TextAnalyzer:
    def __init__(self):
        # Load English language model
        self.nlp = spacy.load("en_core_web_sm")

    def analyze_text(self, text: str) -> Dict:
        """
        Analyze text and extract key information
        """
        doc = self.nlp(text)
        
        # Extract named entities
        entities = {
            'organizations': [],
            'persons': [],
            'locations': [],
            'dates': []
        }
        
        for ent in doc.ents:
            if ent.label_ == "ORG":
                entities['organizations'].append(ent.text)
            elif ent.label_ == "PERSON":
                entities['persons'].append(ent.text)
            elif ent.label_ == "GPE" or ent.label_ == "LOC":
                entities['locations'].append(ent.text)
            elif ent.label_ == "DATE":
                entities['dates'].append(ent.text)

        # Extract key phrases (noun chunks)
        key_phrases = [chunk.text for chunk in doc.noun_chunks]

        # Calculate basic statistics
        statistics = {
            'word_count': len([token for token in doc if not token.is_space]),
            'sentence_count': len(list(doc.sents)),
            'average_word_length': sum(len(token.text) for token in doc if not token.is_space) / 
                                 len([token for token in doc if not token.is_space]) if doc else 0
        }

        return {
            'entities': entities,
            'key_phrases': key_phrases,
            'statistics': statistics
        }

    def extract_keywords(self, text: str, top_n: int = 10) -> List[str]:
        """
        Extract important keywords from text
        """
        doc = self.nlp(text)
        
        # Filter for nouns and proper nouns
        words = [token.text.lower() for token in doc 
                if (token.pos_ in ["NOUN", "PROPN"] and 
                    not token.is_stop and 
                    len(token.text) > 2)]
        
        # Count frequencies
        word_freq = Counter(words)
        
        # Return top N keywords
        return [word for word, _ in word_freq.most_common(top_n)]

    def segment_text(self, text: str, max_length: int = 1000) -> List[str]:
        """
        Segment text into smaller chunks while maintaining coherent sentences
        """
        doc = self.nlp(text)
        chunks = []
        current_chunk = []
        current_length = 0
        
        for sent in doc.sents:
            sent_text = sent.text.strip()
            sent_length = len(sent_text)
            
            if current_length + sent_length > max_length and current_chunk:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_length = 0
            
            current_chunk.append(sent_text)
            current_length += sent_length
        
        if current_chunk:
            chunks.append(" ".join(current_chunk))
        
        return chunks

    def clean_text(self, text: str) -> str:
        """
        Clean and preprocess text
        """
        # Remove special characters and extra whitespace
        text = re.sub(r'[^\w\s.,!?]', '', text)
        text = re.sub(r'\s+', ' ', text)
        
        # Remove URLs
        text = re.sub(r'http\S+|www.\S+', '', text)
        
        # Remove email addresses
        text = re.sub(r'\S+@\S+', '', text)
        
        return text.strip()