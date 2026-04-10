import os

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    seen = set()
    duplicates = []
    for line in lines:
        s = line.strip()
        if s.startswith('import '):
            if s in seen:
                duplicates.append(s)
            seen.add(s)
            
    if duplicates:
        print(f"DUPLICATES in {path}:")
        for d in duplicates:
            print(f"  - {d}")
        return True
    return False

if __name__ == "__main__":
    count = 0
    for root, dirs, files in os.walk('app'):
        for f in files:
            if f.endswith('.tsx'):
                if check_file(os.path.join(root, f)):
                    count += 1
    print(f"DONE. Found {count} files with duplicates.")
