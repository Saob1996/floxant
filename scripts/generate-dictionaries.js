const fs = require('fs');
const path = require('path');

const en = require('../dictionaries/en.json');
const de = require('../dictionaries/de.json');

const locales = [
    'ar', 'tr', 'ru', 'uk', 'pl', 'ro', 'bg', 'es', 'fr', 'it', 'fa', 'zh', 'vi', 'ko', 'ja'
];

// Simple UI Translations for key elements to ensure the "shell" is localized
const uiTranslations = {
    es: {
        nav: { home: "Inicio", services: "Servicios", pricing: "Precios", contact: "Contacto", login: "Iniciar sesión", dashboard: "Panel" },
        booking: { steps: { service: "Servicio", details: "Detalles", upgrades: "Extras", contact: "Contacto" }, buttons: { next: "Siguiente", back: "Atrás", submit: "Solicitar oferta" } },
        hero: { cta: "Obtener presupuesto" }
    },
    fr: {
        nav: { home: "Accueil", services: "Services", pricing: "Tarifs", contact: "Contact", login: "Connexion", dashboard: "Tableau de bord" },
        booking: { steps: { service: "Service", details: "Détails", upgrades: "Options", contact: "Contact" }, buttons: { next: "Suivant", back: "Retour", submit: "Demander un devis" } },
        hero: { cta: "Obtenir un devis" }
    },
    it: {
        nav: { home: "Home", services: "Servizi", pricing: "Prezzi", contact: "Contatti", login: "Accedi", dashboard: "Dashboard" },
        booking: { steps: { service: "Servizio", details: "Dettagli", upgrades: "Extra", contact: "Contatto" }, buttons: { next: "Avanti", back: "Indietro", submit: "Richiedi preventivo" } },
        hero: { cta: "Richiedi un preventivo" }
    },
    ar: { // RTL
        nav: { home: "الرئيسية", services: "خدماتنا", pricing: "الأسعار", contact: "اتصل بنا", login: "تسجيل الدخول", dashboard: "لوحة التحكم" },
        booking: { steps: { service: "الخدمة", details: "التفاصيل", upgrades: "الإضافات", contact: "التواصل" }, buttons: { next: "التالي", back: "السابق", submit: "طلب عرض سعر" } },
        hero: { cta: "احصل على عرض سعر" }
    },
    fa: { // RTL
        nav: { home: "خانه", services: "خدمات", pricing: "قیمت‌ها", contact: "تماس", login: "ورود", dashboard: "داشبورد" },
        booking: { steps: { service: "سرویس", details: "جزئیات", upgrades: "ارتقا", contact: "تماس" }, buttons: { next: "بعدی", back: "قبلی", submit: "درخواست قیمت" } },
        hero: { cta: "دریافت قیمت" }
    },
    tr: {
        nav: { home: "Anasayfa", services: "Hizmetler", pricing: "Fiyatlar", contact: "İletişim", login: "Giriş", dashboard: "Panel" },
        booking: { steps: { service: "Hizmet", details: "Detaylar", upgrades: "Ekstralar", contact: "İletişim" }, buttons: { next: "İleri", back: "Geri", submit: "Teklif İste" } },
        hero: { cta: "Teklif Alın" }
    },
    ru: {
        nav: { home: "Главная", services: "Услуги", pricing: "Цены", contact: "Контакты", login: "Вход", dashboard: "Панель" },
        booking: { steps: { service: "Сервис", details: "Детали", upgrades: "Опции", contact: "Контакт" }, buttons: { next: "Далее", back: "Назад", submit: "Запросить предложение" } },
        hero: { cta: "Получить предложение" }
    },
    pl: {
        nav: { home: "Strona główna", services: "Usługi", pricing: "Cennik", contact: "Kontakt", login: "Logowanie", dashboard: "Panel" },
        booking: { steps: { service: "Usługa", details: "Szczegóły", upgrades: "Dodatki", contact: "Kontakt" }, buttons: { next: "Dalej", back: "Wstecz", submit: "Poproś o ofertę" } },
        hero: { cta: "Uzyskaj wycenę" }
    },
    uk: {
        nav: { home: "Головна", services: "Послуги", pricing: "Ціни", contact: "Контакти", login: "Вхід", dashboard: "Панель" },
        booking: { steps: { service: "Сервіс", details: "Деталі", upgrades: "Опції", contact: "Контакт" }, buttons: { next: "Далі", back: "Назад", submit: "Запитати пропозицію" } },
        hero: { cta: "Отримати пропозицію" }
    },
    ro: {
        nav: { home: "Acasă", services: "Servicii", pricing: "Prețuri", contact: "Contact", login: "Autentificare", dashboard: "Panou" },
        booking: { steps: { service: "Serviciu", details: "Detalii", upgrades: "Opțiuni", contact: "Contact" }, buttons: { next: "Înainte", back: "Înapoi", submit: "Cere ofertă" } },
        hero: { cta: "Obține o ofertă" }
    },
    bg: {
        nav: { home: "Начало", services: "Услуги", pricing: "Цени", contact: "Контакт", login: "Вход", dashboard: "Табло" },
        hero: { cta: "Вземи оферта" }
    },
    zh: {
        nav: { home: "首页", services: "服务", pricing: "价格", contact: "联系", login: "登录", dashboard: "仪表板" },
        hero: { cta: "获取报价" }
    },
    ja: {
        nav: { home: "ホーム", services: "サービス", pricing: "料金", contact: "お問い合わせ", login: "ログイン", dashboard: "ダッシュボード" },
        hero: { cta: "見積もりを依頼" }
    },
    ko: {
        nav: { home: "홈", services: "서비스", pricing: "가격", contact: "연락처", login: "로그인", dashboard: "대시보드" },
        hero: { cta: "견적 요청" }
    },
    vi: {
        nav: { home: "Trang chủ", services: "Dịch vụ", pricing: "Giá cả", contact: "Liên hệ", login: "Đăng nhập", dashboard: "Bảng điều khiển" },
        hero: { cta: "Nhận báo giá" }
    }
};

const dictsDir = path.join(__dirname, '../dictionaries');

if (!fs.existsSync(dictsDir)) {
    fs.mkdirSync(dictsDir, { recursive: true });
}

locales.forEach(lang => {
    // Start with English as the fallback base (Better than German for SEO)
    const dict = JSON.parse(JSON.stringify(en));

    // Apply partial translations if available
    if (uiTranslations[lang]) {
        const trans = uiTranslations[lang];
        if (trans.nav) Object.assign(dict.nav, trans.nav);
        if (trans.hero) Object.assign(dict.hero, trans.hero);
        if (trans.booking) {
            if (trans.booking.steps) Object.assign(dict.booking.steps, trans.booking.steps);
            if (trans.booking.buttons) Object.assign(dict.booking.buttons, trans.booking.buttons);
        }
    }

    const filePath = path.join(dictsDir, `${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(dict, null, 2));
    console.log(`Generated ${lang}.json`);
});

console.log("All dictionaries generated.");
