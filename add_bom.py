"""Add UTF-8 BOM to ru.json so VS Code correctly detects encoding."""
import sys

path = r"c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json"

# Read current content
with open(path, 'rb') as f:
    content = f.read()

# Check if BOM already exists
if content[:3] == b'\xef\xbb\xbf':
    sys.stdout.buffer.write(b"BOM already present, skipping.\n")
else:
    # Add UTF-8 BOM
    with open(path, 'wb') as f:
        f.write(b'\xef\xbb\xbf')
        f.write(content)
    sys.stdout.buffer.write(b"UTF-8 BOM added successfully.\n")

# Verify
import json
with open(path, 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

home = data['nav']['home']
sys.stdout.buffer.write(f"nav.home = {home}\n".encode('utf-8'))
sys.stdout.buffer.write(b"JSON valid: True\n")
sys.stdout.buffer.write(b"DONE\n")
