import sys
import os
from agents import AgentManager
from visualizer import create_visual_graph
from colorama import init, Fore, Style

init()

def main():
    print(f"{Fore.CYAN}=== News Propagation Graph Agent ==={Style.RESET_ALL}")
    
    topic = input("Enter the news topic/headline to analyze: ")
    if not topic:
        return

    manager = AgentManager()
    candidates = []

    # 3 Separate Chats for Generation
    for i in range(3):
        graph_data = manager.generate_candidate_graph(topic, i+1)
        if graph_data:
            candidates.append(graph_data)

    if not candidates:
        print(f"{Fore.RED}Failed to generate any valid graphs.{Style.RESET_ALL}")
        return

    # 1 Chat for Evaluation
    final_graph = manager.evaluate_and_select(candidates, topic)

    # Visualization
    try:
        file_path = create_visual_graph(final_graph, topic)
        abs_path = os.path.abspath(file_path)
        print(f"\n{Fore.GREEN}SUCCESS! Graph generated.{Style.RESET_ALL}")
        print(f"Open this file in your browser: {Fore.YELLOW}{abs_path}{Style.RESET_ALL}")
    except Exception as e:
        print(f"{Fore.RED}Visualization error: {e}{Style.RESET_ALL}")

if __name__ == "__main__":
    main()