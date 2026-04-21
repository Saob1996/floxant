import os
import re

def cleanup_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update imports
    content = content.replace('../../../../get-dictionary', '@/get-dictionary')
    content = content.replace('../../../get-dictionary', '@/get-dictionary')
    content = content.replace('../../get-dictionary', '@/get-dictionary')
    content = content.replace('../../../../i18n-config', '@/i18n-config')
    content = content.replace('../../../i18n-config', '@/i18n-config')
    content = content.replace('../../i18n-config', '@/i18n-config')

    # 2. Cleanup generateMetadata signature
    # Match: export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata>
    content = re.sub(
        r'export async function generateMetadata\(\{ params \}: \{ params: Promise<\{ lang: string \}> \}\): Promise<Metadata>',
        'export async function generateMetadata(): Promise<Metadata>',
        content
    )
    
    # 3. Cleanup Page component signature
    # Match: export default async function PageName({ params }: { params: Promise<{ lang: string }> })
    content = re.sub(
        r'export default async function (\w+)\(\{ params \}: \{ params: Promise<\{ lang: string \}> \}\)',
        r'export default async function \1()',
        content
    )

    # 4. Cleanup internal params destructuring
    # Match: var { lang: pageLocale } = await params; OR const { lang } = await params;
    content = re.sub(r'(var|const|let) \{ (lang|lang: pageLocale) \} = await params;', r'const pageLocale = "de";', content)
    content = re.sub(r'(var|const|let) \{ lang \} = await params;', r'const lang = "de";', content)

    # 5. Fix dictionary calls
    content = re.sub(r'getDictionary\((pageLocale|lang) as Locale\)', 'getDictionary("de")', content)
    content = re.sub(r'getDictionary\((pageLocale|lang)\)', 'getDictionary("de")', content)

    # 6. Fix Breadcrumbs
    content = content.replace('pageLocale={pageLocale}', 'lang="de"')
    content = content.replace('lang={pageLocale}', 'lang="de"')
    content = content.replace('lang={lang}', 'lang="de"')

    # 7. Fix Links
    # String interpolation links: `/${pageLocale}/...` -> `/...`
    content = content.replace('`/${pageLocale}/', '`/')
    content = content.replace('`/${lang}/', '`/')
    
    # Concatenation links: "/" + pageLocale + "/..." -> "/..."
    content = re.sub(r'["\']/["\'] \+ (pageLocale|lang) \+ ["\']/', '"/', content)
    
    # Special cases for canonicals/absolute urls
    content = content.replace('${company.url}/${locale}', '${company.url}')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    app_path = 'app'
    if not os.path.exists(app_path):
        print(f"Error: app directory not found at {app_path}")
        exit(1)
            
    print(f"Starting global cleanup in: {app_path}")
    for root, dirs, files in os.walk(app_path):
        # Skip legacy [lang] directory
        if '[lang]' in root:
            continue
            
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                try:
                    cleanup_file(filepath)
                    # We don't print every file to keep logs clean for 200+ files
                    # but maybe print a progress every 10 files
                    pass
                except Exception as e:
                    print(f"  Error cleaning {filepath}: {e}")
    print("Global cleanup completed.")
