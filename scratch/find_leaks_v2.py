import json
import os

def check_leaks():
    de_path = r'dictionaries/de.json'
    ru_path = r'dictionaries/ru.json'

    if not os.path.exists(de_path) or not os.path.exists(ru_path):
        print("Missing dictionary files.")
        return

    with open(de_path, 'r', encoding='utf-8-sig') as f:
        de = json.load(f)
    with open(ru_path, 'r', encoding='utf-8-sig') as f:
        ru = json.load(f)

    sections = ['nav', 'common', 'calculator', 'booking']
    leaks = {}

    for sec in sections:
        de_sec = de.get(sec, {})
        ru_sec = ru.get(sec, {})
        for k, v in de_sec.items():
            # Check if key is missing in RU or value is identical to DE (and not a name/number)
            ru_val = ru_sec.get(k)
            if not ru_val or (ru_val == v and len(str(v)) > 3 and not str(v).isdigit()):
                if sec not in leaks:
                    leaks[sec] = []
                leaks[sec].append({
                    "key": k,
                    "de": v,
                    "ru": ru_val
                })

    print(json.dumps(leaks, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    check_leaks()
