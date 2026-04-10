import os

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '\\"next\\"' not in content and '\\"@/i18n-config\\"' not in content:
        return False
    
    # Restore clean quotes for imports and common patterns
    # We use very specific replacements to avoid side effects
    replacements = [
        ('\\"next\\"', '"next"'),
        ('\\"next/navigation\\"', '"next/navigation"'),
        ('\\"@/i18n-config\\"', '"@/i18n-config"'),
        ('\\"@/lib/seo\\"', '"@/lib/seo"'),
        ('\\"@/components/SpecialtyPageLayout\\"', '"@/components/SpecialtyPageLayout"'),
        ('\\"@/lib/specialty-page\\"', '"@/lib/specialty-page"'),
        ('\\"lucide-react\\"', '"lucide-react"'),
        ('\\"next/link\\"', '"next/link"'),
        ('\\"application/ld+json\\"', '"application/ld+json"'),
        ('\\"@context\\"', '"@context"'),
        ('\\"@graph\\"', '"@graph"'),
        ('\\"@type\\"', '"@type"'),
        ('\\"name\\"', '"name"'),
        ('\\"description\\"', '"description"'),
        ('\\"url\\"', '"url"'),
        ('\\"telePhone\\"', '"telePhone"'),
        ('\\"address\\"', '"address"'),
        ('\\"addressLocality\\"', '"addressLocality"'),
        ('\\"addressRegion\\"', '"addressRegion"'),
        ('\\"addressCountry\\"', '"addressCountry"'),
        ('\\"areaServed\\"', '"areaServed"'),
        ('\\"itemListElement\\"', '"itemListElement"'),
        ('\\"position\\"', '"position"'),
        ('\\"item\\"', '"item"'),
        ('\\"mainEntity\\"', '"mainEntity"'),
        ('\\"acceptedAnswer\\"', '"acceptedAnswer"'),
        ('\\"text\\"', '"text"'),
        ('\\"de\\"', '"de"'),
        ('\\" }', '" }'),
        ('\\",', '",'),
        ('\\" }', '" }'), # Repeat just in case
    ]
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    
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
