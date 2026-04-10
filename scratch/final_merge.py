import json
import os

def merge_dictionaries():
    de_path = r'dictionaries/de.json'
    ru_path = r'dictionaries/ru.json'

    new_keys_de = {
        "nav": {
            "service_umzug": "Umzug",
            "service_reinigung": "Reinigung",
            "service_entruempelung": "Entrümpelung"
        },
        "common": {
            "next": "Weiter",
            "back_to_home": "Zur Startansicht"
        },
        "calculator": {
            "start_now": "Jetzt starten",
            "service_selection_note": "Wählen Sie zuerst die passende Leistung. Danach erfassen wir die wichtigsten Eckdaten für eine schnelle erste Einschätzung.",
            "requirements_title": "Angaben",
            "requirements_note": "Nur die wichtigsten Angaben. Die genaue Kalkulation folgt im nächsten Schritt.",
            "from_place_placeholder": "Von Ort / PLZ",
            "to_place_placeholder": "Nach Ort / PLZ",
            "living_area": "Wohnfläche (m²)",
            "rooms": "Zimmeranzahl",
            "estimated_waste_volume": "Schätzvolumen (m³)",
            "back_to_overview": "Zurück",
            "prognosis_label": "Preisspanne",
            "uncertainty_note": "Dies ist eine erste grobe Schätzung. Faktoren wie Etage, Laufwege, Zusatzleistungen oder Sperrmüllart können den finalen Preis beeinflussen.",
            "adjust_details": "Angaben anpassen",
            "submit_details": "Kontaktdaten übermitteln",
            "submit_details_subtitle": "Hinterlassen Sie Ihre Kontaktdaten. Wir prüfen die Angaben und melden uns mit einer passenden Rückmeldung.",
            "your_price_range": "Ihre Preisspanne",
            "contact_person": "Ansprechpartner",
            "name_placeholder": "Ihr Name",
            "phone_number": "Telefonnummer",
            "email_address": "E-Mail-Adresse",
            "preferred_contact_time": "Bevorzugte Rückrufzeit",
            "jederzeit": "jederzeit",
            "vormittags": "vormittags",
            "nachmittags": "nachmittags",
            "abends": "abends",
            "submit_photos": "Fotos nachreichen",
            "submit_photos_subtitle": "Auf Wunsch senden wir Ihnen einen Upload-Link für Bilder oder Videos.",
            "important_price_note": "Wichtiger Hinweis:",
            "price_disclaimer": "Die angezeigte Kalkulation ist unverbindlich und dient als erste Orientierung auf Basis Ihrer Angaben.",
            "submit_request": "Anfrage senden",
            "submitting": "Wird gesendet",
            "ssl_encryption_note": "SSL-verschlüsselte Übertragung",
            "success_title": "Anfrage erfolgreich gesendet",
            "success_description": "Wir haben Ihre Anfrage erhalten und melden uns zeitnah mit einer passenden Rückmeldung bei Ihnen.",
            "upload_link_note": "Wir senden Ihnen den Link für den Foto-Upload separat per E-Mail und WhatsApp."
        }
    }

    new_keys_ru = {
        "nav": {
            "service_umzug": "Переезд",
            "service_reinigung": "Уборка",
            "service_entruempelung": "Расчистка"
        },
        "common": {
            "next": "Далее",
            "back_to_home": "На главную"
        },
        "calculator": {
            "start_now": "Начать сейчас",
            "service_selection_note": "Сначала выберите подходящую услугу. Затем мы соберем основные данные для быстрой предварительной оценки.",
            "requirements_title": "Ваши данные",
            "requirements_note": "Только самые важные данные. Точный расчет будет на следующем шаге.",
            "from_place_placeholder": "Откуда / Почтовый индекс",
            "to_place_placeholder": "Куда / Почтовый индекс",
            "living_area": "Площадь квартиры (м²)",
            "rooms": "Количество комнат",
            "estimated_waste_volume": "Примерный объем (м³)",
            "back_to_overview": "Вернуться к обзору",
            "prognosis_label": "Ценовой диапазон",
            "uncertainty_note": "Это первоначальная грубая оценка. Такие факторы, как этаж, расстояние для переноски или тип мусора, могут повлиять на итоговую цену.",
            "adjust_details": "Изменить данные",
            "submit_details": "Отправить контактные данные",
            "submit_details_subtitle": "Оставьте свои контактные данные. Мы проверим информацию и свяжемся с вами.",
            "your_price_range": "Ваш ценовой диапазон",
            "contact_person": "Контактное лицо",
            "name_placeholder": "Ваше имя",
            "phone_number": "Номер телефона",
            "email_address": "Электронная почта",
            "preferred_contact_time": "Предпочтительное время обратного звонка",
            "jederzeit": "в любое время",
            "vormittags": "до обеда",
            "nachmittags": "после обеда",
            "abends": "вечер",
            "submit_photos": "Отправить фото позже",
            "submit_photos_subtitle": "При желании мы отправим вам ссылку для загрузки фото или видео.",
            "important_price_note": "Важное примечание:",
            "price_disclaimer": "Показанный расчет не является обязательным и служит первой ориентацией на основе ваших данных.",
            "submit_request": "Отправить запрос",
            "submitting": "Отправка...",
            "ssl_encryption_note": "SSL-зашифрованная передача",
            "success_title": "Запрос успешно отправлен",
            "success_description": "Мы получили ваш запрос и свяжемся с вами в ближайшее время.",
            "upload_link_note": "Мы отправим вам ссылку для загрузки фото отдельно по электронной почте и WhatsApp."
        }
    }

    def update_json(path, new_data):
        with open(path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        for sec, keys in new_data.items():
            if sec not in data:
                data[sec] = {}
            for k, v in keys.items():
                data[sec][k] = v
        
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated {path}")

    update_json(de_path, new_keys_de)
    update_json(ru_path, new_keys_ru)

if __name__ == "__main__":
    merge_dictionaries()
