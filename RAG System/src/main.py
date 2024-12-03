"""
Main entry point for the RAG system
"""

import os
from typing import List, Dict
from retrieval import TextRetriever
from analysis import TextAnalyzer
from summary import TextSummarizer
from config import DATA_DIR

class RAGSystem:
    def __init__(self, use_openai: bool = False):
        self.retriever = TextRetriever()
        self.analyzer = TextAnalyzer()
        self.summarizer = TextSummarizer(use_openai=use_openai)

    def process_documents(self, documents: List[str]):
        """Process and index new documents"""
        # Clean and segment documents
        processed_docs = []
        for doc in documents:
            # Clean text
            cleaned_text = self.analyzer.clean_text(doc)
            # Segment into chunks if necessary
            segments = self.analyzer.segment_text(cleaned_text)
            processed_docs.extend(segments)

        # Add to retriever
        self.retriever.add_documents(processed_docs)
        return len(processed_docs)

    def query_and_analyze(self, query: str, k: int = 5) -> Dict:
        """
        Query the system and generate analysis and summary
        """
        # Retrieve relevant documents
        retrieved_docs = self.retriever.search(query, k=k)

        if not retrieved_docs:
            return {
                "status": "error",
                "message": "No relevant documents found"
            }

        # Combine retrieved texts
        combined_text = "\n".join([doc['content'] for doc in retrieved_docs])

        # Analyze text
        analysis_results = self.analyzer.analyze_text(combined_text)

        # Generate summary
        summary_results = self.summarizer.generate_structured_summary(
            combined_text,
            analysis_results
        )

        return {
            "status": "success",
            "query": query,
            "summary": summary_results['summary'],
            "key_entities": summary_results['key_entities'],
            "key_points": summary_results['key_points'],
            "document_stats": summary_results['document_stats'],
            "retrieved_documents": retrieved_docs
        }

def main():
    # Initialize the RAG system
    rag_system = RAGSystem(use_openai=False)

    # Example usage
    # 1. Load and process documents
    sample_docs = [
        "Sample company information and text here.",
        "More company information and details here."
    ]
    num_processed = rag_system.process_documents(sample_docs)
    print(f"Processed {num_processed} documents")

    # 2. Query the system
    query = "What are the main business activities?"
    results = rag_system.query_and_analyze(query)

    # 3. Print results
    if results["status"] == "success":
        print("\nQuery Results:")
        print(f"Summary: {results['summary']}")
        print("\nKey Entities:")
        for entity_type, entities in results['key_entities'].items():
            print(f"{entity_type}: {', '.join(entities)}")
        print("\nKey Points:")
        for point in results['key_points']:
            print(f"- {point}")
    else:
        print(f"Error: {results['message']}")

if __name__ == "__main__":
    main()