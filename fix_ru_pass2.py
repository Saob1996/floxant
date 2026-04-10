"""Find and fix remaining double-encoded segments that are adjacent to « » chars."""
import json, sys

INPUT = r"c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json"

CP1252_MAP = {
    '\u20AC': 0x80, '\u201A': 0x82, '\u0192': 0x83, '\u201E': 0x84,
    '\u2026': 0x85, '\u2020': 0x86, '\u2021': 0x87, '\u02C6': 0x88,
    '\u2030': 0x89, '\u0160': 0x8A, '\u2039': 0x8B, '\u0152': 0x8C,
    '\u017D': 0x8E, '\u2018': 0x91, '\u2019': 0x92, '\u201C': 0x93,
    '\u201D': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97,
    '\u02DC': 0x98, '\u2122': 0x99, '\u0161': 0x9A, '\u203A': 0x9B,
    '\u0153': 0x9C, '\u017E': 0x9E, '\u0178': 0x9F,
}

def is_garble_char(ch):
    cp = ord(ch)
    if 0xC0 <= cp <= 0xFF:
        return True
    if ch in CP1252_MAP:
        return True
    return False

def char_to_byte(ch):
    cp = ord(ch)
    if 0x00 <= cp <= 0xFF:
        return bytes([cp])
    if ch in CP1252_MAP:
        return bytes([CP1252_MAP[ch]])
    return None

def fix_string_aggressive(s):
    """More aggressive fix: also handle segments surrounded by « »"""
    result = []
    i = 0
    while i < len(s):
        ch = s[i]
        if is_garble_char(ch):
            buf = bytearray()
            j = i
            while j < len(s):
                if is_garble_char(s[j]):
                    b = char_to_byte(s[j])
                    if b:
                        buf.extend(b)
                        j += 1
                    else:
                        break
                else:
                    break
            if buf:
                try:
                    decoded = bytes(buf).decode('utf-8')
                    result.append(decoded)
                    i = j
                    continue
                except UnicodeDecodeError:
                    pass
            result.append(ch)
            i += 1
        else:
            result.append(ch)
            i += 1
    return ''.join(result)


def fix_value(v):
    if isinstance(v, str):
        return fix_string_aggressive(v)
    elif isinstance(v, list):
        return [fix_value(item) for item in v]
    elif isinstance(v, dict):
        return {k: fix_value(val) for k, val in v.items()}
    return v


with open(INPUT, 'r', encoding='utf-8') as f:
    data = json.load(f)

data = fix_value(data)

with open(INPUT, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')

# Verify
with open(INPUT, 'r', encoding='utf-8') as f:
    verify = json.load(f)

t = verify['booking']['upgrades']['maybe_box']['title']
sys.stdout.buffer.write(f"maybe_box.title codepoints: ".encode())
for c in t:
    sys.stdout.buffer.write(f"U+{ord(c):04X} ".encode())
sys.stdout.buffer.write(b"\n")

sys.stdout.buffer.write(b"DONE\n")
