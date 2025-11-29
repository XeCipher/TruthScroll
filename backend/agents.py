import json
import google.generativeai as genai
from duckduckgo_search import DDGS
from config import configure_genai
from prompts import GENERATOR_SYSTEM_PROMPT, EVALUATOR_SYSTEM_PROMPT
from colorama import Fore, Style

class AgentManager:
    def __init__(self):
        self.model = configure_genai()

    def search_web(self, query):
        """Performs a real web search using DuckDuckGo"""
        print(f"{Fore.BLUE}  -> Searching DuckDuckGo for: {query}...{Style.RESET_ALL}")
        results_text = ""
        try:
            # We use the text search which is the most stable
            with DDGS() as ddgs:
                results = list(ddgs.text(query, max_results=6))
                
            for r in results:
                results_text += f"Title: {r['title']}\nLink: {r['href']}\nSnippet: {r['body']}\n\n"
                
        except Exception as e:
            print(f"{Fore.RED}  Search error: {e}{Style.RESET_ALL}")
            return "No search results found due to error."
        
        return results_text

    def clean_json_response(self, text):
        """Helper to strip markdown code blocks from LLM response"""
        text = text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        return text.strip()

    def generate_candidate_graph(self, topic, attempt_id):
        print(f"{Fore.YELLOW}[Agent {attempt_id}] Researching topic: '{topic}'...{Style.RESET_ALL}")
        
        # 1. SEARCH PHASE
        search_data = self.search_web(topic)
        
        if not search_data or len(search_data) < 10:
            print(f"{Fore.RED}  Not enough data found.{Style.RESET_ALL}")
            return None

        # 2. GENERATION PHASE
        print(f"{Fore.YELLOW}  -> Analyzing data and generating JSON...{Style.RESET_ALL}")
        
        chat = self.model.start_chat(history=[])
        
        # We feed the search results directly into the prompt
        prompt = f"""{GENERATOR_SYSTEM_PROMPT}

        TOPIC: {topic}
        
        HERE IS THE SEARCH DATA YOU MUST USE:
        {search_data}
        """
        
        try:
            # stream=False is safer for REST connections
            response = chat.send_message(prompt, stream=False)
            
            clean_json = self.clean_json_response(response.text)
            data = json.loads(clean_json)
            print(f"{Fore.GREEN}  -> Graph generated successfully.{Style.RESET_ALL}")
            return data
            
        except Exception as e:
            print(f"\n{Fore.RED}[Agent {attempt_id}] Generation Failed: {e}{Style.RESET_ALL}")
            return None

    def evaluate_and_select(self, candidates, topic):
        print(f"{Fore.CYAN}[Evaluator Agent] Reviewing {len(candidates)} graphs...{Style.RESET_ALL}")
        
        chat = self.model.start_chat(history=[])
        
        candidate_text = ""
        for i, data in enumerate(candidates):
            candidate_text += f"\n--- CANDIDATE {i} ---\n{json.dumps(data)}"

        prompt = f"{EVALUATOR_SYSTEM_PROMPT}\n\nTOPIC: {topic}\n{candidate_text}"
        
        try:
            response = chat.send_message(prompt, stream=False)
            clean_json = self.clean_json_response(response.text)
            result = json.loads(clean_json)
            
            best_index = result.get("best_candidate_index", 0)
            reason = result.get("reasoning", "No reason provided.")
            
            print(f"{Fore.GREEN}[Evaluator Agent] Selected Candidate {best_index}{Style.RESET_ALL}")
            print(f"{Fore.GREEN}Reason: {reason}{Style.RESET_ALL}")
            
            return candidates[best_index]
        except Exception as e:
            print(f"{Fore.RED}Evaluation failed, defaulting to first candidate. Error: {e}{Style.RESET_ALL}")
            return candidates[0]