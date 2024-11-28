"""
Text summarization functionality for the RAG system
"""

from typing import List, Dict
import openai
from transformers import pipeline
from config import LLM_MODEL

class TextSummarizer:
    def __init__(self, use_openai: bool = False):
        self.use_openai = use_openai
        if not use_openai:
            # Load local summarization model
            self.summarizer = pipeline(
                "summarization",
                model="facebook/bart-large-cnn",
                device="cpu"  # Use "cuda" if GPU is available
            )

    def summarize_with_openai(self, text: str, context: List[Dict] = None) -> str:
        """
        Generate summary using OpenAI's GPT model
        """
        if not self.use_openai:
            raise ValueError("OpenAI is not configured. Please set use_openai=True")

        # Prepare system message
        system_message = """You are an AI assistant specialized in analyzing and summarizing 
        company-related information. Please provide a concise and informative summary of the 
        given text, focusing on key business aspects, major events, and important details."""

        # Prepare messages
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"Please summarize the following text:\n\n{text}"}
        ]

        # If context is provided, add it to the message
        if context:
            context_text = "Additional context:\n" + "\n".join(
                [f"- {item['content']}" for item in context]
            )
            messages.append({"role": "user", "content": context_text})

        # Generate summary
        response = openai.ChatCompletion.create(
            model=LLM_MODEL,
            messages=messages,
            temperature=0.5,
            max_tokens=500
        )

        return response.choices[0].message['content']

    def summarize_with_local_model(self, text: str, max_length: int = 150) -> str:
        """
        Generate summary using local transformer model
        """
        # Ensure text is not too long for the model
        max_input_length = 1024  # Model's maximum input length
        if len(text.split()) > max_input_length:
            text = " ".join(text.split()[:max_input_length])

        # Generate summary
        summary = self.summarizer(text, 
                                max_length=max_length, 
                                min_length=30,
                                do_sample=False)
        
        return summary[0]['summary_text']

    def generate_summary(self, text: str, context: List[Dict] = None) -> str:
        """
        Generate summary based on the configured method
        """
        if self.use_openai:
            return self.summarize_with_openai(text, context)
        else:
            return self.summarize_with_local_model(text)

    def generate_structured_summary(self, text: str, analysis_results: Dict) -> Dict:
        """
        Generate a structured summary including key information from analysis
        """
        # Generate basic summary
        summary = self.generate_summary(text)

        # Combine with analysis results
        structured_summary = {
            'summary': summary,
            'key_entities': {
                'organizations': list(set(analysis_results.get('entities', {}).get('organizations', []))),
                'persons': list(set(analysis_results.get('entities', {}).get('persons', []))),
                'locations': list(set(analysis_results.get('entities', {}).get('locations', [])))
            },
            'key_points': analysis_results.get('key_phrases', [])[:5],  # Top 5 key phrases
            'document_stats': analysis_results.get('statistics', {})
        }

        return structured_summary