import os
import re

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'getSpecialtyPageData' not in content:
        return False
    
    new_content = content
    
    # 1. Fix mismatched template literals: `... " -> `... `
    new_content = re.sub(r'(`[^`\n]*\${[^}\n]+}[^`\n]*)"', r'\1`', new_content)
    
    # 2. Fix unterminated template literals ending in comma: `... , -> `... `,
    # Specifically for url, item, href
    new_content = re.sub(r'(: `[^`\n,]+),', r'\1`,', new_content)
    
    # 3. Ensure no trailing double quotes after backticks
    new_content = new_content.replace('`"', '`')
    
    if new_content != content:
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
                    print(f"RE-SANITIZED: {full_path}")
                    count += 1
    print(f"DONE. Total files re-sanitized: {count}")
