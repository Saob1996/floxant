import json
import os

def update_spotlight_keys():
    paths = {
        'de': r'dictionaries/de.json',
        'en': r'dictionaries/en.json',
        'ru': r'dictionaries/ru.json'
    }

    data_new = {
        'de': {
            "premium_experience": "Die FLOXANT Experience",
            "brand_promise_title": "Eigene Teams & Gebrandete LKWs",
            "brand_promise_desc": "Wir setzen auf Transparenz und Qualität. Mit unseren eigenen geschulten Teams und modernem Fuhrpark garantieren wir höchste Sicherheit für Ihr Hab und Gut."
        },
        'en': {
            "premium_experience": "The FLOXANT Experience",
            "brand_promise_title": "Own Teams & Branded Trucks",
            "brand_promise_desc": "We focus on transparency and quality. With our own trained teams and modern fleet, we guarantee the highest security for your belongings."
        },
        'ru': {
            "premium_experience": "Опыт FLOXANT",
            "brand_promise_title": "Собственные команды и брендированные грузовики",
            "brand_promise_desc": "Мы делаем ставку на прозрачность и качество. Благодаря собственным обученным командам и современному автопарку мы гарантируем максимальную безопасность вашей собственности."
        }
    }

    for lang, path in paths.items():
        with open(path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        for k, v in data_new[lang].items():
            data['home'][k] = v
        
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated {path}")

if __name__ == "__main__":
    update_spotlight_keys()
