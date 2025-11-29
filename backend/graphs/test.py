import requests
import json
from config import API_KEY

# This is the direct URL to Google's API, bypassing the Python SDK
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"

headers = {
    'Content-Type': 'application/json'
}

data = {
    "contents": [{
        "parts": [{"text": "If you receive this, reply with 'Connection Successful'"}]
    }]
}

print(f"--- TESTING RAW HTTP CONNECTION ---")
print(f"Target: generativelanguage.googleapis.com")

try:
    # We set a 10-second timeout so it doesn't hang forever
    response = requests.post(url, headers=headers, json=data, timeout=10)
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        print("Response:", response.json()['candidates'][0]['content']['parts'][0]['text'])
        print("--- SUCCESS: The API is reachable via HTTP ---")
    else:
        print("Error Response:", response.text)

except Exception as e:
    print(f"--- CONNECTION FAILED ---")
    print(f"Error: {e}")