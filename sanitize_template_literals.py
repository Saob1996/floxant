import os
import re

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern 1: Starts with backtick, has interpolation, ends with double-quote
    # Example: `Umzug ${city} | FLOXANT"
    new_content = re.sub(r'`([^`\n]*\${[^}\n]+}[^`\n]*)"', r'`\1`', content)
    
    # Pattern 2: Starts with backtick, ends with double-quote (no interpolation)
    # Example: `https://www.floxant.de/${lang}" -> this HAS interpolation but maybe others don't
    # Let's fix common occurrences
    new_content = new_content.replace('`Home",', '`Home`,')
    new_content = new_content.replace('`Umzug",', '`Umzug`,')
    
    # Handle breadcrumbs specifically
    new_content = re.sub(r'href: `([^`\n]+)"', r'href: `\1`', new_content)
    new_content = re.sub(r'item: `([^`\n]+)"', r'item: `\1`', new_content)
    new_content = re.sub(r'url: `([^`\n]+)"', r'url: `\1`', new_content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    # Search all .tsx files in the app directory
    for root, dirs, files in os.walk('app'):
        for f in files:
            if f.endswith('.tsx'):
                full_path = os.path.join(root, f)
                if fix_file(full_path):
                    print(f"FIXED: {full_path}")
                    count += 1
    print(f"DONE. Total files fixed: {count}")
