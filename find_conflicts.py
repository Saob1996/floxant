import os

def find_conflicts():
    conflicts = []
    others = []
    for root, dirs, files in os.walk('app'):
        if 'page.tsx' in files and 'page.ts' in files:
            conflicts.append(root)
        for f in files:
            if f.endswith('.tsx') and ('page' in f or 'layout' in f):
                # Check for things like page.tsx.tsx
                if f.count('.tsx') > 1:
                    others.append(os.path.join(root, f))
            if f.endswith('.ts') and ('page' in f or 'layout' in f):
                # In app dir, page and layout should be .tsx
                others.append(os.path.join(root, f))
    
    if conflicts:
        print("CONFIRMED CONFLICTS (page.ts AND page.tsx):")
        for c in conflicts:
            print(f"  - {c}")
    if others:
        print("OTHER POTENTIAL STRAY FILES:")
        for o in others:
            print(f"  - {o}")
    
    return conflicts + others

if __name__ == "__main__":
    results = find_conflicts()
    print(f"DONE. Found {len(results)} issues.")
