from rag_chatbot import RAGChatbot
import os

def setup_demo_data():
    """Create demo data files if they don't exist"""
    os.makedirs("./knowledge_base", exist_ok=True)
    
    # Create sample documents
    samples = [
        {
            "filename": "company_info.txt",
            "content": """
            Acme Corporation was founded in 2010 and specializes in AI-powered solutions.
            Our mission is to make artificial intelligence accessible to businesses of all sizes.
            We have offices in New York, London, and Tokyo with over 500 employees worldwide.
            Acme's flagship product is the AcmeBot, a versatile assistant for businesses.
            """
        },
        {
            "filename": "product_faq.txt",
            "content": """
            Q: What is AcmeBot?
            A: AcmeBot is an AI assistant designed to help businesses with customer support, scheduling, and data analysis.
            
            Q: How much does AcmeBot cost?
            A: AcmeBot has three pricing tiers: Basic ($50/month), Pro ($100/month), and Enterprise (custom pricing).
            
            Q: Does AcmeBot support multiple languages?
            A: Yes, AcmeBot currently supports English, Spanish, French, German, and Japanese.
            
            Q: What's the difference between Basic and Pro plans?
            A: The Pro plan includes advanced analytics, priority support, and custom integrations.
            """
        },
        {
            "filename": "technical_docs.txt",
            "content": """
            AcmeBot Technical Documentation
            
            System Requirements:
            - Operating System: Windows 10+, macOS 10.14+, or Linux
            - RAM: 8GB minimum, 16GB recommended
            - Storage: 1GB free space
            - Internet: Broadband connection
            
            API Endpoints:
            - /api/v1/query - For sending natural language queries
            - /api/v1/analytics - For retrieving usage statistics
            - /api/v1/configure - For adjusting system settings
            
            The AcmeBot API uses OAuth 2.0 for authentication and returns responses in JSON format.
            """
        }
    ]
    
    for sample in samples:
        filepath = os.path.join("./knowledge_base", sample["filename"])
        if not os.path.exists(filepath):
            with open(filepath, "w") as f:
                f.write(sample["content"])
            print(f"Created sample file: {sample['filename']}")
    
    print("Demo data setup complete!")

def main():
    # Setup demo data
    setup_demo_data()
    
    # Create and run chatbot
    print("\nInitializing RAG Chatbot with demo data...")
    # chatbot = RAGChatbot(data_dir="./knowledge_base")
    
    # Check if API key is set
    if not os.getenv("OPENAI_API_KEY"):
        print("ERROR: Please set your OPENAI_API_KEY environment variable or in a .env file.")
        exit(1)
    
    # # Try to load existing database first
    # if not chatbot.load_existing_db():
    #     # If no existing database, load and process documents
    #     if not chatbot.load_and_process_documents():
    #         print("Failed to load or process documents.")
    #         exit(1)
    
    # # Initialize QA chain
    # if chatbot.initialize_qa_chain():
    #     # Run interactive session
    #     chatbot.run_interactive()

if __name__ == "__main__":
    main()