import os
import re

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Target common redundant helper implementations that conflict with imports
    patterns_to_remove = [
        r'function resolveNestedField\(obj: any, fallback: any, field: string\) \{[\s\S]*?\}',
        r'function resolveField\(primary: any, fallback: any, city\?: string\) \{[\s\S]*?\}',
        r'// Note: Fixed imports from previous hardened pages if they had errors.'
    ]
    
    new_content = content
    for p in patterns_to_remove:
        new_content = re.sub(p, '', new_content)
    
    if new_content != content:
        # Final cleanup of extra whitespace at end of file
        new_content = new_content.strip() + '\n'
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
                    print(f"REMOVED REDUNDANT HELPERS: {full_path}")
                    count += 1
    print(f"DONE. Total files fixed: {count}")
