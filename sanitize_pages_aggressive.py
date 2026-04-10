import os

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '\\"' not in content:
        return False
    
    # Aggressive global replacement of escaped quotes
    # Based on the corruption pattern observed, these are all artifacts of a failed write tool
    new_content = content.replace('\\"', '"')
    
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
