import os
import re

def fix_file(path):
    print(f"Checking {path}...")
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # We want to identify and replace the entire import block if it's messed up
    # or just fix the specific faulty lines
    changed = False
    new_lines = []
    
    # Identify if this is a city page that needs our standard imports
    content = "".join(lines)
    if 'getSpecialtyPageData' not in content:
        return False

    # Standard clean import block
    standard_imports = [
        'import { Metadata } from "next";\n',
        'import { notFound } from "next/navigation";\n',
        'import { isValidLocale, type Locale } from "@/i18n-config";\n',
        'import { generatePageSEO } from "@/lib/seo";\n',
        'import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";\n',
        'import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";\n'
    ]
    
    # Remove existing imports for these things to avoid duplicates
    patterns_to_remove = [
        r'import \{.*Metadata.*\} from "next";\n',
        r'import \{.*notFound.*\} from "next/navigation";\n',
        r'import \{.*isValidLocale.*Locale.*\} from "@/i18n-config";\n',
        r'import \{.*generatePageSEO.*\} from "@/lib/seo";\n',
        r'import \{.*SpecialtyPageLayout.*\} from "@/components/SpecialtyPageLayout";\n',
        r'import \{.*getSpecialtyPageData.*resolveField.*resolveNestedField.*\} from .*;\n',
        r'import \{.*getSpecialtyPageData as getPageData.*\} from .*;\n',
        r'import \{.*getSpecialtyPageData.*\} from .*;\n'
    ]
    
    # We'll just surgically replace the first few lines if they match our targets
    idx = 0
    final_lines = []
    found_lucide = False
    found_link = False
    
    # Skip old imports and keep others
    for line in lines:
        is_bad = False
        for p in patterns_to_remove:
            if re.search(p, line):
                is_bad = True
                break
        if not is_bad:
            if 'lucide-react' in line: found_lucide = True
            if 'next/link' in line: found_link = True
            final_lines.append(line)
        else:
            changed = True
            
    # Prepend standard clean imports
    standard_block = standard_imports[:]
    if not found_lucide:
        # Default lucide for city pages if missing
        standard_block.append('import { Truck, Shield, Clock, Star, Zap } from "lucide-react";\n')
    if not found_link:
        standard_block.append('import Link from "next/link";\n')
    
    final_content = "".join(standard_block) + "".join(final_lines).lstrip()
    
    # Final cleanup of common artifacts
    final_content = final_content.replace('getPageData', 'getSpecialtyPageData')
    
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
                    print(f"FIXED IMPORTS: {full_path}")
                    count += 1
    print(f"DONE. Total files fixed: {count}")
