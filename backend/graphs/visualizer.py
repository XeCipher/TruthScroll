from pyvis.network import Network
import os

def create_visual_graph(data, topic):
    print("Generating visual graph...")
    
    # Initialize PyVis network
    net = Network(height="750px", width="100%", bgcolor="#222222", font_color="white", select_menu=True)
    
    # Physics settings
    net.force_atlas_2based(
        gravity=-50,
        central_gravity=0.01,
        spring_length=100,
        spring_strength=0.08,
        damping=0.4,
        overlap=0
    )

    colors = {
        "Supportive": "#00ff00",
        "Critical": "#ff4444",
        "Neutral": "#44aaff",
        "Fact-Check": "#ffff00"
    }

    if 'nodes' in data:
        for node in data['nodes']:
            verdict = node.get('verdict', 'Neutral')
            color = colors.get(verdict, "#cccccc")
            
            title_html = (
                f"<b>{node.get('label', 'Unknown')}</b><br>"
                f"<i>{node.get('date', '')}</i><br>"
                f"Verdict: {verdict}<br><br>"
                f"{node.get('summary', '')}<br>"
                f"<a href='{node.get('url', '#')}' target='_blank' style='color: white;'>Read Source</a>"
            )

            net.add_node(
                node['id'], 
                label=node.get('label', 'Node'), 
                title=title_html, 
                color=color,
                shape="dot",
                size=25,
                borderWidth=2,
                borderWidthSelected=4
            )

    if 'edges' in data:
        for edge in data['edges']:
            net.add_edge(
                edge['source'], 
                edge['target'], 
                title=edge.get('relationship', 'related'),
                label=edge.get('relationship', ''),
                color="#555555",
                arrows="to"
            )

    safe_name = "".join([c for c in topic if c.isalnum()])
    output_file = f"news_graph_{safe_name}.html"
    
    net.show_buttons(filter_=['physics'])
    net.write_html(output_file)
    return output_file