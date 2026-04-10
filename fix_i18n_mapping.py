import os

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    bad = 'import { isValidLocale, type Locale } from "@/lib/specialty-page";'
    good = 'import { isValidLocale, type Locale } from "@/i18n-config";'
    
    if bad in content:
        new_content = content.replace(bad, good)
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    for root, dirs, files in os.walk('app'):
        for f in files:
            if f == 'page.tsx':
                full_path = os.path.join(root, f)
                if fix_file(full_path):
                    print(f"FIXED MAPPING: {full_path}")
                    count += 1
    print(f"DONE. Total files fixed: {count}")
