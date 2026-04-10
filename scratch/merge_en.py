import json
import os

def merge_en_dictionary():
    en_path = r'dictionaries/en.json'

    new_keys_en = {
        "nav": {
            "service_umzug": "Moving",
            "service_reinigung": "Cleaning",
            "service_entruempelung": "Clearance"
        },
        "common": {
            "next": "Next",
            "back_to_home": "Back to Home"
        },
        "calculator": {
            "start_now": "Start Now",
            "service_selection_note": "First, select the appropriate service. Then we will gather the most important details for a quick initial estimate.",
            "requirements_title": "Details",
            "requirements_note": "Only the most important details. The exact calculation follows in the next step.",
            "from_place_placeholder": "From City / ZIP",
            "to_place_placeholder": "To City / ZIP",
            "living_area": "Living Area (sqm)",
            "rooms": "Number of Rooms",
            "estimated_waste_volume": "Estimated Volume (cbm)",
            "back_to_overview": "Back",
            "prognosis_label": "Price Range",
            "uncertainty_note": "This is an initial rough estimate. Factors such as floor level, carrying distances, additional services, or type of waste can influence the final price.",
            "adjust_details": "Adjust Details",
            "submit_details": "Submit Contact Details",
            "submit_details_subtitle": "Leave your contact details. We will check the information and get back to you with a matching response.",
            "your_price_range": "Your Price Range",
            "contact_person": "Contact Person",
            "name_placeholder": "Your Name",
            "phone_number": "Phone Number",
            "email_address": "E-Mail Address",
            "preferred_contact_time": "Preferred Callback Time",
            "jederzeit": "anytime",
            "vormittags": "mornings",
            "nachmittags": "afternoons",
            "abends": "evenings",
            "submit_photos": "Submit Photos Later",
            "submit_photos_subtitle": "If requested, we will send you an upload link for images or videos.",
            "important_price_note": "Important Note:",
            "price_disclaimer": "The displayed calculation is non-binding and serves as an initial orientation based on your input.",
            "submit_request": "Send Request",
            "submitting": "Sending...",
            "ssl_encryption_note": "SSL-encrypted Transmission",
            "success_title": "Request Successfully Sent",
            "success_description": "We have received your request and will contact you shortly with a matching response.",
            "upload_link_note": "We will send you the link for the photo upload separately via E-Mail and WhatsApp."
        }
    }

    with open(en_path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    for sec, keys in new_keys_en.items():
        if sec not in data:
            data[sec] = {}
        for k, v in keys.items():
            data[sec][k] = v
    
    with open(en_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {en_path}")

if __name__ == "__main__":
    merge_en_dictionary()
