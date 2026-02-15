const fs = require('fs');
const path = require('path');
const DICT_DIR = path.join(__dirname, '..', 'dictionaries');

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

function gen(locale, trans) {
    const filePath = path.join(DICT_DIR, `${locale}.json`);
    let existing = {};
    try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) { }

    const en = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));
    const merged = enforceStructure(en, existing);

    if (trans.area) merged.area = { ...merged.area, ...trans.area };
    if (trans.pages) merged.pages = trans.pages;

    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`${locale}.json: ${fs.readFileSync(filePath, 'utf8').split('\n').length} lines`);
}

// Helper to create sig pages with locale-specific translations
function makeSigPages(t) {
    return {
        sig_ritual_exit: { meta_title: t.sig_ritual_exit_mt, meta_desc: t.sig_ritual_exit_md, badge: t.sig_badge, hero_title: t.sig_ritual_exit_ht, hero_desc: t.sig_ritual_exit_hd, story_title: t.sig_ritual_exit_st, story_p1: t.sig_ritual_exit_sp1, story_p2: t.sig_ritual_exit_sp2, purpose_title: t.psy_val, purpose_text: t.sig_ritual_exit_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_ritual_exit_fw, cta_title: t.sig_ritual_exit_ct, cta_text: t.sig_ritual_exit_ctxt },
        sig_clean_start: { meta_title: t.sig_clean_start_mt, meta_desc: t.sig_clean_start_md, badge: t.sig_badge, hero_title: t.sig_clean_start_ht, hero_desc: t.sig_clean_start_hd, story_title: t.sig_clean_start_st, story_p1: t.sig_clean_start_sp1, story_p2: t.sig_clean_start_sp2, purpose_title: t.psy_val, purpose_text: t.sig_clean_start_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_clean_start_fw, cta_title: t.sig_clean_start_ct, cta_text: t.sig_clean_start_ctxt },
        sig_neighbour_kit: { meta_title: t.sig_neighbour_mt, meta_desc: t.sig_neighbour_md, badge: t.sig_badge, hero_title: t.sig_neighbour_ht, hero_desc: t.sig_neighbour_hd, story_title: t.sig_neighbour_st, story_p1: t.sig_neighbour_sp1, story_p2: t.sig_neighbour_sp2, purpose_title: t.social_val, purpose_text: t.sig_neighbour_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_neighbour_fw, cta_title: t.sig_neighbour_ct, cta_text: t.sig_neighbour_ctxt },
        sig_first_48h: { meta_title: t.sig_48h_mt, meta_desc: t.sig_48h_md, badge: t.sig_badge, hero_title: t.sig_48h_ht, hero_desc: t.sig_48h_hd, story_title: t.sig_48h_st, story_p1: t.sig_48h_sp1, story_p2: t.sig_48h_sp2, purpose_title: t.pract_val, purpose_text: t.sig_48h_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_48h_fw, cta_title: t.sig_48h_ct, cta_text: t.sig_48h_ctxt },
        sig_bureaucracy: { meta_title: t.sig_bur_mt, meta_desc: t.sig_bur_md, badge: t.sig_badge, hero_title: t.sig_bur_ht, hero_desc: t.sig_bur_hd, story_title: t.sig_bur_st, story_p1: t.sig_bur_sp1, story_p2: t.sig_bur_sp2, purpose_title: t.org_val, purpose_text: t.sig_bur_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_bur_fw, cta_title: t.sig_bur_ct, cta_text: t.sig_bur_ctxt },
        sig_furniture_opt: { meta_title: t.sig_furn_mt, meta_desc: t.sig_furn_md, badge: t.sig_badge, hero_title: t.sig_furn_ht, hero_desc: t.sig_furn_hd, story_title: t.sig_furn_st, story_p1: t.sig_furn_sp1, story_p2: t.sig_furn_sp2, purpose_title: t.design_val, purpose_text: t.sig_furn_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_furn_fw, cta_title: t.sig_furn_ct, cta_text: t.sig_furn_ctxt },
        sig_cleaning_guarantee: { meta_title: t.sig_cg_mt, meta_desc: t.sig_cg_md, badge: t.sig_badge, hero_title: t.sig_cg_ht, hero_desc: t.sig_cg_hd, story_title: t.sig_cg_st, story_p1: t.sig_cg_sp1, story_p2: t.sig_cg_sp2, purpose_title: t.fin_val, purpose_text: t.sig_cg_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_cg_fw, cta_title: t.sig_cg_ct, cta_text: t.sig_cg_ctxt },
        sig_storage_rot: { meta_title: t.sig_sr_mt, meta_desc: t.sig_sr_md, badge: t.sig_badge, hero_title: t.sig_sr_ht, hero_desc: t.sig_sr_hd, story_title: t.sig_sr_st, story_p1: t.sig_sr_sp1, story_p2: t.sig_sr_sp2, purpose_title: t.log_val, purpose_text: t.sig_sr_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_sr_fw, cta_title: t.sig_sr_ct, cta_text: t.sig_sr_ctxt },
        sig_kids_box: { meta_title: t.sig_kb_mt, meta_desc: t.sig_kb_md, badge: t.sig_badge, hero_title: t.sig_kb_ht, hero_desc: t.sig_kb_hd, story_title: t.sig_kb_st, story_p1: t.sig_kb_sp1, story_p2: t.sig_kb_sp2, purpose_title: t.edu_val, purpose_text: t.sig_kb_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_kb_fw, cta_title: t.sig_kb_ct, cta_text: t.sig_kb_ctxt },
        sig_service_24h: { meta_title: t.sig_24_mt, meta_desc: t.sig_24_md, badge: t.sig_badge, hero_title: t.sig_24_ht, hero_desc: t.sig_24_hd, story_title: t.sig_24_st, story_p1: t.sig_24_sp1, story_p2: t.sig_24_sp2, purpose_title: t.time_val, purpose_text: t.sig_24_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_24_fw, cta_title: t.sig_24_ct, cta_text: t.sig_24_ctxt },
        sig_ladies_team: { meta_title: t.sig_lt_mt, meta_desc: t.sig_lt_md, badge: t.sig_badge, hero_title: t.sig_lt_ht, hero_desc: t.sig_lt_hd, story_title: t.sig_lt_st, story_p1: t.sig_lt_sp1, story_p2: t.sig_lt_sp2, purpose_title: t.pers_val, purpose_text: t.sig_lt_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_lt_fw, cta_title: t.sig_lt_ct, cta_text: t.sig_lt_ctxt },
        sig_memory_capsule: { meta_title: t.sig_mc_mt, meta_desc: t.sig_mc_md, badge: t.sig_badge, hero_title: t.sig_mc_ht, hero_desc: t.sig_mc_hd, story_title: t.sig_mc_st, story_p1: t.sig_mc_sp1, story_p2: t.sig_mc_sp2, purpose_title: t.emo_val, purpose_text: t.sig_mc_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_mc_fw, cta_title: t.sig_mc_ct, cta_text: t.sig_mc_ctxt },
        sig_maybe_box: { meta_title: t.sig_mb_mt, meta_desc: t.sig_mb_md, badge: t.sig_badge, hero_title: t.sig_mb_ht, hero_desc: t.sig_mb_hd, story_title: t.sig_mb_st, story_p1: t.sig_mb_sp1, story_p2: t.sig_mb_sp2, purpose_title: t.dec_val, purpose_text: t.sig_mb_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_mb_fw, cta_title: t.sig_mb_ct, cta_text: t.sig_mb_ctxt },
        sig_key_handover: { meta_title: t.sig_kh_mt, meta_desc: t.sig_kh_md, badge: t.sig_badge, hero_title: t.sig_kh_ht, hero_desc: t.sig_kh_hd, story_title: t.sig_kh_st, story_p1: t.sig_kh_sp1, story_p2: t.sig_kh_sp2, purpose_title: t.legal_val, purpose_text: t.sig_kh_pt, for_whom_title: t.for_whom, for_whom_text: t.sig_kh_fw, cta_title: t.sig_kh_ct, cta_text: t.sig_kh_ctxt }
    };
}

// I'll take a more efficient approach - read en.json as template, clone structure, replace values
const enDict = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));
const enPages = enDict.pages;

// For each remaining locale, we'll deep-clone the EN pages structure and
// replace ALL string values with translated versions via a translation map
// This ensures structural integrity while providing proper translations

// Instead of the verbose helper approach, let me just write the full translations directly
// Using a more compact approach with JSON files

const ruPages = JSON.parse(JSON.stringify(enPages));
// Russian translations
const ruMap = {
    // umzug_muenchen
    "Your Move in": "Ваш переезд в", "Munich": "Мюнхен",
    "Stress-free to the Bavarian capital": "Без стресса в столицу Баварии или из Мюнхена в мир. FLOXANT предлагает премиальные услуги переезда с гарантией фиксированной цены.",
    "Munich & Surroundings": "Мюнхен и окрестности",
    // ... this approach is too fragile. Let me just write complete locale files directly
};

// Actually, the most reliable approach is to write each locale's pages section as a complete object.
// Let me write a combined script that handles multiple locales with full translations.

// RUSSIAN
gen('ru', {
    area: {
        title: "Зоны обслуживания",
        description: "Штаб-квартира FLOXANT находится в Дюссельдорфе. Наш операционный центр расположен в Регенсбурге и Верхнем Пфальце. Отсюда мы обслуживаем клиентов по всей Баварии и предлагаем переезды на дальние расстояния по всей Германии.",
        hub_note: "Штаб-квартира FLOXANT находится в Дюссельдорфе. Наш операционный центр расположен в Регенсбурге и Верхнем Пфальце. Отсюда мы обслуживаем клиентов по всей Баварии и предлагаем переезды на дальние расстояния по всей Германии.",
        cities: { regensburg: "Регенсбург", bavaria: "Бавария", munich: "Мюнхен", nuremberg: "Нюрнберг", augsburg: "Аугсбург", germany: "По всей Германии" }
    },
    pages: {
        umzug_muenchen: {
            hero_title_prefix: "Ваш переезд в", hero_title_highlight: "Мюнхен",
            hero_desc: "Без стресса в столицу Баварии или из Мюнхена в мир. FLOXANT предлагает премиальные услуги переезда с гарантией фиксированной цены.",
            badge: "Мюнхен и окрестности", intro_title: "Переезд в Мюнхен – с планом и точностью",
            intro_text_1: "Мюнхен – это динамичный мегаполис, привлекающий людей со всего мира. Однако переезд в баварскую столицу часто представляет собой логистическую задачу. Узкие лестницы в Швабинге, отсутствие парковочных мест в Глокенбахфиртель – условия требуют опыта и хорошего планирования.",
            intro_text_2: "FLOXANT – это служба переезда, которая мастерски справляется именно с этими задачами. Мы не просто начинаем работу – мы детально планируем ваш переезд.",
            transparency_title: "Прозрачность в отношении штаб-квартиры",
            transparency_text: "Юридический адрес FLOXANT находится в Дюссельдорфе. Тем не менее, наша команда регулярно работает на переездах в Мюнхене и окрестностях.",
            portfolio_title: "Наш портфель услуг для Мюнхена",
            services: {
                city: { title: "Городские переезды Мюнхен", desc: "Быстро и эффективно в пределах городской черты." },
                remote: { title: "Дальние переезды из Мюнхена", desc: "От Изара до Рейна или Шпрее. Логистически оптимизированные и безопасные." },
                clearance: { title: "Расчистка", desc: "Профессиональная утилизация старой мебели при расформировании квартир в Мюнхене." }
            },
            details_title: "Особенности Мюнхена", details_text: "У каждого города свои особенности. Парковка во многих районах ограничена.",
            remote_title: "Переезд из Баварии по всей Германии", remote_text: "Многие наши клиенты переезжают из Мюнхена в другие мегаполисы. Профессиональное планирование необходимо.",
            pricing_title: "Прозрачные цены без сюрпризов", pricing_text: "Мюнхен и так достаточно дорогой. В FLOXANT мы делаем ставку на полную прозрачность затрат.",
            features: { inspection: "Бесплатный осмотр: мы осматриваем ваши вещи заранее по видеосвязи.", insurance: "Страховка включена: ваша мебель в надёжных руках и полностью застрахована.", staff: "Квалифицированный персонал: опытный, дружелюбный и аккуратный." },
            links_title: "Другие локации в регионе", cta_title: "Ваше предложение для Мюнхена", cta_text: "Начните запрос сейчас. Мы составим необязывающее предложение."
        },
        service_umzug: {
            meta_title: "Частный переезд – ваш персональный переезд", meta_desc: "FLOXANT сопровождает ваш частный переезд с точностью и деликатностью.",
            badge: "Основная услуга", hero_title: "Частный переезд", hero_desc: "Переезд – это больше, чем транспортировка. Это переход. FLOXANT сопровождает этот процесс деликатно и надёжно.",
            intro_title: "Ваш переезд – продуман до мелочей",
            intro_p1: "Частный переезд затрагивает все сферы жизни. Личные вещи, дорогие воспоминания, деликатная мебель – всё требует индивидуального внимания.",
            intro_p2: "Наша команда работает с чётким процессом, обеспечивающим полную прозрачность на каждом этапе.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Частные лица и семьи, ценящие бережное обращение", "Переезды внутри города или региона", "Переезды, требующие особой защиты ценностей"],
            process_title: "Наш процесс", process_steps: [
                { title: "Оценка", desc: "Бесплатный осмотр – на месте или по видеосвязи." },
                { title: "Фиксированная цена", desc: "Прозрачное предложение без скрытых расходов." },
                { title: "Исполнение", desc: "Профессиональная упаковка, безопасная транспортировка, своевременная доставка." },
                { title: "Передача", desc: "Сборка, расстановка и уборка старого помещения." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Гарантия фиксированной цены без доплат", "Полное страхование всего имущества", "Квалифицированный, профессионально обученный персонал"],
            cta_title: "Подать необязывающий запрос", cta_text: "Начните ваш переезд с персонального предложения."
        },
        service_buero_umzug: {
            meta_title: "Офисный переезд – профессиональный бизнес-переезд", meta_desc: "FLOXANT организует ваш офисный переезд с минимальным простоем.",
            badge: "Коммерческий", hero_title: "Офисный переезд", hero_desc: "Непрерывность бизнеса требует планирования. Мы обеспечим полную работоспособность на новом месте без задержек.",
            intro_title: "Корпоративные переезды с точностью",
            intro_p1: "Офисный переезд вмешивается в активные бизнес-процессы. ИТ-инфраструктура, конфиденциальные документы – каждая деталь должна быть учтена.",
            intro_p2: "Мы координируем все работы: от отключения ИТ до физической транспортировки и повторной установки.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Предприятия любого размера", "Юридические фирмы, практики, офисы", "Компании, которым необходимо минимизировать простой"],
            process_title: "Наш процесс", process_steps: [
                { title: "Планирование проекта", desc: "Детальный анализ вашего офиса." },
                { title: "Координация", desc: "Связь с вашей ИТ-командой и управлением зданием." },
                { title: "Исполнение", desc: "Переезд в определённые временные окна." },
                { title: "Ввод в эксплуатацию", desc: "Настройка рабочих мест и проверка функциональности." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Определённые временные окна с гарантией соблюдения", "Страховое покрытие ИТ-оборудования", "Деликатная обработка без нарушения бизнес-процессов"],
            cta_title: "Спланируйте офисный переезд", cta_text: "Давайте структурируем ваш корпоративный переезд вместе."
        },
        service_fernumzug: {
            meta_title: "Дальний переезд – по всей Германии и Европе", meta_desc: "FLOXANT организует дальние переезды из Баварии в любой город Германии.",
            badge: "Дальний переезд", hero_title: "Дальний переезд", hero_desc: "Расстояние – не преграда. Мы связываем Регенсбург, Баварию и всю Германию логистикой без компромиссов.",
            intro_title: "Дальние расстояния с точностью",
            intro_p1: "Дальний переезд требует особого качества планирования.",
            intro_p2: "Из Регенсбурга в Гамбург, из Мюнхена в Берлин – наша команда планирует маршруты и гарантирует безопасную доставку.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Частные лица при смене работы", "Семьи, переезжающие в другой город", "Компании при переводе сотрудников"],
            process_title: "Наш процесс", process_steps: [
                { title: "Планирование маршрута", desc: "Оптимальный маршрут с учётом трафика и погоды." },
                { title: "Упаковка", desc: "Профессиональная упаковка специальными материалами." },
                { title: "Транспортировка", desc: "GPS-мониторинг с опытными водителями." },
                { title: "Доставка", desc: "Своевременная доставка, сборка и расстановка." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Фиксированная цена на весь маршрут", "Полное страхование на протяжении всей перевозки", "Гарантия доставки в определённые сроки"],
            cta_title: "Запросить дальний переезд", cta_text: "Куда вы хотите переехать? Получите индивидуальное предложение."
        },
        service_reinigung: {
            meta_title: "Профессиональная уборка – финальная уборка и передача", meta_desc: "FLOXANT предлагает профессиональную финальную уборку по стандартам арендодателя.",
            badge: "Уборка", hero_title: "Уборка", hero_desc: "Чистота – не деталь, а основа для завершения и нового начала.",
            intro_title: "Финальная уборка с системой",
            intro_p1: "Финальная уборка часто является решающим фактором для возврата залога.",
            intro_p2: "Наша команда работает тщательно, быстро и уважительно.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Арендаторы перед передачей объекта", "Собственники перед продажей или повторной сдачей", "Коммерческие помещения по окончании аренды"],
            process_title: "Наш процесс", process_steps: [
                { title: "Осмотр", desc: "Оценка состояния и определение объёма уборки." },
                { title: "Выполнение", desc: "Систематическая уборка всех помещений." },
                { title: "Контроль качества", desc: "Приёмка по чек-листу с фотодокументацией." },
                { title: "Передача", desc: "Чистая передача, готово для арендодателя." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Уборка по стандартам арендодателя", "Фотодокументация включена", "Повторная уборка при обоснованных претензиях"],
            cta_title: "Заказать уборку", cta_text: "Закажите профессиональную финальную уборку."
        },
        service_entruempelung: {
            meta_title: "Расчистка – профессиональная вычистка и утилизация", meta_desc: "FLOXANT профессионально расчищает жилые и коммерческие объекты.",
            badge: "Утилизация", hero_title: "Расчистка", hero_desc: "Отпустить требует доверия. Мы расчищаем профессионально, деликатно и экологично.",
            intro_title: "Расчистка с ответственностью",
            intro_p1: "Расчистка – это больше, чем удаление вещей. За этим часто стоят эмоциональные решения.",
            intro_p2: "Мы профессионально сортируем, экологично утилизируем и оставляем чистые помещения.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Расформирование домохозяйств и наследство", "Коммерческая расчистка при закрытии бизнеса", "Частные лица, желающие профессионально избавиться от накопившегося"],
            process_title: "Наш процесс", process_steps: [
                { title: "Обход", desc: "Совместная инвентаризация. Вы решаете, что остаётся, что уходит." },
                { title: "Расчистка", desc: "Систематическая расчистка всех согласованных зон." },
                { title: "Утилизация", desc: "Профессиональная сортировка и утилизация в соответствии с законом." },
                { title: "Финальное состояние", desc: "Передача объекта в чистом виде." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Экологичная утилизация с документацией", "Деликатное обращение в чувствительных ситуациях", "Гарантированная чистая передача"],
            cta_title: "Запросить расчистку", cta_text: "Свяжитесь с нами для конфиденциальной консультации."
        },
        service_montage: {
            meta_title: "Монтаж – профессиональная сборка мебели и кухонь", meta_desc: "FLOXANT профессионально собирает мебель и кухни.",
            badge: "Монтаж", hero_title: "Монтаж", hero_desc: "Точность в деталях. Профессиональная сборка и разборка вашей мебели и кухонь.",
            intro_title: "Монтаж с экспертизой",
            intro_p1: "Качественная мебель и кухни заслуживают профессиональной сборки.",
            intro_p2: "От полок IKEA до дизайнерских кухонь – мы работаем аккуратно и уважительно.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Частные лица после переезда или покупки", "Коммерческие клиенты при оборудовании офисов", "Установка кухонь при ремонте"],
            process_title: "Наш процесс", process_steps: [
                { title: "Подготовка", desc: "Проверка инструкций и материалов." },
                { title: "Сборка", desc: "Профессиональная установка с учётом геометрии помещения." },
                { title: "Тест функций", desc: "Проверка всех подвижных частей и ящиков." },
                { title: "Финальная проверка", desc: "Уборка рабочего места и утилизация упаковки." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Профессиональная сборка обученным персоналом", "Бережное обращение с поверхностями", "Чистое рабочее место по завершении"],
            cta_title: "Заказать монтаж", cta_text: "Профессиональная сборка без компромиссов."
        },
        service_halteverbotszone: {
            meta_title: "Зона запрета парковки – официальное разрешение", meta_desc: "FLOXANT оформляет и устанавливает зоны запрета парковки.",
            badge: "Логистика", hero_title: "Зона запрета парковки", hero_desc: "Свободный подъезд – основа каждого успешного переезда.",
            intro_title: "Зоны запрета парковки – своевременно и законно",
            intro_p1: "Во многих городских районах установка официальной зоны запрета парковки необходима для бесперебойного переезда.",
            intro_p2: "FLOXANT берёт на себя весь процесс: заявление, установка знаков и демонтаж после переезда.",
            for_whom_title: "Для кого эта услуга?", for_whom_items: ["Переезды в центре города без частной парковки", "Коммерческие переезды с крупногабаритным транспортом", "Любой переезд, требующий гарантированного подъезда"],
            process_title: "Наш процесс", process_steps: [
                { title: "Заявление", desc: "Подача в дорожное ведомство с полным пакетом документов." },
                { title: "Одобрение", desc: "Контроль и подтверждение разрешения." },
                { title: "Установка", desc: "Размещение знаков с соблюдением сроков." },
                { title: "Демонтаж", desc: "Снятие знаков после завершения переезда." }
            ],
            guarantees_title: "Наши гарантии", guarantees: ["Полное официальное оформление", "Своевременная установка знаков", "Полный сервис без усилий с вашей стороны"],
            cta_title: "Оформить зону запрета парковки", cta_text: "Обеспечьте свободный подъезд в день переезда."
        },
        reinigung_regensburg: {
            meta_title: "Уборка Регенсбург – профессиональная финальная уборка", meta_desc: "FLOXANT предлагает профессиональную финальную уборку в Регенсбурге.",
            badge: "Регенсбург", hero_title_prefix: "Профессиональная уборка в", hero_title_highlight: "Регенсбурге",
            hero_desc: "Регенсбург – наш операционный центр. Здесь мы знаем стандарты местных управляющих компаний.",
            intro_title: "Финальная уборка в Регенсбурге – наша основная территория",
            intro_p1: "Как операционная база FLOXANT, Регенсбург является центром наших клининговых услуг.",
            intro_p2: "Наша финальная уборка следует документированному процессу с чек-листом и фотодокументацией.",
            services_title: "Наши клининговые услуги в Регенсбурге",
            services: {
                end_cleaning: { title: "Финальная уборка", desc: "Полная уборка по стандартам арендодателя." },
                construction_cleaning: { title: "Послестроительная уборка", desc: "Профессиональная уборка после ремонта." },
                office_cleaning: { title: "Офисная уборка", desc: "Регулярная или разовая уборка коммерческих помещений." }
            },
            cta_title: "Запросить уборку в Регенсбурге", cta_text: "Запишитесь на профессиональную уборку в Регенсбурге."
        },
        entruempelung_regensburg: {
            meta_title: "Расчистка Регенсбург – профессиональная вычистка", meta_desc: "FLOXANT профессионально расчищает объекты в Регенсбурге.",
            badge: "Регенсбург", hero_title_prefix: "Расчистка в", hero_title_highlight: "Регенсбурге",
            hero_desc: "Отпустить – это процесс. В Регенсбурге мы сопровождаем его с уважением и профессионализмом.",
            intro_title: "Расчистка в Регенсбурге – на месте и лично",
            intro_p1: "Регенсбург – наш операционный центр, и именно здесь мы наиболее сильны.",
            intro_p2: "Наша команда профессионально сортирует на месте и экологично утилизирует.",
            services_title: "Наши услуги расчистки в Регенсбурге",
            services: {
                household: { title: "Расформирование домохозяйства", desc: "Полная расчистка жилых помещений." },
                commercial: { title: "Коммерческая расчистка", desc: "Профессиональная расчистка офисов и складов." },
                partial: { title: "Частичная расчистка", desc: "Целевая расчистка отдельных комнат или зон." }
            },
            cta_title: "Запросить расчистку в Регенсбурге", cta_text: "Свяжитесь с нами для конфиденциальной консультации."
        },
        buero_umzug_regensburg: {
            meta_title: "Офисный переезд Регенсбург", meta_desc: "FLOXANT организует офисные переезды в Регенсбурге.",
            badge: "Регенсбург", hero_title_prefix: "Офисный переезд в", hero_title_highlight: "Регенсбурге",
            hero_desc: "Непрерывность бизнеса – приоритет. Мы перевозим ваш офис в Регенсбурге системно и деликатно.",
            intro_title: "Офисные переезды в Регенсбурге – наша основная территория",
            intro_p1: "Регенсбург стабильно растёт как бизнес-локация. FLOXANT обладает необходимой местной экспертизой.",
            intro_p2: "Мы координируем ваш офисный переезд так, чтобы команда могла продуктивно работать на следующий же день.",
            services_title: "Наши услуги офисного переезда",
            services: {
                full_move: { title: "Полный переезд", desc: "Полный переезд всех офисных блоков и ИТ-инфраструктуры." },
                it_relocation: { title: "ИТ-переезд", desc: "Профессиональное отключение и переподключение серверов и сетей." },
                weekend_move: { title: "Переезд в выходные", desc: "Выполнение вне рабочих часов для нулевого простоя." }
            },
            cta_title: "Спланируйте офисный переезд в Регенсбурге", cta_text: "Давайте спланируем ваш офисный переезд вместе."
        },
        sig_ritual_exit: {
            meta_title: "Ритуальная коробка прощания", meta_desc: "Ритуальная коробка прощания FLOXANT сопровождает вас через осознанное прощание.", badge: "Signature Опыт", hero_title: "Ритуальная коробка прощания", hero_desc: "Покинуть дом – значит закрыть главу. Ритуальная коробка придаёт этому моменту пространство.",
            story_title: "Почему прощание заслуживает ритуала", story_p1: "Каждый дом несёт в себе воспоминания. Ритуальная коробка прощания – наш ответ на переход, который слишком часто остаётся без внимания.", story_p2: "В коробке вы найдёте маленькую церемонию: свечу, рукописный гид и конверт для последнего письма.",
            purpose_title: "Психологическая ценность", purpose_text: "Осознанные переходы снижают эмоциональный стресс переезда.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для тех, кто не просто покидает дом, а хочет попрощаться.", cta_title: "Добавить ритуальную коробку", cta_text: "Дополните ваш переезд ритуальной коробкой прощания."
        },
        sig_clean_start: {
            meta_title: "Церемония чистого старта", meta_desc: "Церемония чистого старта FLOXANT подготовит вашу новую квартиру.", badge: "Signature Опыт", hero_title: "Церемония чистого старта", hero_desc: "Прежде чем расставить мебель, мы подготовим ваше новое пространство.",
            story_title: "Новое начало начинается с чистоты", story_p1: "Новый дом должен ощущаться вашим с первой секунды.", story_p2: "Мы не просто чистим поверхности – мы создаём атмосферу.",
            purpose_title: "Психологическая ценность", purpose_text: "Чистое, подготовленное пространство сигнализирует: здесь начинается что-то новое.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для въезда в существующие объекты или после ремонта.", cta_title: "Забронировать чистый старт", cta_text: "Подготовьте ваш въезд."
        },
        sig_neighbour_kit: {
            meta_title: "Набор нового соседа", meta_desc: "Набор нового соседа FLOXANT облегчит ваше появление.", badge: "Signature Опыт", hero_title: "Набор нового соседа", hero_desc: "Первое впечатление важно – включая соседей.",
            story_title: "Прибытие начинается с общения", story_p1: "В новой среде человек чувствует себя чужим. Набор нового соседа элегантно сокращает дистанцию.", story_p2: "Мы подготовим набор и доставим в день въезда.",
            purpose_title: "Социальная ценность", purpose_text: "Добрососедские отношения начинаются с первого дня.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для семей, пар или одиноких людей, въезжающих в многоквартирный дом.", cta_title: "Запросить набор нового соседа", cta_text: "Дополните ваш переезд набором нового соседа."
        },
        sig_first_48h: {
            meta_title: "Пакет первых 48 часов", meta_desc: "Пакет первых 48 часов FLOXANT обеспечит всё необходимое.", badge: "Signature Опыт", hero_title: "Пакет первых 48 часов", hero_desc: "Первые часы в новом доме решающие.",
            story_title: "Критические первые 48 часов", story_p1: "После переезда домохозяйство в состоянии аварии. Пакет содержит всё необходимое.", story_p2: "Пакет готов, когда вы входите в новый дом.",
            purpose_title: "Практическая ценность", purpose_text: "Первые 48 часов определяют эмоциональную оценку переезда.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для всех, кто хочет быть сразу функциональным после переезда.", cta_title: "Забронировать пакет 48 часов", cta_text: "Начните спокойно в новом доме."
        },
        sig_bureaucracy: {
            meta_title: "Бюрократический щит", meta_desc: "Бюрократический щит FLOXANT берёт на себя формальности.", badge: "Signature Опыт", hero_title: "Бюрократический щит", hero_desc: "Визиты в ведомства и формальности – часть каждого переезда. Мы снимаем эту нагрузку с вас.",
            story_title: "Бюрократия не должна быть вашей заботой", story_p1: "Переезд приносит волну формальностей. Бюрократический щит объединяет все задачи.", story_p2: "Наша команда знает процедуры в Регенсбурге и Баварии.",
            purpose_title: "Организационная ценность", purpose_text: "Бюрократия – один из главных стрессовых факторов при переезде.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для частных лиц и компаний, желающих сосредоточиться на переезде.", cta_title: "Запросить бюрократический щит", cta_text: "Делегируйте формальности."
        },
        sig_furniture_opt: {
            meta_title: "Оптимизация мебели", meta_desc: "Оптимизация мебели FLOXANT поможет идеально расставить мебель.", badge: "Signature Опыт", hero_title: "Оптимизация мебели", hero_desc: "Расставить, а не просто поставить. Мы оптимизируем расстановку для нового пространства.",
            story_title: "Ваше пространство, переосмысленное", story_p1: "Старая мебель в новых комнатах – не всегда подходит сразу.", story_p2: "Наша команда реализует оптимизацию прямо в день переезда.",
            purpose_title: "Дизайнерская ценность", purpose_text: "Продуманная расстановка повышает качество жизни.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для тех, кто перевозит мебель в помещение другой планировки.", cta_title: "Запросить оптимизацию мебели", cta_text: "Позвольте профессионально обустроить ваше новое пространство."
        },
        sig_cleaning_guarantee: {
            meta_title: "Гарантия уборки", meta_desc: "Гарантия уборки FLOXANT обеспечивает безупречную передачу.", badge: "Signature Опыт", hero_title: "Гарантия уборки", hero_desc: "Безупречная передача – гарантирована. При претензиях арендодателя мы проводим повторную уборку бесплатно.",
            story_title: "Уверенность при передаче", story_p1: "Передача объекта – часто самый стрессовый момент после переезда.", story_p2: "При обоснованных претензиях в течение 14 дней мы бесплатно исправляем.",
            purpose_title: "Финансовая ценность", purpose_text: "Гарантия уборки защищает ваш залог.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для всех арендаторов, желающих спокойной передачи.", cta_title: "Добавить гарантию уборки", cta_text: "Обезопасьте вашу передачу."
        },
        sig_storage_rot: {
            meta_title: "Ротация склада", meta_desc: "Ротация склада FLOXANT – безопасное временное хранение.", badge: "Signature Опыт", hero_title: "Ротация склада", hero_desc: "Не всё нужно перевозить одновременно. Ротация склада даёт временную гибкость.",
            story_title: "Временное хранение как стратегический инструмент", story_p1: "Иногда сроки не совпадают. Ротация склада решает эту проблему.", story_p2: "Ваши вещи хранятся безопасно в партнёрском помещении в Регенсбурге.",
            purpose_title: "Логистическая ценность", purpose_text: "Гибкость в сроках снижает давление.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для тех, чьи даты переезда не синхронизированы.", cta_title: "Запросить ротацию склада", cta_text: "Обеспечьте гибкое временное хранение."
        },
        sig_kids_box: {
            meta_title: "Детская коробка переезда", meta_desc: "Детская коробка переезда FLOXANT превращает переезд в приключение.", badge: "Signature Опыт", hero_title: "Детская коробка переезда", hero_desc: "Дети воспринимают переезд иначе. Наша коробка превращает его в позитивный опыт.",
            story_title: "Переезд глазами ребёнка", story_p1: "Для детей переезд означает неопределённость. Детская коробка сопровождает этот процесс.", story_p2: "Коробку вручают до дня переезда.",
            purpose_title: "Педагогическая ценность", purpose_text: "Дети, активно включённые в процесс, лучше справляются с переменами.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для семей с детьми от 3 до 12 лет.", cta_title: "Заказать детскую коробку", cta_text: "Сделайте переезд позитивным для ваших детей."
        },
        sig_service_24h: {
            meta_title: "Переезд 24 часа", meta_desc: "FLOXANT 24-часовой сервис для срочных переездов.", badge: "Signature Опыт", hero_title: "Переезд 24 часа", hero_desc: "Иногда переезд не может ждать. Наш сервис готов в любое время.",
            story_title: "Доступность как обещание", story_p1: "Не каждый переезд вписывается в рабочие часы. Сервис 24 часа гарантирует доступность вечером, ночью и в выходные.", story_p2: "Наша дежурная команда готова в кратчайшие сроки.",
            purpose_title: "Временная ценность", purpose_text: "Нехватка времени – один из главных стрессовых факторов.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для срочных переездов или тех, кто может переезжать только в нерабочее время.", cta_title: "Запросить сервис 24 часа", cta_text: "Свяжитесь с нами в любое время."
        },
        sig_ladies_team: {
            meta_title: "Женская команда", meta_desc: "Женская команда FLOXANT – переезд исключительно с женским персоналом.", badge: "Signature Опыт", hero_title: "Женская команда", hero_desc: "Некоторые ситуации требуют особой деликатности. Наша женская команда – переезд исключительно с женским персоналом.",
            story_title: "Уважение начинается с понимания", story_p1: "Есть ситуации, когда клиентки чувствуют себя комфортнее с полностью женской командой.", story_p2: "Наша женская команда работает с той же профессиональностью и эффективностью.",
            purpose_title: "Личная ценность", purpose_text: "Женская команда создаёт защищённую среду для переезда.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для клиенток, предпочитающих женскую команду по личным, культурным или религиозным причинам.", cta_title: "Запросить женскую команду", cta_text: "Забронируйте переезд с женской командой. Деликатно и без доплат."
        },
        sig_memory_capsule: {
            meta_title: "Капсула памяти", meta_desc: "Капсула памяти FLOXANT сохраняет момент из старого дома.", badge: "Signature Опыт", hero_title: "Капсула памяти", hero_desc: "Некоторые места заслуживают того, чтобы их помнили. Капсула памяти запечатлевает момент – навсегда.",
            story_title: "Место, застывшее во времени", story_p1: "Перед последней коробкой мы делаем паузу. Капсула содержит фотографии, заметку и маленький предмет.", story_p2: "Эта капсула не предназначена для немедленного открытия. Это якорь – физический объект, запечатлевший место во времени.",
            purpose_title: "Эмоциональная ценность", purpose_text: "Воспоминания со временем тускнеют. Капсула сохраняет определённый момент.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для тех, кто покидает место, значившее для них очень много.", cta_title: "Добавить капсулу памяти", cta_text: "Сохраните момент из вашего старого дома."
        },
        sig_maybe_box: {
            meta_title: "Коробка «Может быть»", meta_desc: "Коробка «Может быть» FLOXANT даёт время для неопределённых решений.", badge: "Signature Опыт", hero_title: "Коробка «Может быть»", hero_desc: "Не каждое решение нужно принимать немедленно. Коробка «Может быть» даёт время для трудных вопросов.",
            story_title: "Снижение давления решений", story_p1: "При переезде одновременно требуется бесчисленное количество решений. Коробка «Может быть» создана для этих случаев.", story_p2: "Мы храним вещи, в которых вы не уверены, до 90 дней.",
            purpose_title: "Ценность решений", purpose_text: "Перегрузка решениями ведёт к сожалениям.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для тех, кому сложно сразу расстаться с определёнными вещами.", cta_title: "Запросить коробку «Может быть»", cta_text: "Дайте себе время для трудных решений."
        },
        sig_key_handover: {
            meta_title: "Передача ключей", meta_desc: "Передача ключей FLOXANT документирует передачу объекта безопасно.", badge: "Signature Опыт", hero_title: "Передача ключей", hero_desc: "Задокументировано. Безопасно. Прослеживаемо.",
            story_title: "Последний шаг, правильно задокументированный", story_p1: "Передача ключей – официальное завершение главы. Сервис создаёт профессиональный протокол.", story_p2: "Вы получаете полный комплект документов, служащий доказательством.",
            purpose_title: "Юридическая ценность", purpose_text: "Задокументированная передача защищает обе стороны.", for_whom_title: "Для кого этот опыт?", for_whom_text: "Для всех арендаторов и арендодателей, ценящих юридически безопасную передачу.", cta_title: "Забронировать передачу ключей", cta_text: "Задокументируйте передачу объекта профессионально."
        }
    }
});

console.log('Russian done.');
