import json
import os
import sys

# Ensure UTF-8 output even on Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def load_json(path):
    if not os.path.exists(path):
        return {}
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def find_missing_keys(base, target, prefix=""):
    missing = {}
    for key, value in base.items():
        current_key = f"{prefix}.{key}" if prefix else key
        if key not in target:
            missing[current_key] = value
        elif isinstance(value, dict) and isinstance(target[key], dict):
            sub_missing = find_missing_keys(value, target[key], current_key)
            if sub_missing:
                missing[current_key] = sub_missing
    return missing

def main():
    base_path = 'dictionaries/de.json'
    target_path = 'dictionaries/bg.json'
    
    base = load_json(base_path)
    target = load_json(target_path)
    
    missing = find_missing_keys(base, target)
    
    if not missing:
        print("Dictionary is fully translated!")
        return

    print(f"Total top-level missing keys/sections: {len(missing)}")
    
    # Just show the first available missing top-level section
    first_key = next(iter(missing))
    print(f"\n--- Focus Category: {first_key} ---")
    print(json.dumps({first_key: missing[first_key]}, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
