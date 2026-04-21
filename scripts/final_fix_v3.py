import os
import re

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # 1. Fix broken home links from previous step
    content = content.replace('href: `` }', 'href: "/" }')
    content = content.replace('href: ``}', 'href: "/"}')
    content = content.replace('href=""', 'href="/"')
    
    # 2. Fix undefined variable assignments
    content = re.sub(r'const\s+(locale|pageLocale)\s*=\s*(lang|locale)\s*as\s*Locale;', 'const locale = "de";', content)
    content = re.sub(r'const\s+(locale|pageLocale)\s*=\s*(lang|locale);', 'const locale = "de";', content)

    # 3. Handle leftover usages of 'lang' or 'pageLocale' in props
    content = content.replace('lang={lang}', 'lang="de"')
    content = content.replace('pageLocale={lang}', 'lang="de"')
    content = content.replace('pageLocale={locale}', 'lang="de"')
    content = content.replace('locale={locale}', 'locale="de"')
    content = content.replace('lang={locale}', 'lang="de"')
    content = content.replace('dic={dict}', 'dic={dict}') # Keep dict
    
    # 4. Remove empty interface corpses
    content = content.replace('interface PageProps {}', '')
    content = content.replace('interface PageProps { }', '')
    
    # 5. Fix common function calls that use the old variables
    content = content.replace('getHomeLabel(locale)', 'getHomeLabel("de")')
    content = content.replace('getHomeLabel(lang)', 'getHomeLabel("de")')
    
    # 6. Metadata fixes for specific leftovers
    content = content.replace('lang: locale,', 'lang: "de",')
    content = content.replace('lang: lang,', 'lang: "de",')

    # Remove more unused imports
    content = re.sub(r'import\s+\{\s*isValidLocale\s*\}\s*from\s*"@/i18n-config";', '', content)
    content = re.sub(r'import\s+\{\s*type\s*Locale\s*\}\s*from\s*"@/i18n-config";', '', content)
    
    # Remove empty lines left by regex
    content = re.sub(r'^\s*$\n', '', content, flags=re.MULTILINE)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    root = "app"
    count = 0
    for dirpath, dirnames, filenames in os.walk(root):
        for f in filenames:
            if f.endswith(".tsx") or f.endswith(".ts"):
                full_path = os.path.join(dirpath, f)
                if clean_file(full_path):
                    print(f"Fixed: {full_path}")
                    count += 1
    print(f"Total files fixed: {count}")

if __name__ == "__main__":
    main()
