import os

def final_structural_fix():
    p = r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json'
    if not os.path.exists(p):
        print("File not found.")
        return

    with open(p, 'rb') as f:
        b = f.read()

    start_key = b'intro_p2": "'
    end_key = b'entruempelung_regensburg": {'
    
    start_idx = b.find(start_key)
    end_idx = b.find(end_key, start_idx)

    if start_idx == -1 or end_idx == -1:
        print(f"Could not find markers. Start: {start_idx}, End: {end_idx}")
        return

    prefix = b[:start_idx]
    suffix = b[end_idx:]

    # "Мы берем на себя полную сортировку, экологичную утилизацию крупногабаритных отходов и оставляем помещение безенрейн (besenrein)."
    fixed_val = (
        b'\xd0\x9c\xd1\x8b \xd0\xb1\xd0\xb5\xd1\x80\xd0\xb5\xd0\xbc \xd0\xbd\xd0\xb0 \xd1\x81\xd0\xb5\xd0\xb1\xd1\x8f '
        b'\xd0\xbf\xd0\xbe\xd0\xbb\xd0\xbd\xd1\x83\xd1\x8e \xd1\x81\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd1\x83, '
        b'\xd1\x8d\xd0\xba\xd0\xbe\xd0\xbb\xd0\xbe\xd0\xb3\xd0\xb8\xd1\x87\xd0\xbd\xd1\x83\xd1\x8e \xd1\x83\xd1\x82\xd0\xb8\xd0\xbb\xd0\xb8\xd0\xb7\xd0\xb0\xd1\x86\xd0\xb8\xd1\x8e '
        b'\xd0\xba\xd1\x80\xd1\x83\xd0\xbf\xd0\xbd\xd0\xbe\xd0\xb3\xd0\xb0\xd0\xb1\xd0\xb0\xd1\x80\xd0\xb8\xd1\x82\xd0\xbd\xd1\x8b\xd1\x85 '
        b'\xd0\xbe\xd1\x82\xd1\x85\xd0\xbe\xd0\xb4\xd0\xbe\xd0\xb2 \xd0\xb8 \xd0\xbe\xd1\x81\xd1\x82\xd0\xb0\xd0\xb2\xd0\xbb\xd1\x8f\xd0\xb5\xd0\xbc '
        b'\xd0\xbf\xd0\xbe\xd0\xbc\xd0\xb5\xd1\x89\xd0\xb5\xd0\xbd\xd0\xb8\xd0\xb5 \xd0\xb1\xd0\xb5\xd0\xb7\xd0\xb5\xd0\xbd\xd1\x80\xd0\xb5\xd0\xb9\xd0\xbd (besenrein)."'
    )
    
    # CRITICAL: Missing first quote in the end_key was the culprit in the previous capture snippet
    fixed_suffix = b'"' + suffix
    
    closing = b',\n      '
    
    new_b = prefix + start_key + fixed_val + closing + fixed_suffix
    
    with open(p, 'wb') as f:
        f.write(new_b)
    
    print("Structural fix (with missing quote) applied.")

if __name__ == "__main__":
    final_structural_fix()
