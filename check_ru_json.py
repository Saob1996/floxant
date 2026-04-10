import json
import os

p = r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json'
if not os.path.exists(p):
    print("FILE_NOT_FOUND")
    exit(1)

with open(p, 'rb') as f:
    b = f.read()

try:
    # Use 'ignore' for decoding to only test the structural braces/commas/quotes
    s = b.decode('utf-8', errors='ignore')
    json.loads(s)
    print("STRUCTURAL_VALID")
except json.JSONDecodeError as e:
    print(f"STRUCTURAL_INVALID: {e}")
    # Print the line where it fails
    lines = s.splitlines()
    if e.lineno <= len(lines):
        print(f"Error context: {lines[e.lineno-1]}")
except Exception as e:
    print(f"ERROR: {e}")
