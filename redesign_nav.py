import os
import re

filepath = r'components/FloxNavigation.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make brand mark theme-aware
content = content.replace('border-slate-200/80 bg-white shadow-sm shadow-blue-950/5', 'border-foreground/10 bg-background shadow-sm shadow-foreground/5')
content = content.replace('text-slate-950', 'text-foreground')
content = content.replace('text-slate-500', 'text-foreground/50')
content = content.replace('text-slate-600', 'text-foreground/70')
content = content.replace('text-slate-700', 'text-foreground/80')
content = content.replace('text-slate-900', 'text-foreground')
content = content.replace('text-slate-400', 'text-foreground/40')

# Nav container
content = content.replace('border-slate-200/80 bg-white/88 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]', 'border-foreground/10 bg-background/60 backdrop-blur-md p-1.5 shadow-sm shadow-foreground/5')

# Dropdown Header & Service Boxes
content = content.replace('border-slate-200/70 bg-white/86', 'border-foreground/10 bg-background/80 backdrop-blur-xl')
content = content.replace('border-slate-200/70 bg-white/82', 'border-foreground/10 bg-background/60')
content = content.replace('shadow-blue-950/5', 'shadow-foreground/5')
content = content.replace('bg-white/88', 'bg-background/80 backdrop-blur-xl')
content = content.replace('bg-white/82', 'bg-background/60')

content = content.replace('hover:bg-slate-50', 'hover:bg-foreground/5')
content = content.replace('border-amber-200 bg-amber-50 px-4', 'border-amber-500/20 bg-amber-500/10 px-4')
content = content.replace('text-amber-900', 'text-amber-600 dark:text-amber-400')
content = content.replace('hover:bg-amber-100', 'hover:bg-amber-500/15')
content = content.replace('hover:border-amber-300', 'hover:border-amber-500/30')

content = content.replace('border-blue-200 bg-blue-50 px-4', 'border-blue-500/20 bg-blue-500/10 px-4')
content = content.replace('border-blue-200 hover:bg-blue-50 hover:text-blue-700', 'border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400')
content = content.replace('hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700', 'hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400')
content = content.replace('text-blue-700/70', 'text-blue-600/80 dark:text-blue-400/80')
content = content.replace('text-blue-800', 'text-blue-700 dark:text-blue-300')
content = content.replace('text-blue-900', 'text-foreground')

# Quick Contact
content = content.replace('border-slate-200 bg-white/88 p-1', 'border-foreground/10 bg-background/60 backdrop-blur-md p-1 shadow-sm shadow-foreground/5')
content = content.replace('bg-white/[0.06]', 'bg-foreground/10')
content = content.replace('border-blue-200 bg-white', 'border-foreground/10 bg-background')
content = content.replace('border-slate-200 bg-white', 'border-foreground/10 bg-background')
content = content.replace('hover:bg-blue-50', 'hover:bg-blue-500/10')
content = content.replace('text-blue-700', 'text-foreground')

# Book directly btn
content = content.replace('from-blue-500 to-blue-600', 'from-blue-600 to-blue-700')
content = content.replace('text-white shadow-lg shadow-blue-600/25', 'text-white shadow-lg shadow-blue-600/20')

# Dropdown / Mobile Menu Container
content = content.replace('border border-white/[0.065] bg-white/[0.026]', 'border border-foreground/10 bg-background/40')
content = content.replace('bg-white/95', 'bg-background/90 backdrop-blur-xl')
content = content.replace('bg-white', 'bg-background')
content = content.replace('border-slate-200', 'border-foreground/10')


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated FloxNavigation.tsx")
