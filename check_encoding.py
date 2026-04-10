import json, sys
f = open(r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json', 'r', encoding='utf-8')
data = json.load(f)
f.close()
home = data['nav']['home']
# Write raw UTF-8 bytes, then hex
sys.stdout.buffer.write(b"nav.home bytes: ")
sys.stdout.buffer.write(repr(home.encode('utf-8')).encode('ascii'))
sys.stdout.buffer.write(b"\n")
sys.stdout.buffer.write(b"nav.home codepoints: ")
for c in home:
    sys.stdout.buffer.write(f"U+{ord(c):04X} ".encode('ascii'))
sys.stdout.buffer.write(b"\n")
# Check if it's proper Cyrillic
sys.stdout.buffer.write(b"All cyrillic: ")
sys.stdout.buffer.write(str(all(0x0400 <= ord(c) <= 0x04FF for c in home)).encode('ascii'))
sys.stdout.buffer.write(b"\n")
# Check footer
priv = data['footer']['privacy']
sys.stdout.buffer.write(b"footer.privacy bytes: ")
sys.stdout.buffer.write(repr(priv.encode('utf-8')).encode('ascii'))
sys.stdout.buffer.write(b"\n")
