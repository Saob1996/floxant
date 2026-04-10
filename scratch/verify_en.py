import json
import os

def check_leaks_en():
    de_path = r'dictionaries/de.json'
    en_path = r'dictionaries/en.json'

    with open(de_path, 'r', encoding='utf-8-sig') as f:
        de = json.load(f)
    with open(en_path, 'r', encoding='utf-8-sig') as f:
        en = json.load(f)

    sections = ['nav', 'common', 'calculator']
    leaks = []

    for sec in sections:
        d_sec = de.get(sec, {})
        e_sec = en.get(sec, {})
        for k, v in d_sec.items():
            e_val = e_sec.get(k)
            # Find missing or untranslated (identical) strings
            if not e_val or (e_val == v and len(str(v)) > 3 and not str(v).isdigit()):
                leaks.append({'sec': sec, 'k': k, 'de': v, 'en': e_val})

    print(json.dumps(leaks, indent=2))

if __name__ == "__main__":
    check_leaks_en()
