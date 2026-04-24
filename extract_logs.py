import json
import re

with open(r'c:\Users\Admin\.gemini\antigravity\brain\212b34df-4c61-47cd-8ac6-2d6e0cfc1052\.system_generated\logs\overview.txt', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '"name":"view_file"' in line and 'app/page.tsx' in line:
        print(f'Found view_file call at line {i}')
    if '"source":"TOOL"' in line and '460 to 1221' in line:
        print(f'Found view_file response at line {i}')
        # Log lines are like: {"step_index":123,"source":"TOOL","type":"TOOL_RESPONSE","status":"DONE","created_at":"...","tool_calls":[{"name":"...","response":{"output":"..."}}]}
        try:
            # We can just extract the JSON
            data = json.loads(line)
            output = data['tool_calls'][0]['response']['output']
            print('Writing to recovered_page.txt...')
            with open('recovered_page.txt', 'w', encoding='utf-8') as out:
                out.write(output)
        except Exception as e:
            print('Error parsing JSON:', e)
