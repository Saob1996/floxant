"""Find all strings in ru.json that still have encoding problems."""
import json, sys

f = open(r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json', 'r', encoding='utf-8')
data = json.load(f)
f.close()

# Characters that indicate double-encoding remnants
GARBLED_CHARS = set()
for cp in range(0x80, 0x100):
    GARBLED_CHARS.add(chr(cp))
# CP1252-specific chars
for ch in ['\u20AC','\u201A','\u0192','\u201E','\u2026','\u2020','\u2021',
           '\u02C6','\u2030','\u0160','\u2039','\u0152','\u017D',
           '\u2018','\u2019','\u201C','\u201D','\u2022','\u2013',
           '\u2014','\u02DC','\u2122','\u0161','\u203A','\u0153',
           '\u017E','\u0178']:
    GARBLED_CHARS.add(ch)

# But exclude legitimate chars that appear in Russian text
# «» are actual guillemets, — is em-dash, € is euro sign
LEGIT_CHARS = {'«', '»', '—', '–', '€', '…'}

def check_string(path, s):
    """Check if string has encoding issues."""
    bad_chars = []
    for i, c in enumerate(s):
        if c in GARBLED_CHARS and c not in LEGIT_CHARS:
            # Check if surrounded by Cyrillic on both sides (legitimate)
            # vs being part of a garbled sequence
            bad_chars.append((i, c, f"U+{ord(c):04X}"))
    
    if bad_chars:
        sys.stdout.buffer.write(f"GARBLED: {path}\n".encode('utf-8'))
        # Show first few bad chars
        for pos, ch, cp in bad_chars[:5]:
            ctx_start = max(0, pos-3)
            ctx_end = min(len(s), pos+4)
            context = s[ctx_start:ctx_end]
            sys.stdout.buffer.write(f"  pos {pos}: {cp} context: ".encode('utf-8'))
            sys.stdout.buffer.write(repr(context).encode('utf-8'))
            sys.stdout.buffer.write(b"\n")
        if len(bad_chars) > 5:
            sys.stdout.buffer.write(f"  ... and {len(bad_chars)-5} more\n".encode('utf-8'))

def walk(data, path=""):
    if isinstance(data, str):
        check_string(path, data)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            walk(item, f"{path}[{i}]")
    elif isinstance(data, dict):
        for k, v in data.items():
            walk(v, f"{path}.{k}" if path else k)

walk(data)
sys.stdout.buffer.write(b"SCAN DONE\n")
