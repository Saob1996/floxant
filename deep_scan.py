"""
Deep analysis: find ALL non-ASCII, non-Cyrillic, non-standard characters in ru.json.
This will show us exactly what VS Code is struggling with.
"""
import json, sys, unicodedata

f = open(r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json', 'r', encoding='utf-8')
data = json.load(f)
f.close()

# Track all unique "suspicious" characters
suspicious = {}

def scan(value, path=""):
    if isinstance(value, str):
        for i, ch in enumerate(value):
            cp = ord(ch)
            # Skip ASCII (0x00-0x7F) and standard Cyrillic (0x400-0x4FF)
            if cp <= 0x7F or (0x0400 <= cp <= 0x04FF):
                continue
            # This is a "special" character 
            name = unicodedata.name(ch, f"UNKNOWN-U+{cp:04X}")
            cat = unicodedata.category(ch)
            if ch not in suspicious:
                suspicious[ch] = {
                    'codepoint': f"U+{cp:04X}",
                    'name': name,
                    'category': cat,
                    'count': 0,
                    'examples': []
                }
            suspicious[ch]['count'] += 1
            if len(suspicious[ch]['examples']) < 3:
                ctx_start = max(0, i-10)
                ctx_end = min(len(value), i+11)
                suspicious[ch]['examples'].append({
                    'path': path,
                    'context': value[ctx_start:ctx_end]
                })
    elif isinstance(value, list):
        for i, item in enumerate(value):
            scan(item, f"{path}[{i}]")
    elif isinstance(value, dict):
        for k, v in value.items():
            scan(v, f"{path}.{k}" if path else k)

scan(data)

sys.stdout.buffer.write(f"Found {len(suspicious)} unique special characters:\n\n".encode())

for ch, info in sorted(suspicious.items(), key=lambda x: -x[1]['count']):
    sys.stdout.buffer.write(f"  {info['codepoint']} ({info['name']}) [{info['category']}] — {info['count']} occurrences\n".encode())
    for ex in info['examples'][:2]:
        # Replace the char with [!] for visibility
        ctx = ex['context'].replace(ch, f"[{info['codepoint']}]")
        sys.stdout.buffer.write(f"    {ex['path']}: ...{ctx}...\n".encode('utf-8'))
    sys.stdout.buffer.write(b"\n")

sys.stdout.buffer.write(b"DONE\n")
