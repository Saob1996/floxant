#!/usr/bin/env python3
"""Verify structure and find VS Code's reported issues."""
import json

filepath = r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json'
content = open(filepath, 'r', encoding='utf-8-sig').read()
data = json.loads(content)

pages = data.get('pages', {})
print(f"Total page keys: {len(pages)}")

# Check for the visible box characters (en-dash, check mark, etc)
lines = content.split('\n')
box_chars = []
for i, line in enumerate(lines, 1):
    for j, ch in enumerate(line):
        code = ord(ch)
        # Check marks and arrows that render as boxes
        if code in (0x2713, 0x2192, 0x1F64C, 0x2714):
            box_chars.append((i, j, ch, f"U+{code:04X}"))

if box_chars:
    print(f"\nBOX-RENDERING CHARS ({len(box_chars)}):")
    for line, col, ch, code in box_chars:
        print(f"  Line {line}, col {col}: {code} '{ch}'")
else:
    print("\nNo box-rendering characters found")

# Find the actual line numbers of key sections the screenshots show
for key in ['entruempelung_regensburg', 'service_montage', 'service_entruempelung', '24h_umzug_bayern']:
    for i, line in enumerate(lines, 1):
        if f'"{key}"' in line:
            print(f"  {key} at line {i}")
            break

# Check if VS Code file might have been the OLD version (before json.dump)
# The VS Code footer in screenshot shows "UTF-8 with BOM" but we only just added BOM
# This means VS Code might be showing the old pre-serialization file
print(f"\nFile starts with BOM: {content[:1] == chr(0xFEFF) or open(filepath, 'rb').read()[:3] == b'\\xef\\xbb\\xbf'}")

# Verify all check marks
check_count = content.count('\u2713')
print(f"Check marks (U+2713): {check_count}")
en_dash_count = content.count('\u2013')
print(f"En-dashes (U+2013): {en_dash_count}")
