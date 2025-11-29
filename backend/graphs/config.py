import os
import google.generativeai as genai

API_KEY = "SHHH!"

# Model Configuration
MODEL_NAME = "gemini-2.5-flash" 

def configure_genai():
    genai.configure(api_key=API_KEY, transport="rest")
    
    # The agent will handle search manually via DuckDuckGo.
    return genai.GenerativeModel(model_name=MODEL_NAME)
