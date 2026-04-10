import os
import re

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'getSpecialtyPageData' not in content:
        return False
    
    # Identify if it has the broken i18n-config import for specialty data
    # Patterns to replace or remove
    broken_pattern = r'import \{.*getSpecialtyPageData.*\} from "@/i18n-config";'
    correct_lib_path = '"@/lib/specialty-page"'
    
    # We'll do a simple string replacement for common artifacts
    new_content = content.replace('from "@/i18n-config";', 'from "@/lib/specialty-page";')
    # But wait, isValidLocale IS in i18n-config. resolveField is in lib/specialty-page.
    
    # Let's be more surgical:
    # 1. Ensure i18n-config only has valid exports
    new_content = re.sub(
        r'import \{[^}]*getSpecialtyPageData[^}]*\} from "@/i18n-config";',
        'import { isValidLocale, type Locale } from "@/i18n-config";',
        new_content
    )
    new_content = re.sub(
        r'import \{[^}]*resolveField[^}]*\} from "@/i18n-config";',
        'import { isValidLocale, type Locale } from "@/i18n-config";',
        new_content
    )
    
    # 2. Ensure specialty-page has the specialty data
    if 'from "@/lib/specialty-page"' not in new_content:
        # Add it after i18n-config
        new_content = new_content.replace(
            'from "@/i18n-config";',
            'from "@/i18n-config";\nimport { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";'
        )
    else:
        # Standardize the existing one
        new_content = re.sub(
            r'import \{[^}]*getSpecialtyPageData[^}]*\} from "@/lib/specialty-page";',
            'import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";',
            new_content
        )
        new_content = re.sub(
            r'import \{[^}]*getSpecialtyPageData as getPageData[^}]*\} from "@/lib/specialty-page";',
            'import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";',
            new_content
        )

    # 3. Final cleanup of common artifacts
    new_content = new_content.replace('getPageData(', 'getSpecialtyPageData(')
    
    # 4. Remove any duplicate import lines we might have created
    lines = new_content.splitlines()
    seen = set()
    final_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('import ') and stripped in seen:
            continue
        if stripped.startswith('import '):
            seen.add(stripped)
        final_lines.append(line)
        
    final_content = "\n".join(final_lines)

    if final_content != content:
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(final_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    for root, dirs, files in os.walk('app'):
        for f in files:
            if f == 'page.tsx':
                full_path = os.path.join(root, f)
                if fix_file(full_path):
                    print(f"CLEANED IMPORTS: {full_path}")
                    count += 1
    print(f"DONE. Total files cleaned: {count}")
