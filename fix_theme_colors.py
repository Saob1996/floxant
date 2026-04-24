import os
import re

directories = ['app', 'components']

def replace_classes(content):
    # Mapping exact classes to theme-adaptive classes
    replacements = [
        # Text colors
        (r'\btext-white/90\b', 'text-foreground/90'),
        (r'\btext-white/80\b', 'text-foreground/80'),
        (r'\btext-white/70\b', 'text-foreground/70'),
        (r'\btext-white/60\b', 'text-foreground/60'),
        (r'\btext-white/55\b', 'text-foreground/55'),
        (r'\btext-white/52\b', 'text-foreground/52'),
        (r'\btext-white/50\b', 'text-foreground/50'),
        (r'\btext-white/48\b', 'text-foreground/48'),
        (r'\btext-white/45\b', 'text-foreground/45'),
        (r'\btext-white/44\b', 'text-foreground/44'),
        (r'\btext-white/42\b', 'text-foreground/42'),
        (r'\btext-white/40\b', 'text-foreground/40'),
        (r'\btext-white/32\b', 'text-foreground/32'),
        (r'\btext-white/30\b', 'text-foreground/30'),
        (r'\btext-white/20\b', 'text-foreground/20'),
        (r'\btext-white/10\b', 'text-foreground/10'),
        (r'\btext-white/5\b', 'text-foreground/5'),
        (r'\btext-white\b', 'text-foreground'),
        
        # Border colors
        (r'\bborder-white/25\b', 'border-foreground/20'),
        (r'\bborder-white/20\b', 'border-foreground/20'),
        (r'\bborder-white/15\b', 'border-foreground/15'),
        (r'\bborder-white/10\b', 'border-foreground/10'),
        (r'\bborder-white/8\b', 'border-foreground/8'),
        (r'\bborder-white/5\b', 'border-foreground/5'),
        (r'\bborder-white/\[0\.04\]\b', 'border-foreground/[0.04]'),
        (r'\bborder-white/\[0\.06\]\b', 'border-foreground/[0.06]'),
        
        # Background overlays
        (r'\bbg-white/\[0\.02\]\b', 'bg-foreground/[0.02]'),
        (r'\bbg-white/\[0\.028\]\b', 'bg-foreground/[0.028]'),
        (r'\bbg-white/\[0\.03\]\b', 'bg-foreground/[0.03]'),
        (r'\bbg-white/\[0\.035\]\b', 'bg-foreground/[0.035]'),
        (r'\bbg-white/\[0\.04\]\b', 'bg-foreground/[0.04]'),
        (r'\bbg-white/\[0\.05\]\b', 'bg-foreground/[0.05]'),
        (r'\bbg-white/\[0\.055\]\b', 'bg-foreground/[0.055]'),
        (r'\bbg-white/\[0\.06\]\b', 'bg-foreground/[0.06]'),
        (r'\bbg-white/\[0\.07\]\b', 'bg-foreground/[0.07]'),
        (r'\bbg-white/\[0\.08\]\b', 'bg-foreground/[0.08]'),
        (r'\bbg-white/5\b', 'bg-foreground/5'),
        (r'\bbg-white/10\b', 'bg-foreground/10'),
        (r'\bbg-black/10\b', 'bg-foreground/5'),
        (r'\bbg-black/20\b', 'bg-foreground/5'),
        (r'\bbg-black/24\b', 'bg-foreground/5'),
        (r'\bbg-black/25\b', 'bg-foreground/5'),
        (r'\bbg-black/40\b', 'bg-foreground/10'),
        
        # Shadows
        (r'\bshadow-black/25\b', 'shadow-foreground/10'),
        (r'\bshadow-black/40\b', 'shadow-foreground/15'),
        
        # Accents
        (r'\btext-cyan-300\b', 'text-blue-600 dark:text-cyan-300'),
        (r'\btext-cyan-200\b', 'text-blue-500 dark:text-cyan-200'),
        (r'\btext-blue-300\b', 'text-blue-700 dark:text-blue-300'),
        (r'\btext-blue-200\b', 'text-blue-600 dark:text-blue-200'),
        (r'\btext-emerald-300\b', 'text-emerald-700 dark:text-emerald-300'),
        (r'\btext-emerald-200\b', 'text-emerald-600 dark:text-emerald-200'),
        (r'\btext-emerald-100\b', 'text-emerald-500 dark:text-emerald-100'),
        (r'\btext-amber-300\b', 'text-amber-700 dark:text-amber-300'),
        (r'\btext-amber-200\b', 'text-amber-600 dark:text-amber-200'),
        (r'\btext-amber-100\b', 'text-amber-500 dark:text-amber-100'),
    ]

    for old, new in replacements:
        content = re.sub(old, new, content)
        
    return content

changed_files = 0
for d in directories:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.tsx') or f.endswith('.ts'):
                filepath = os.path.join(root, f)
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                new_content = replace_classes(content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    changed_files += 1

print(f"Updated {changed_files} files.")
