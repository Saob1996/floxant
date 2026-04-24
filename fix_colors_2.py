import os
import re

directories = ['app', 'components']

def replace_classes(content):
    replacements = [
        # Catch any remaining text-white opacities
        (r'\btext-white/(\d+)\b', r'text-foreground/\1'),
        (r'\btext-white/\[([^\]]+)\]\b', r'text-foreground/[\1]'),
        
        # Missed light colors
        (r'\btext-blue-100\b', 'text-blue-800 dark:text-blue-100'),
        (r'\btext-blue-50\b', 'text-blue-900 dark:text-blue-50'),
        (r'\btext-emerald-50\b', 'text-emerald-800 dark:text-emerald-50'),
        (r'\btext-emerald-100\b', 'text-emerald-700 dark:text-emerald-100'),
        (r'\btext-slate-50\b', 'text-slate-800 dark:text-slate-50'),
        (r'\btext-slate-100\b', 'text-slate-700 dark:text-slate-100'),
        (r'\btext-slate-200\b', 'text-slate-600 dark:text-slate-200'),
        (r'\btext-gray-50\b', 'text-gray-800 dark:text-gray-50'),
        (r'\btext-gray-100\b', 'text-gray-700 dark:text-gray-100'),
        
        # Missed border colors
        (r'\bborder-white/(\d+)\b', r'border-foreground/\1'),
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
                
                # Update email in legal pages
                if 'impressum' in filepath.lower() or 'agb' in filepath.lower() or 'datenschutz' in filepath.lower():
                    # Replace any existing email with info@floxant.de
                    # The existing email is likely kontakt@floxant.de or similar
                    new_content = re.sub(r'[a-zA-Z0-9_.+-]+@floxant\.de', 'info@floxant.de', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    changed_files += 1

print(f"Updated {changed_files} files.")
