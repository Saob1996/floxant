import os

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    ticks = content.count('`')
    quotes = content.count('"')
    
    if ticks % 2 != 0:
        print(f"BROKEN_TICKS: {path} ({ticks})")
        return True
    if quotes % 2 != 0:
        # Quotes can sometimes be odd if there's a legitimate apostrophe or something, 
        # but in these files it usually means corruption.
        # Actually, let's just focus on ticks first.
        pass
    return False

if __name__ == "__main__":
    count = 0
    for root, dirs, files in os.walk('app'):
        for f in files:
            if f == 'page.tsx':
                if check_file(os.path.join(root, f)):
                    count += 1
    print(f"DONE. Found {count} broken files.")
