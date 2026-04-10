import os

def fix_encoding():
    p = r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json'
    if not os.path.exists(p):
        print(f"File not found: {p}")
        return

    # Read as binary to handle any BOM and then decode
    with open(p, 'rb') as f:
        b = f.read()
    
    # Strip potential BOM
    if b.startswith(b'\xef\xbb\xbf'):
        b = b[3:]
    
    try:
        s = b.decode('utf-8')
    except UnicodeDecodeError:
        # If it fails to decode as utf-8, try latin-1 as a fallback to at least get a string
        s = b.decode('iso-8859-1')

    # Multi-stage decoding if double/triple encoded
    # 'Ã' (C3) is a hallmark of Latin-1 misinterpretation of UTF-8
    count = 0
    while 'Ã' in s and count < 5:
        print(f"Detected potential double encoding (stage {count})...")
        try:
            # Re-interpret the string as latin-1 bytes, then decode as utf-8
            s = s.encode('iso-8859-1').decode('utf-8')
            count += 1
        except (UnicodeEncodeError, UnicodeDecodeError):
            print("Encoding conversion failed at this stage.")
            break

    # Final write as clean UTF-8 without BOM
    with open(p, 'w', encoding='utf-8', newline='\n') as f:
        f.write(s)
    
    print("Repair attempt finished.")

if __name__ == "__main__":
    fix_encoding()
