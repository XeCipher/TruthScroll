import os
import google.generativeai as genai

# Get your key from: https://aistudio.google.com/app/apikey
API_KEY = "AIzaSyCpyu2L3mXzrwRtEn84RYSxEQax5y_9R_w"

# Model Configuration
MODEL_NAME = "gemini-2.5-flash" 

def configure_genai():
    # transport="rest" is crucial for your network connection
    genai.configure(api_key=API_KEY, transport="rest")
    
    # WE REMOVED THE TOOLS. 
    # The agent will handle search manually via DuckDuckGo.
    return genai.GenerativeModel(model_name=MODEL_NAME)