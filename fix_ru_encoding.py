#!/usr/bin/env python3
"""
Fix ru.json: character-by-character repair of CP1252-double-encoded UTF-8.

Corruption: UTF-8 bytes \xD0\x93 → read as CP1252 → U+00D0, U+201C → re-encoded as UTF-8.
Some chars survived (ones below U+0100 that map the same in Latin-1 and CP1252).

Fix strategy: go char by char. If a char is in the Latin-1/CP1252 range (U+0080..U+00FF
or specific CP1252 chars like U+201C), collect consecutive such chars, encode them back 
to bytes using CP1252, then re-decode as UTF-8.
"""
import json
import os
import sys

INPUT = r"c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json"
OUTPUT = INPUT

# Characters that exist in CP1252 but not in Latin-1 (they map from bytes 0x80-0x9F)
CP1252_SPECIAL = {
    '\u20AC': 0x80,  # €
    '\u201A': 0x82,  # ‚
    '\u0192': 0x83,  # ƒ
    '\u201E': 0x84,  # „
    '\u2026': 0x85,  # …
    '\u2020': 0x86,  # †
    '\u2021': 0x87,  # ‡
    '\u02C6': 0x88,  # ˆ
    '\u2030': 0x89,  # ‰
    '\u0160': 0x8A,  # Š
    '\u2039': 0x8B,  # ‹
    '\u0152': 0x8C,  # Œ
    '\u017D': 0x8E,  # Ž
    '\u2018': 0x91,  # '
    '\u2019': 0x92,  # '
    '\u201C': 0x93,  # "
    '\u201D': 0x94,  # "
    '\u2022': 0x95,  # •
    '\u2013': 0x96,  # –
    '\u2014': 0x97,  # —
    '\u02DC': 0x98,  # ˜
    '\u2122': 0x99,  # ™
    '\u0161': 0x9A,  # š
    '\u203A': 0x9B,  # ›
    '\u0153': 0x9C,  # œ
    '\u017E': 0x9E,  # ž
    '\u0178': 0x9F,  # Ÿ
}


def is_garbled_char(ch):
    """Check if a character looks like it came from CP1252 double-encoding."""
    cp = ord(ch)
    # Latin-1 supplement range (0x80-0xFF) — these survive round-trip
    if 0x80 <= cp <= 0xFF:
        return True
    # CP1252-specific chars (0x80-0x9F mapping in CP1252)
    if ch in CP1252_SPECIAL:
        return True
    return False


def char_to_byte(ch):
    """Convert a potentially double-encoded character back to its original byte value."""
    cp = ord(ch)
    if 0x00 <= cp <= 0xFF:
        return bytes([cp])
    if ch in CP1252_SPECIAL:
        return bytes([CP1252_SPECIAL[ch]])
    # Can't convert
    return None


def fix_string(s):
    """Fix a double-encoded string character by character."""
    result = []
    i = 0
    
    while i < len(s):
        ch = s[i]
        
        if is_garbled_char(ch):
            # Collect consecutive garbled characters
            byte_buf = bytearray()
            j = i
            while j < len(s) and is_garbled_char(s[j]):
                b = char_to_byte(s[j])
                if b is None:
                    break
                byte_buf.extend(b)
                j += 1
            
            if byte_buf:
                # Try to decode the collected bytes as UTF-8
                try:
                    decoded = bytes(byte_buf).decode('utf-8')
                    result.append(decoded)
                    i = j
                    continue
                except UnicodeDecodeError:
                    # Try partial decoding - process what we can
                    pass
            
            # Fallback: keep original character
            result.append(ch)
            i += 1
        else:
            result.append(ch)
            i += 1
    
    return ''.join(result)


def fix_value(v):
    if isinstance(v, str):
        return fix_string(v)
    elif isinstance(v, list):
        return [fix_value(item) for item in v]
    elif isinstance(v, dict):
        return {k: fix_value(val) for k, val in v.items()}
    return v


# Footer: English → Russian
FOOTER_RU = {
    "privacy": "Политика конфиденциальности",
    "terms": "Общие условия",
    "services": "Услуги",
    "moving": "Переезд",
    "private_moving": "Частный переезд",
    "office_moving": "Офисный переезд",
    "furniture_assembly": "Сборка мебели",
    "cleaning_clearance": "Уборка и расчистка",
    "locations": "Локации",
    "company": "Компания",
    "about_us": "О нас",
    "contact": "Контакты",
    "imprint": "Импрессум",
    "withdrawal": "Право отзыва",
    "moving_header": "Переезд",
    "cleaning_clearance_header": "Уборка и расчистка",
    "locations_header": "Локации",
    "special_header": "Специальное",
    "no_parking_zone": "Зона запрета парковки",
    "cleaning": "Уборка",
    "clearance": "Расчистка помещений",
    "cleaning_bavaria": "Уборка Бавария",
    "clearance_bavaria": "Расчистка Бавария",
    "apartment_clearance": "Расчистка квартир",
    "moving_24h": "Срочный переезд 24ч",
    "student_moving": "Студенческий переезд",
    "family_moving": "Семейный переезд",
    "senior_moving": "Переезд для пожилых",
    "moving_costs": "Стоимость переезда",
    "service_area": "Зона обслуживания",
    "guide": "Руководство",
    "internal": "Внутреннее",
}


def main():
    with open(INPUT, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Fix encoding
    data = fix_value(data)

    # Fix footer
    if 'footer' in data:
        for key, ru_val in FOOTER_RU.items():
            if key in data['footer']:
                current = data['footer'][key]
                if current and all(ord(c) < 128 for c in current):
                    data['footer'][key] = ru_val

    # Write
    with open(OUTPUT, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

    # Verify
    with open(OUTPUT, 'r', encoding='utf-8') as f:
        verify = json.load(f)
    
    home = verify['nav']['home']
    sys.stdout.buffer.write(b"nav.home codepoints: ")
    for c in home:
        sys.stdout.buffer.write(f"U+{ord(c):04X} ".encode('ascii'))
    sys.stdout.buffer.write(b"\n")
    
    all_cyrillic = all(0x0400 <= ord(c) <= 0x04FF for c in home)
    sys.stdout.buffer.write(f"nav.home all cyrillic: {all_cyrillic}\n".encode('utf-8'))
    
    # Also check a few more keys
    hero_title = verify.get('hero', {}).get('title', '')
    sys.stdout.buffer.write(b"hero.title codepoints (first 10): ")
    for c in hero_title[:10]:
        sys.stdout.buffer.write(f"U+{ord(c):04X} ".encode('ascii'))
    sys.stdout.buffer.write(b"\n")
    
    size = os.path.getsize(OUTPUT)
    sys.stdout.buffer.write(f"File size: {size} bytes\n".encode('utf-8'))
    sys.stdout.buffer.write(b"JSON valid: True\nDONE!\n")


if __name__ == '__main__':
    main()
