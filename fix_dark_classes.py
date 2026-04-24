import os
import re

def fix_css():
    filepath = 'app/globals.css'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Make .flox-site-light variables have higher specificity
    content = content.replace('.flox-site-light {', 'html.dark .flox-site-light,\n.dark .flox-site-light,\n.flox-site-light {')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed CSS specificity")

def fix_tsx_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content
                
                # Remove dark:text-... classes that make text light
                content = re.sub(r'dark:text-(?:white|slate-100|slate-200|slate-300|blue-100|blue-200|amber-100|amber-200|emerald-100|emerald-200)(?:/[0-9]+)?', '', content)
                
                # Clean up multiple spaces that might result from removal
                content = re.sub(r'\s+', ' ', content).replace('className=" ', 'className="').replace(' "', '"')
                
                if content != original_content:
                    # Write the cleaned string (Note: removing newlines by replacing \s+ might ruin formatting! Let's do it safer)
                    pass

def safe_fix_tsx_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content
                
                # Remove dark:text-... classes that make text light
                # Use a regex that just replaces the class with empty string
                content = re.sub(r'\bdark:text-(?:white|slate-[123]00|blue-[123]00|amber-[123]00|emerald-[123]00)(?:/[0-9]+)?\b', '', content)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed {filepath}")

fix_css()
safe_fix_tsx_files('app')
safe_fix_tsx_files('components')
