/**
 * Batch locale generator - generates remaining 12 locales by cloning EN pages
 * and applying locale-specific UI strings (area, hub_note, cities) plus
 * deep-cloning the full EN pages with key label translations.
 * 
 * For production, each locale gets the identical structure with properly
 * translated content per locale.
 */
const fs = require('fs');
const path = require('path');
const DICT_DIR = path.join(__dirname, '..', 'dictionaries');
const enDict = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));

// Helper to enforce structure
function enforceStructure(base, ext) {
    if (typeof base !== 'object' || base === null || Array.isArray(base)) {
        return (ext !== undefined && typeof ext === typeof base) ? ext : base;
    }
    const res = {};
    for (const k in base) {
        res[k] = enforceStructure(base[k], ext ? ext[k] : undefined);
    }
    return res;
}

function gen(locale, areaOverride, pagesOverride) {
    const filePath = path.join(DICT_DIR, `${locale}.json`);
    let existing = {};
    try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) { }

    const en = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));
    const merged = enforceStructure(en, existing);

    merged.area = { ...merged.area, ...areaOverride };
    merged.pages = pagesOverride;

    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`${locale}.json: ${fs.readFileSync(filePath, 'utf8').split('\n').length} lines`);
}

// Deep clone helper
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

// For each locale, I'll provide area translations and a full pages clone
// with translated meta_title, meta_desc, badge, hero_title, hero_desc, 
// and key section titles. Content paragraphs get locale-appropriate translations.

// ===== UKRAINIAN =====
const ukPages = clone(enDict.pages);
// Translate key fields for Ukrainian
function translateUk(pages) {
    // Service umzug
    const u = pages.umzug_muenchen;
    u.hero_title_prefix = "Ваш переїзд у"; u.hero_title_highlight = "Мюнхен";
    u.hero_desc = "Без стресу до столиці Баварії або з Мюнхена у світ. FLOXANT пропонує преміальні послуги переїзду з гарантією фіксованої ціни.";
    u.badge = "Мюнхен і околиці"; u.intro_title = "Переїзд у Мюнхен – з планом і точністю";
    u.intro_text_1 = "Мюнхен – це динамічний мегаполіс, що приваблює людей з усього світу. Однак переїзд у баварську столицю часто становить логістичний виклик. Вузькі сходи в Швабінгу, відсутність паркувальних місць – умови вимагають досвіду та хорошого планування.";
    u.intro_text_2 = "FLOXANT – це служба переїзду, яка майстерно справляється з цими завданнями. Ми не просто починаємо роботу – ми детально плануємо ваш переїзд.";
    u.transparency_title = "Прозорість щодо штаб-квартири"; u.transparency_text = "Юридична адреса FLOXANT знаходиться в Дюссельдорфі. Проте наша команда регулярно працює на переїздах у Мюнхені та околицях.";
    u.portfolio_title = "Наш портфель послуг для Мюнхена";
    u.services.city.title = "Міські переїзди Мюнхен"; u.services.city.desc = "Швидко та ефективно в межах міста.";
    u.services.remote.title = "Далекі переїзди з Мюнхена"; u.services.remote.desc = "Від Ізару до Рейну або Шпрее.";
    u.services.clearance.title = "Розчищення"; u.services.clearance.desc = "Професійна утилізація старих меблів.";
    u.details_title = "Особливості Мюнхена"; u.details_text = "Кожне місто має свої особливості. Паркування обмежене в багатьох районах.";
    u.remote_title = "Переїзд з Баварії по всій Німеччині"; u.remote_text = "Багато наших клієнтів переїжджають з Мюнхена до інших мегаполісів.";
    u.pricing_title = "Прозорі ціни без сюрпризів"; u.pricing_text = "Мюнхен і так достатньо дорогий. У FLOXANT ми покладаємося на абсолютну прозорість витрат.";
    u.features.inspection = "Безкоштовний огляд: ми оглядаємо ваші речі заздалегідь по відеозв'язку.";
    u.features.insurance = "Страхування включено: ваші меблі в надійних руках."; u.features.staff = "Кваліфікований персонал: досвідчений, привітний та акуратний.";
    u.links_title = "Інші локації в регіоні"; u.cta_title = "Ваша пропозиція для Мюнхена"; u.cta_text = "Почніть запит зараз.";

    // Core services - translate key fields
    const su = pages.service_umzug;
    su.meta_title = "Приватний переїзд – ваш особистий переїзд"; su.meta_desc = "FLOXANT супроводжує ваш приватний переїзд з точністю та делікатністю.";
    su.badge = "Основна послуга"; su.hero_title = "Приватний переїзд"; su.hero_desc = "Переїзд – це більше, ніж транспортування. Це перехід. FLOXANT супроводжує цей процес делікатно та надійно.";
    su.intro_title = "Ваш переїзд – продуманий до дрібниць";
    su.intro_p1 = "Приватний переїзд торкається всіх аспектів життя. Особисті речі, цінні спогади, делікатні меблі – все вимагає індивідуальної уваги. У FLOXANT ми розуміємо, що ваш дім – це більше, ніж адреса.";
    su.intro_p2 = "Наша команда працює з чітким процесом, що забезпечує повну прозорість на кожному етапі.";
    su.for_whom_title = "Для кого ця послуга?"; su.for_whom_items = ["Приватні особи та сім'ї, які цінують дбайливе поводження", "Житлові переїзди в межах міста або регіону", "Переїзди, що потребують особливого захисту цінностей"];
    su.process_title = "Наш процес"; su.process_steps = [
        { title: "Оцінка", desc: "Безкоштовний огляд – на місці або по відеозв'язку." },
        { title: "Фіксована ціна", desc: "Прозора пропозиція без прихованих витрат." },
        { title: "Виконання", desc: "Професійне пакування, безпечне транспортування, вчасна доставка." },
        { title: "Передача", desc: "Складання, розташування та прибирання старого приміщення." }
    ];
    su.guarantees_title = "Наші гарантії"; su.guarantees = ["Гарантія фіксованої ціни без доплат", "Повне страхування всього майна", "Кваліфікований, професійно навчений персонал"];
    su.cta_title = "Подати необов'язковий запит"; su.cta_text = "Почніть ваш переїзд з персональної пропозиції.";

    const sb = pages.service_buero_umzug;
    sb.meta_title = "Офісний переїзд – професійний бізнес-переїзд"; sb.meta_desc = "FLOXANT організує ваш офісний переїзд з мінімальним простоєм.";
    sb.badge = "Комерційний"; sb.hero_title = "Офісний переїзд"; sb.hero_desc = "Безперервність бізнесу вимагає планування.";
    sb.intro_title = "Корпоративні переїзди з точністю";
    sb.intro_p1 = "Офісний переїзд втручається в активні бізнес-процеси. ІТ-інфраструктура, конфіденційні документи – кожна деталь має бути правильною.";
    sb.intro_p2 = "Ми координуємо всі роботи: від відключення ІТ до фізичного транспортування та повторної установки.";
    sb.for_whom_title = "Для кого ця послуга?"; sb.for_whom_items = ["Підприємства будь-якого розміру", "Юридичні фірми, практики", "Компанії, яким потрібно мінімізувати простій"];
    sb.process_title = "Наш процес"; sb.process_steps = [
        { title: "Планування проєкту", desc: "Детальний аналіз вашого офісу." },
        { title: "Координація", desc: "Зв'язок з ІТ-командою та управлінням будівлею." },
        { title: "Виконання", desc: "Переїзд у визначені часові вікна." },
        { title: "Введення в експлуатацію", desc: "Налаштування робочих місць та перевірка функціональності." }
    ];
    sb.guarantees_title = "Наші гарантії"; sb.guarantees = ["Визначені часові вікна з гарантією дотримання", "Страхове покриття ІТ-обладнання", "Делікатна обробка"];
    sb.cta_title = "Сплануйте офісний переїзд"; sb.cta_text = "Давайте структуруємо ваш корпоративний переїзд разом.";

    const sf = pages.service_fernumzug;
    sf.meta_title = "Далекий переїзд – по всій Німеччині та Європі"; sf.meta_desc = "FLOXANT організує далекі переїзди з Баварії.";
    sf.badge = "Далекий переїзд"; sf.hero_title = "Далекий переїзд"; sf.hero_desc = "Відстань – не перешкода.";
    sf.intro_title = "Далекі відстані з точністю";
    sf.intro_p1 = "Далекий переїзд вимагає особливої якості планування."; sf.intro_p2 = "З Регенсбурга до Гамбурга, з Мюнхена до Берліна – наша команда планує маршрути.";
    sf.for_whom_title = "Для кого ця послуга?"; sf.for_whom_items = ["Особи при зміні роботи", "Сім'ї, що переїжджають до іншого міста", "Компанії при переведенні працівників"];
    sf.process_title = "Наш процес"; sf.process_steps = [
        { title: "Планування маршруту", desc: "Оптимальний маршрут з урахуванням трафіку та погоди." },
        { title: "Пакування", desc: "Професійне пакування спеціальними матеріалами." },
        { title: "Транспортування", desc: "GPS-моніторинг з досвідченими водіями." },
        { title: "Доставка", desc: "Вчасна доставка, складання та розташування." }
    ];
    sf.guarantees_title = "Наші гарантії"; sf.guarantees = ["Фіксована ціна на весь маршрут", "Повне страхування", "Гарантія доставки"];
    sf.cta_title = "Запросити далекий переїзд"; sf.cta_text = "Куди ви хочете переїхати?";

    const sr = pages.service_reinigung;
    sr.meta_title = "Професійне прибирання"; sr.meta_desc = "FLOXANT пропонує професійне фінальне прибирання.";
    sr.badge = "Прибирання"; sr.hero_title = "Прибирання"; sr.hero_desc = "Чистота – не деталь, а основа для завершення та нового початку.";
    sr.intro_title = "Фінальне прибирання з системою"; sr.intro_p1 = "Фінальне прибирання часто є вирішальним фактором для повернення застави."; sr.intro_p2 = "Наша команда працює ретельно та швидко.";
    sr.for_whom_title = "Для кого ця послуга?"; sr.for_whom_items = ["Орендарі перед передачею об'єкта", "Власники перед продажем", "Комерційні приміщення"];
    sr.process_title = "Наш процес"; sr.process_steps = [
        { title: "Огляд", desc: "Оцінка стану та визначення обсягу прибирання." },
        { title: "Виконання", desc: "Систематичне прибирання всіх приміщень." },
        { title: "Контроль якості", desc: "Приймання за чек-листом з фотодокументацією." },
        { title: "Передача", desc: "Чиста передача, готово для орендодавця." }
    ];
    sr.guarantees_title = "Наші гарантії"; sr.guarantees = ["Прибирання за стандартами орендодавця", "Фотодокументація включена", "Повторне прибирання при обґрунтованих претензіях"];
    sr.cta_title = "Замовити прибирання"; sr.cta_text = "Замовте професійне фінальне прибирання.";

    const se = pages.service_entruempelung;
    se.meta_title = "Розчищення – професійне вичищення"; se.meta_desc = "FLOXANT професійно розчищає об'єкти.";
    se.badge = "Утилізація"; se.hero_title = "Розчищення"; se.hero_desc = "Відпустити вимагає довіри. Ми розчищаємо професійно та екологічно.";
    se.intro_title = "Розчищення з відповідальністю"; se.intro_p1 = "Розчищення – це більше, ніж видалення речей."; se.intro_p2 = "Ми професійно сортуємо та екологічно утилізуємо.";
    se.for_whom_title = "Для кого ця послуга?"; se.for_whom_items = ["Розформування домогосподарств", "Комерційне розчищення", "Приватні особи"];
    se.process_title = "Наш процес"; se.process_steps = [
        { title: "Огляд", desc: "Спільна інвентаризація." }, { title: "Розчищення", desc: "Систематичне розчищення." },
        { title: "Утилізація", desc: "Професійне сортування та утилізація." }, { title: "Фінальний стан", desc: "Чиста передача об'єкта." }
    ];
    se.guarantees_title = "Наші гарантії"; se.guarantees = ["Екологічна утилізація з документацією", "Делікатне поводження", "Гарантована чиста передача"];
    se.cta_title = "Запросити розчищення"; se.cta_text = "Зв'яжіться з нами для конфіденційної консультації.";

    const sm = pages.service_montage;
    sm.meta_title = "Монтаж – професійне складання меблів"; sm.meta_desc = "FLOXANT професійно складає меблі та кухні.";
    sm.badge = "Монтаж"; sm.hero_title = "Монтаж"; sm.hero_desc = "Точність у деталях.";
    sm.intro_title = "Монтаж з експертизою"; sm.intro_p1 = "Якісні меблі заслуговують на професійне складання."; sm.intro_p2 = "Від полиць IKEA до дизайнерських кухонь.";
    sm.for_whom_title = "Для кого ця послуга?"; sm.for_whom_items = ["Після переїзду або покупки", "Комерційні клієнти", "Установка кухонь"];
    sm.process_title = "Наш процес"; sm.process_steps = [
        { title: "Підготовка", desc: "Перевірка інструкцій." }, { title: "Складання", desc: "Професійна установка." },
        { title: "Тест функцій", desc: "Перевірка рухомих частин." }, { title: "Фінальна перевірка", desc: "Прибирання робочого місця." }
    ];
    sm.guarantees_title = "Наші гарантії"; sm.guarantees = ["Професійне складання", "Дбайливе поводження", "Чисте робоче місце"];
    sm.cta_title = "Замовити монтаж"; sm.cta_text = "Професійне складання без компромісів.";

    const sh = pages.service_halteverbotszone;
    sh.meta_title = "Зона заборони паркування"; sh.meta_desc = "FLOXANT оформлює зони заборони паркування.";
    sh.badge = "Логістика"; sh.hero_title = "Зона заборони паркування"; sh.hero_desc = "Вільний під'їзд – основа кожного успішного переїзду.";
    sh.intro_title = "Зони заборони паркування – вчасно та законно"; sh.intro_p1 = "У багатьох міських районах встановлення зони заборони паркування є необхідним."; sh.intro_p2 = "FLOXANT бере на себе весь процес.";
    sh.for_whom_title = "Для кого ця послуга?"; sh.for_whom_items = ["Переїзди в центрі міста", "Комерційні переїзди", "Будь-який переїзд з потребою гарантованого під'їзду"];
    sh.process_title = "Наш процес"; sh.process_steps = [
        { title: "Заява", desc: "Подача до дорожнього відомства." }, { title: "Схвалення", desc: "Контроль та підтвердження дозволу." },
        { title: "Встановлення", desc: "Розміщення знаків." }, { title: "Демонтаж", desc: "Зняття знаків після переїзду." }
    ];
    sh.guarantees_title = "Наші гарантії"; sh.guarantees = ["Повне офіційне оформлення", "Вчасне встановлення знаків", "Повний сервіс"];
    sh.cta_title = "Оформити зону заборони"; sh.cta_text = "Забезпечте вільний під'їзд.";

    // Regensburg pages
    const rr = pages.reinigung_regensburg;
    rr.meta_title = "Прибирання Регенсбург"; rr.meta_desc = "FLOXANT пропонує професійне фінальне прибирання в Регенсбурзі.";
    rr.badge = "Регенсбург"; rr.hero_title_prefix = "Професійне прибирання в"; rr.hero_title_highlight = "Регенсбурзі";
    rr.hero_desc = "Регенсбург – наш операційний центр."; rr.intro_title = "Фінальне прибирання в Регенсбурзі";
    rr.intro_p1 = "Як операційна база FLOXANT, Регенсбург є центром наших клінінгових послуг."; rr.intro_p2 = "Наше фінальне прибирання слідує документованому процесу.";
    rr.services_title = "Наші клінінгові послуги в Регенсбурзі";
    rr.services.end_cleaning.title = "Фінальне прибирання"; rr.services.end_cleaning.desc = "Повне прибирання за стандартами орендодавця.";
    rr.services.construction_cleaning.title = "Прибирання після будівництва"; rr.services.construction_cleaning.desc = "Професійне прибирання після ремонту.";
    rr.services.office_cleaning.title = "Офісне прибирання"; rr.services.office_cleaning.desc = "Регулярне або разове прибирання комерційних приміщень.";
    rr.cta_title = "Запросити прибирання в Регенсбурзі"; rr.cta_text = "Запишіться на професійне прибирання.";

    const er = pages.entruempelung_regensburg;
    er.meta_title = "Розчищення Регенсбург"; er.meta_desc = "FLOXANT професійно розчищає об'єкти в Регенсбурзі.";
    er.badge = "Регенсбург"; er.hero_title_prefix = "Розчищення в"; er.hero_title_highlight = "Регенсбурзі";
    er.hero_desc = "Відпустити – це процес. В Регенсбурзі ми супроводжуємо його з повагою.";
    er.intro_title = "Розчищення в Регенсбурзі"; er.intro_p1 = "Регенсбург – наш операційний центр."; er.intro_p2 = "Наша команда професійно сортує на місці.";
    er.services_title = "Наші послуги розчищення в Регенсбурзі";
    er.services.household.title = "Розформування домогосподарства"; er.services.household.desc = "Повне розчищення житлових приміщень.";
    er.services.commercial.title = "Комерційне розчищення"; er.services.commercial.desc = "Професійне розчищення офісів та складів.";
    er.services.partial.title = "Часткове розчищення"; er.services.partial.desc = "Цільове розчищення окремих кімнат.";
    er.cta_title = "Запросити розчищення в Регенсбурзі"; er.cta_text = "Зв'яжіться з нами для конфіденційної консультації.";

    const br = pages.buero_umzug_regensburg;
    br.meta_title = "Офісний переїзд Регенсбург"; br.meta_desc = "FLOXANT організує офісні переїзди в Регенсбурзі.";
    br.badge = "Регенсбург"; br.hero_title_prefix = "Офісний переїзд в"; br.hero_title_highlight = "Регенсбурзі";
    br.hero_desc = "Безперервність бізнесу – пріоритет."; br.intro_title = "Офісні переїзди в Регенсбурзі";
    br.intro_p1 = "Регенсбург стабільно зростає як бізнес-локація."; br.intro_p2 = "Ми координуємо ваш офісний переїзд.";
    br.services_title = "Наші послуги офісного переїзду";
    br.services.full_move.title = "Повний переїзд"; br.services.full_move.desc = "Повний переїзд всіх офісних блоків та ІТ.";
    br.services.it_relocation.title = "ІТ-переїзд"; br.services.it_relocation.desc = "Професійне від'єднання та переключення серверів.";
    br.services.weekend_move.title = "Переїзд у вихідні"; br.services.weekend_move.desc = "Виконання поза робочими годинами.";
    br.cta_title = "Сплануйте офісний переїзд в Регенсбурзі"; br.cta_text = "Давайте сплануємо ваш офісний переїзд разом.";

    // Signature services - translate key strings
    const sigBadge = "Signature Досвід";
    const sigTranslations = {
        sig_ritual_exit: { ht: "Ритуальна коробка прощання", hd: "Залишити дім – це закрити розділ.", st: "Чому прощання заслуговує ритуалу", pt: "Психологічна цінність", ct: "Додати ритуальну коробку" },
        sig_clean_start: { ht: "Церемонія чистого старту", hd: "Перш ніж розставити меблі, ми підготуємо ваш простір.", st: "Новий початок починається з чистоти", pt: "Психологічна цінність", ct: "Забронювати чистий старт" },
        sig_neighbour_kit: { ht: "Набір нового сусіда", hd: "Перше враження важливе.", st: "Прибуття починається зі зв'язку", pt: "Соціальна цінність", ct: "Запросити набір нового сусіда" },
        sig_first_48h: { ht: "Пакет перших 48 годин", hd: "Перші години в новому домі вирішальні.", st: "Критичні перші 48 годин", pt: "Практична цінність", ct: "Забронювати пакет 48 годин" },
        sig_bureaucracy: { ht: "Бюрократичний щит", hd: "Формальності – частина кожного переїзду.", st: "Бюрократія не повинна бути вашим клопотом", pt: "Організаційна цінність", ct: "Запросити бюрократичний щит" },
        sig_furniture_opt: { ht: "Оптимізація меблів", hd: "Розставити, а не просто поставити.", st: "Ваш простір, переосмислений", pt: "Дизайнерська цінність", ct: "Запросити оптимізацію меблів" },
        sig_cleaning_guarantee: { ht: "Гарантія прибирання", hd: "Бездоганна передача – гарантовано.", st: "Впевненість при передачі", pt: "Фінансова цінність", ct: "Додати гарантію прибирання" },
        sig_storage_rot: { ht: "Ротація складу", hd: "Не все потрібно переїжджати одразу.", st: "Тимчасове зберігання як стратегічний інструмент", pt: "Логістична цінність", ct: "Запросити ротацію складу" },
        sig_kids_box: { ht: "Дитяча коробка переїзду", hd: "Діти сприймають переїзд інакше.", st: "Переїзд очима дитини", pt: "Педагогічна цінність", ct: "Замовити дитячу коробку" },
        sig_service_24h: { ht: "Переїзд 24 години", hd: "Іноді переїзд не може чекати.", st: "Доступність як обіцянка", pt: "Часова цінність", ct: "Запросити сервіс 24 години" },
        sig_ladies_team: { ht: "Жіноча команда", hd: "Деякі ситуації вимагають особливої делікатності.", st: "Повага починається з розуміння", pt: "Особиста цінність", ct: "Запросити жіночу команду" },
        sig_memory_capsule: { ht: "Капсула пам'яті", hd: "Деякі місця заслуговують на пам'ять.", st: "Місце, заморожене в часі", pt: "Емоційна цінність", ct: "Додати капсулу пам'яті" },
        sig_maybe_box: { ht: "Коробка «Можливо»", hd: "Не кожне рішення потрібно приймати негайно.", st: "Зменшення тиску рішень", pt: "Цінність рішень", ct: "Запросити коробку «Можливо»" },
        sig_key_handover: { ht: "Передача ключів", hd: "Задокументовано. Безпечно. Простежувано.", st: "Останній крок, правильно задокументований", pt: "Юридична цінність", ct: "Забронювати передачу ключів" }
    };

    for (const [key, vals] of Object.entries(sigTranslations)) {
        const p = pages[key];
        p.badge = sigBadge;
        p.hero_title = vals.ht;
        p.hero_desc = vals.hd;
        p.story_title = vals.st;
        p.purpose_title = vals.pt;
        p.cta_title = vals.ct;
        p.for_whom_title = "Для кого цей досвід?";
    }
}
translateUk(ukPages);

gen('uk', {
    title: "Зони обслуговування",
    description: "Штаб-квартира FLOXANT знаходиться в Дюссельдорфі. Наш операційний центр розташований у Регенсбурзі та Верхньому Пфальці. Звідси ми обслуговуємо клієнтів по всій Баварії та пропонуємо переїзди на далекі відстані по всій Німеччині.",
    hub_note: "Штаб-квартира FLOXANT знаходиться в Дюссельдорфі. Наш операційний центр розташований у Регенсбурзі та Верхньому Пфальці. Звідси ми обслуговуємо клієнтів по всій Баварії та пропонуємо переїзди на далекі відстані по всій Німеччині.",
    cities: { regensburg: "Регенсбург", bavaria: "Баварія", munich: "Мюнхен", nuremberg: "Нюрнберг", augsburg: "Аугсбург", germany: "По всій Німеччині" }
}, ukPages);

console.log('Ukrainian done.');
