const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('c:/Users/Admin/.gemini/antigravity/scratch/FLOXANTENDE/app/[lang]', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let originalContent = fs.readFileSync(filePath, 'utf8');
        let content = originalContent;
        
        // 1. Remove Accordion Imports
        content = content.replace(/import\s*\{\s*Accordion,\s*AccordionContent,\s*AccordionItem,\s*AccordionTrigger\s*\}\s*from\s*["']@\/components\/ui\/accordion["'];?\r?\n?/g, '');
        content = content.replace(/import\s*\{\s*Accordion\s*\}\s*from\s*["']@\/components\/ui\/accordion["'];?\r?\n?/g, '');
        
        // 2. Replace Accordion Tags with details/summary
        content = content.replace(/<Accordion[^>]*>/g, '<div className="space-y-4">');
        content = content.replace(/<\/Accordion>/g, '</div>');
        
        content = content.replace(/<AccordionItem[^>]*>/g, '<details className="group border rounded-lg p-4 bg-white shadow-sm open:ring-2 open:ring-primary/20">');
        content = content.replace(/<\/AccordionItem>/g, '</details>');
        
        content = content.replace(/<AccordionTrigger[^>]*>/g, '<summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>');
        content = content.replace(/<\/AccordionTrigger>/g, '</span><span className="transition group-open:rotate-180">↓</span></summary>');
        
        content = content.replace(/<AccordionContent[^>]*>/g, '<div className="pt-4 text-slate-600 leading-relaxed max-w-3xl">');
        content = content.replace(/<\/AccordionContent>/g, '</div>');

        // 3. Fix Breadcrumbs className="mb-8"
        content = content.replace(/<Breadcrumbs([^>]*?)className=["'][^"']*["'](.*?)>/g, '<div className="mb-8"><Breadcrumbs$1$2></div>');
        
        // 4. Fix remaining Breadcrumb imports/usage in the 3 other blog pages
        if (content.includes('import { Breadcrumb } from "@/components/Breadcrumb"')) {
            content = content.replace(/import { Breadcrumb } from "@\/components\/Breadcrumb";?\r?\n?/g, 'import { Header } from "@/components/Header";\nimport { Breadcrumbs } from "@/components/Breadcrumbs";\n');
            content = content.replace(/import { JsonLd } from "@\/components\/JsonLd";?\r?\n?/g, '');
            
            content = content.replace(/<main className="flex-1/g, '<main className="min-h-screen');
            
            // Inject Header
            if (!content.includes('<Header ')) {
                content = content.replace(/(<main[^>]*>)/, '$1\n            <Header lang={lang} dic={(dict as any).nav} />');
            }
            
            // Fix JsonLd instances
            content = content.replace(/<JsonLd data=\{([^}]+)\} \/>/g, '<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify($1) }} />');
            
            // Fix Breadcrumb usage
            content = content.replace(/<Breadcrumb items=\{breadcrumbs\}/g, '<Breadcrumbs lang={lang} items={breadcrumbs}');
            
            // Fix breadcrumb exact format { name: ..., href: ... } -> { label: ... }
            content = content.replace(/name:\s*dict\.nav\.home/g, 'label: "Home"');
            content = content.replace(/name:\s*['"]([^'"]+)['"]/g, 'label: "$1"');
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed:', filePath);
        }
    }
});
