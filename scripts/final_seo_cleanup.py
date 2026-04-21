import os
import re

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # 1. Handle different lang types in params
    content = re.sub(r'params:\s*Promise<\{\s*lang:\s*(Locale|string)\s*\}>', 'params: Promise<{}>', content)
    content = re.sub(r'params:\s*Promise<\{\s*lang:\s*(Locale|string),\s*', 'params: Promise<{ ', content)
    content = re.sub(r',\s*lang:\s*(Locale|string)\s*\}', ' }', content)
    
    # 2. PageProps interface cleanup
    content = re.sub(r'interface\s+PageProps\s*\{\s*params:\s*Promise<\{\s*lang:\s*(Locale|string)\s*\}\s*>;\s*\}', 'interface PageProps {}', content, flags=re.MULTILINE)

    # 3. Remove extraction AND replace usage of 'lang' or 'pageLocale'
    # This is tricky, we replace known usages with "de"
    content = re.sub(r'const\s+\{\s*lang\s*\}\s*=\s*await\s+params;', '', content)
    content = re.sub(r'const\s+\{\s*lang,\s*(.*?)\s*\}\s*=\s*await\s+params;', r'const { \1 } = await params;', content)
    content = re.sub(r'const\s+\{\s*(.*?),\s*lang\s*\}\s*=\s*await\s+params;', r'const { \1 } = await params;', content)

    # 4. Remove isValidLocale calls
    content = re.sub(r'if\s*\(!isValidLocale\(lang\)\)\s*(notFound\(\);|return\s*\{\};|return\s*null;)', '', content)
    
    # 5. Fix variable usage: replace 'lang' with '"de"' in specific contexts
    content = content.replace('lang: lang', 'lang: "de"')
    content = content.replace('pageLocale: lang', 'lang: "de"')
    content = content.replace('locale: lang', 'locale: "de"')
    content = content.replace('lang={lang}', 'lang="de"')
    content = content.replace('pageLocale={lang}', 'lang="de"')
    content = content.replace('lang={locale}', 'lang="de"')
    content = content.replace('resolveField(content.hero_h1, fallback.hero_h1, city, lang)', 'resolveField(content.hero_h1, fallback.hero_h1, city, "de")')
    # More generic replacement for lang as argument
    content = re.sub(r'(resolveField\(.*?,.*?,.*?,)\s*lang\)', r'\1 "de")', content)
    content = re.sub(r'(resolveNestedField\(.*?,.*?,.*?,)\s*city\)', r'\1 city)', content) # Keep city
    
    # 6. Remove redundant locale constants
    content = re.sub(r'const\s+locale(:\s*Locale)?\s*=\s*(lang|locale|"de");', '', content)
    content = re.sub(r'const\s+pageLocale\s*=\s*(lang|locale|"de");', '', content)

    # 7. Final URL fixes
    content = content.replace('`/${locale}/', '`/')
    content = content.replace('`/${lang}/', '`/')
    content = content.replace('`/${locale}', '`')
    content = content.replace('`/${lang}', '`')
    content = content.replace('`/${i18n.defaultLocale}/', '`/')
    content = content.replace('href={`/de/', 'href={`/')
    content = content.replace('href="/de/', 'href="/')
    
    # Static Breadcrumb Fix
    content = content.replace('href: `/de` }', 'href: `/` }')

    # Remove unused imports
    content = re.sub(r'import\s+\{\s*.*?,?\s*isValidLocale,?\s*.*?\s*\}\s*from\s*"@/i18n-config";', '', content)
    content = re.sub(r'import\s+\{\s*.*?,?\s*Locale,?\s*.*?\s*\}\s*from\s*"@/i18n-config";', '', content)
    
    # Standardize getDictionary calls
    content = content.replace('getDictionary(locale)', 'getDictionary("de")')
    content = content.replace('getDictionary(lang)', 'getDictionary("de")')

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
                    print(f"Cleaned: {full_path}")
                    count += 1
    print(f"Total files cleaned: {count}")

if __name__ == "__main__":
    main()
