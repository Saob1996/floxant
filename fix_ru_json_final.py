import os

def final_reconstruction():
    p = r'c:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE\dictionaries\ru.json'
    if not os.path.exists(p):
        print("File not found.")
        return

    with open(p, 'rb') as f:
        b = f.read()

    # --- REPAIR 1: line 417-418 ---
    # Corruption: truncated "intro_p2" and merging into "entruempelung_regensburg"
    start_k1 = b'intro_p2": "'
    end_k1 = b'entruempelung_regensburg": {'
    idx1_s = b.find(start_k1)
    idx1_e = b.find(end_k1, idx1_s)

    if idx1_s != -1 and idx1_e != -1:
        prefix1 = b[:idx1_s + len(start_k1)]
        val1 = (
            b'\xd0\x9c\xd1\x8b \xd0\xb1\xd0\xb5\xd1\x80\xd0\xb5\xd0\xbc \xd0\xbd\xd0\xb0 \xd1\x81\xd0\xb5\xd0\xb1\xd1\x8f '
            b'\xd0\xbf\xd0\xbe\xd0\xbb\xd0\xbd\xd1\x83\xd1\x8e \xd1\x81\xd0\xbe\xd1\x80\xd1\x82\xd0\xb8\xd1\x80\xd0\xbe\xd0\xb2\xd0\xba\xd1\x83, '
            b'\xd1\x8d\xd0\xba\xd0\xbe\xd0\xbb\xd0\xbe\xd0\xb3\xd0\xb8\xd1\x87\xd0\xbd\xd1\x83\xd1\x8e \xd1\x83\xd1\x82\xd0\xb8\xd0\xbb\xd0\xb8\xd0\xb7\xd0\xb0\xd1\x86\xd0\xb8\xd1\x8e '
            b'\xd0\xba\xd1\x80\xd1\x83\xd0\xbf\xd0\xbd\xd0\xbe\xd0\xb3\xd0\xb0\xd0\xb1\xd0\xb0\xd1\x80\xd0\xb8\xd1\x82\xd0\xbd\xd1\x8b\xd1\x85 '
            b'\xd0\xbe\xd1\x82\xd1\x85\xd0\xbe\xd0\xb4\xd0\xbe\xd0\xb2 \xd0\xb8 \xd0\xbe\xd1\x81\xd1\x82\xd0\xb0\xd0\xb2\xd0\xbb\xd1\x8f\xd0\xb5\xd0\xbc '
            b'\xd0\xbf\xd0\xbe\xd0\xbc\xd0\xb5\xd1\x89\xd0\xb5\xd0\xbd\xd0\xb8\xd0\xb5 \xd0\xb1\xd0\xb5\xd0\xb7\xd0\xb5\xd0\xbd\xd1\x80\xd0\xb5\xd0\xb9\xd0\xbd (besenrein)."'
        )
        suffix1 = b[idx1_e:]
        b = prefix1 + val1 + b',\n      "' + suffix1
        print("Set repair 1 staged.")

    # --- REPAIR 2: line 261-263 ---
    # Corruption: truncated key name after "faqs": []
    start_k2 = b'faqs": []\r\n    },\r\n'
    end_k2 = b'guarantees": ['
    idx2_s = b.find(start_k2)
    idx2_e = b.find(end_k2, idx2_s)

    if idx2_s != -1 and idx2_e != -1:
        prefix2 = b[:idx2_s + len(start_k2)]
        # Re-quote 'guarantees' correctly
        inter = (
            b'    "service_guarantees": {\n      "title": "'
            b'\xd0\x9d\xd0\xb0\xd1\x88\xd0\xb8 \xd0\xbe\xd0\xb1\xd1\x8f\xd0\xb7\xd0\xb0\xd1\x82\xd0\xb5\xd0\xbb\xd1\x8c\xd1\x81\xd1\x82\xd0\xb2\xd0\xb0 '
            b'\xd0\xb8 \xd0\xb3\xd0\xb0\xd1\x80\xd0\xb0\xd0\xbd\xd1\x82\xd0\xb8\xd0\xb8 \xd0\xba\xd0\xb0\xd1\x87\xd0\xb5\xd1\x81\xd1\x82\xd0\xb2\xd0\xb0",\n      '
            b'"' # Fixed: Explicitly adding the missing quote before 'guarantees'
        )
        suffix2 = b[idx2_e:]
        b = prefix2 + inter + suffix2
        print("Set repair 2 (fixed quote) staged.")

    with open(p, 'wb') as f:
        f.write(b)
    
    print("Full binary reconstruction completed.")

if __name__ == "__main__":
    final_reconstruction()
