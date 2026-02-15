const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', 'dictionaries');
const en = JSON.parse(fs.readFileSync(path.join(D, 'en.json'), 'utf8'));
function c(o) { return JSON.parse(JSON.stringify(o)) }

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

function gen(l, a, p) {
    const f = path.join(D, `${l}.json`);
    let e = {};
    try { e = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (err) { }

    // Merge EN structure with existing translations
    const merged = enforceStructure(en, e);

    merged.area = { ...merged.area, ...a };
    merged.pages = p;

    fs.writeFileSync(f, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`${l}.json: ${fs.readFileSync(f, 'utf8').split('\n').length} lines`);
}

function apply(L) {
    const p = c(en.pages), m = p.umzug_muenchen;
    m.hero_title_prefix = L.mi; m.hero_title_highlight = L.mu; m.hero_desc = L.mh; m.badge = L.mb; m.intro_title = L.mit; m.intro_text_1 = L.mi1; m.intro_text_2 = L.mi2;
    m.transparency_title = L.tt; m.transparency_text = L.tx; m.portfolio_title = L.pt;
    m.services.city.title = L.cm; m.services.city.desc = L.cd; m.services.remote.title = L.rm; m.services.remote.desc = L.rd;
    m.services.clearance.title = L.cl; m.services.clearance.desc = L.cld;
    m.details_title = L.dt; m.details_text = L.dtx; m.remote_title = L.lt; m.remote_text = L.ltx;
    m.pricing_title = L.prt; m.pricing_text = L.prx; m.features.inspection = L.fi; m.features.insurance = L.fis; m.features.staff = L.fs;
    m.links_title = L.ln; m.cta_title = L.mct; m.cta_text = L.mcx;
    const svcs = [['service_umzug', 'u'], ['service_buero_umzug', 'b'], ['service_fernumzug', 'f'], ['service_reinigung', 'r'], ['service_entruempelung', 'e'], ['service_montage', 'm'], ['service_halteverbotszone', 'h']];
    for (const [k, x] of svcs) { const s = p[k]; s.meta_title = L[x + 'mt']; s.meta_desc = L[x + 'md']; s.badge = L[x + 'bg'] || L.cb; s.hero_title = L[x + 'ht']; s.hero_desc = L[x + 'hd']; s.intro_title = L[x + 'it']; s.intro_p1 = L[x + 'p1']; s.intro_p2 = L[x + 'p2']; s.for_whom_title = L.fw; s.for_whom_items = L[x + 'fi']; s.process_title = L.pr; s.process_steps = L[x + 'ps']; s.guarantees_title = L.gt; s.guarantees = L[x + 'gu']; s.cta_title = L[x + 'ct']; s.cta_text = L[x + 'cx'] }
    const rr = p.reinigung_regensburg; rr.meta_title = L.rrmt; rr.meta_desc = L.rrmd; rr.badge = "Regensburg"; rr.hero_title_prefix = L.rrhp; rr.hero_title_highlight = "Regensburg"; rr.hero_desc = L.rrhd; rr.intro_title = L.rrit; rr.intro_p1 = L.rrp1; rr.intro_p2 = L.rrp2; rr.services_title = L.rrst; rr.services.end_cleaning = { title: L.rrec, desc: L.rred }; rr.services.construction_cleaning = { title: L.rrcc, desc: L.rrcd }; rr.services.office_cleaning = { title: L.rroc, desc: L.rrod }; rr.cta_title = L.rrct; rr.cta_text = L.rrcx;
    const er = p.entruempelung_regensburg; er.meta_title = L.ermt; er.meta_desc = L.ermd; er.badge = "Regensburg"; er.hero_title_prefix = L.erhp; er.hero_title_highlight = "Regensburg"; er.hero_desc = L.erhd; er.intro_title = L.erit; er.intro_p1 = L.erp1; er.intro_p2 = L.erp2; er.services_title = L.erst; er.services.household = { title: L.erhh, desc: L.erhhd }; er.services.commercial = { title: L.erco, desc: L.ercod }; er.services.partial = { title: L.erpa, desc: L.erpad }; er.cta_title = L.erct; er.cta_text = L.ercx;
    const br = p.buero_umzug_regensburg; br.meta_title = L.brmt; br.meta_desc = L.brmd; br.badge = "Regensburg"; br.hero_title_prefix = L.brhp; br.hero_title_highlight = "Regensburg"; br.hero_desc = L.brhd; br.intro_title = L.brit; br.intro_p1 = L.brp1; br.intro_p2 = L.brp2; br.services_title = L.brst; br.services.full_move = { title: L.brfm, desc: L.brfd }; br.services.it_relocation = { title: L.brir, desc: L.brid }; br.services.weekend_move = { title: L.brwm, desc: L.brwd }; br.cta_title = L.brct; br.cta_text = L.brcx;
    const sk = ['sig_ritual_exit', 'sig_clean_start', 'sig_neighbour_kit', 'sig_first_48h', 'sig_bureaucracy', 'sig_furniture_opt', 'sig_cleaning_guarantee', 'sig_storage_rot', 'sig_kids_box', 'sig_service_24h', 'sig_ladies_team', 'sig_memory_capsule', 'sig_maybe_box', 'sig_key_handover'];
    for (const k of sk) { const s = p[k], t = L.sg[k]; if (t) { s.badge = L.sb; s.hero_title = t.h; s.hero_desc = t.d; if (t.pl) s.purpose_title = t.pl; if (t.c) s.cta_title = t.c; s.for_whom_title = L.fws || L.fw } }
    return p;
}

// ===== FARSI =====
gen('fa', { title: "مناطق خدمات", hub_note: "دفتر مرکزی FLOXANT در دوسلدورف است. مرکز عملیاتی ما در رگنسبورگ و اوبرپفالتس قرار دارد.", description: "دفتر مرکزی در دوسلدورف. مرکز عملیاتی در رگنسبورگ.", cities: { regensburg: "رگنسبورگ", bavaria: "باواریا", munich: "مونیخ", nuremberg: "نورنبرگ", augsburg: "آگسبورگ", germany: "سراسر آلمان" } },
    apply({
        mi: "اسباب‌کشی شما در", mu: "مونیخ", mh: "بدون استرس به پایتخت باواریا. FLOXANT خدمات ممتاز با تضمین قیمت ثابت ارائه می‌دهد.", mb: "مونیخ و حومه", mit: "اسباب‌کشی در مونیخ – با برنامه و دقت", mi1: "مونیخ یک کلان‌شهر پویا است. اسباب‌کشی در پایتخت باواریا اغلب چالشی لجستیکی است. پله‌های تنگ، کمبود پارکینگ – شرایط نیازمند تجربه است.", mi2: "FLOXANT سرویس اسباب‌کشی است که این چالش‌ها را مدیریت می‌کند. ما فقط شروع نمی‌کنیم – دقیقاً برنامه‌ریزی می‌کنیم.",
        tt: "شفافیت درباره دفتر مرکزی", tx: "دفتر قانونی FLOXANT در دوسلدورف است. تیم ما مرتباً در مونیخ کار می‌کند.", pt: "پورتفولیوی ما برای مونیخ", cm: "اسباب‌کشی شهری مونیخ", cd: "سریع و کارآمد در شهر.", rm: "اسباب‌کشی بین‌شهری", rd: "از ایزار تا راین.", cl: "تخلیه", cld: "حذف حرفه‌ای مبلمان قدیمی.", dt: "ویژگی‌های مونیخ", dtx: "هر شهر ویژگی‌های خود را دارد.", lt: "از باواریا به سراسر آلمان", ltx: "بسیاری از مشتریان از مونیخ نقل مکان می‌کنند.", prt: "قیمت‌های شفاف بدون سورپرایز", prx: "مونیخ به اندازه کافی گران است. ما بر شفافیت کامل تکیه می‌کنیم.", fi: "بازرسی رایگان: ارزیابی قبلی از طریق تماس ویدیویی.", fis: "بیمه شامل: مبلمان شما کاملاً تحت پوشش است.", fs: "کارکنان واجد شرایط: باتجربه و دقیق.", ln: "مکان‌های دیگر", mct: "پیشنهاد شما برای مونیخ", mcx: "درخواست خود را شروع کنید.",
        cb: "خدمات پایه", fw: "این خدمات برای چه کسی است؟", pr: "فرآیند ما", gt: "تضمین‌های ما",
        umt: "اسباب‌کشی خصوصی", umd: "FLOXANT اسباب‌کشی خصوصی شما را همراهی می‌کند.", uht: "اسباب‌کشی خصوصی", uhd: "اسباب‌کشی بیش از حمل‌ونقل است. یک گذار است.", uit: "اسباب‌کشی شما – تا آخرین جزئیات", up1: "اسباب‌کشی خصوصی همه جنبه‌های زندگی را لمس می‌کند.", up2: "تیم ما با فرآیندی شفاف کار می‌کند.", ufi: ["افراد و خانواده‌ها", "اسباب‌کشی مسکونی", "اشیای ارزشمند"], ups: [{ title: "ارزیابی", desc: "بازرسی رایگان." }, { title: "قیمت ثابت", desc: "پیشنهاد شفاف." }, { title: "اجرا", desc: "بسته‌بندی حرفه‌ای." }, { title: "تحویل", desc: "نصب و نظافت." }], ugu: ["تضمین قیمت ثابت", "بیمه کامل", "کارکنان واجد شرایط"], uct: "ارسال درخواست", ucx: "از پیشنهاد شخصی شروع کنید.",
        bmt: "اسباب‌کشی دفتر", bmd: "FLOXANT اسباب‌کشی دفتر شما را سازماندهی می‌کند.", bbg: "تجاری", bht: "اسباب‌کشی دفتر", bhd: "تداوم کسب‌وکار نیاز به برنامه‌ریزی دارد.", bit: "اسباب‌کشی شرکتی با دقت", bp1: "اسباب‌کشی دفتر در فرآیندهای فعال دخالت می‌کند.", bp2: "ما همه کارها را هماهنگ می‌کنیم.", bfi: ["شرکت‌ها", "دفاتر حقوقی", "شرکت‌هایی که توقف را به حداقل می‌رسانند"], bps: [{ title: "برنامه‌ریزی", desc: "تحلیل دقیق." }, { title: "هماهنگی", desc: "ارتباط با IT." }, { title: "اجرا", desc: "در بازه‌های زمانی مشخص." }, { title: "راه‌اندازی", desc: "پیکربندی ایستگاه‌ها." }], bgu: ["بازه‌های زمانی تضمینی", "بیمه IT", "پردازش محرمانه"], bct: "برنامه‌ریزی اسباب‌کشی", bcx: "بیایید ساختار دهیم.",
        fmt: "اسباب‌کشی بین‌شهری", fmd: "FLOXANT اسباب‌کشی بین‌شهری را سازماندهی می‌کند.", fbg: "بین‌شهری", fht: "اسباب‌کشی بین‌شهری", fhd: "فاصله مانع نیست.", fit: "بین‌شهری با دقت", fp1: "اسباب‌کشی بین‌شهری نیاز به برنامه‌ریزی خاص دارد.", fp2: "از رگنسبورگ تا هامبورگ.", ffi: ["تغییر شغل", "خانواده‌ها", "انتقال کارکنان"], fps: [{ title: "مسیر", desc: "مسیر بهینه." }, { title: "بسته‌بندی", desc: "مواد ویژه." }, { title: "حمل", desc: "ردیابی GPS." }, { title: "تحویل", desc: "تحویل به‌موقع." }], fgu: ["قیمت ثابت", "بیمه کامل", "تحویل تضمینی"], fct: "درخواست اسباب‌کشی", fcx: "کجا می‌خواهید بروید؟",
        rmt: "نظافت حرفه‌ای", rmd: "FLOXANT نظافت نهایی حرفه‌ای ارائه می‌دهد.", rbg: "نظافت", rht: "نظافت", rhd: "پاکیزگی پایه یک پایان منظم است.", rit: "نظافت نهایی سیستماتیک", rp1: "نظافت نهایی برای بازگشت ودیعه تعیین‌کننده است.", rp2: "تیم ما دقیق و سریع کار می‌کند.", rfi: ["مستاجران", "مالکان", "فضاهای تجاری"], rps: [{ title: "بازرسی", desc: "ارزیابی." }, { title: "اجرا", desc: "نظافت سیستماتیک." }, { title: "کنترل", desc: "مستندسازی عکس." }, { title: "تحویل", desc: "تحویل تمیز." }], rgu: ["استانداردهای مالک", "مستندسازی عکس", "نظافت مجدد"], rct: "سفارش نظافت", rcx: "نظافت حرفه‌ای.",
        emt: "تخلیه حرفه‌ای", emd: "FLOXANT املاک را حرفه‌ای تخلیه می‌کند.", ebg: "حذف", eht: "تخلیه", ehd: "رها کردن نیاز به اعتماد دارد.", eit: "تخلیه با مسئولیت", ep1: "تخلیه بیش از حذف اشیا است.", ep2: "مرتب‌سازی حرفه‌ای و حذف زیست‌محیطی.", efi: ["تسویه منازل", "تخلیه تجاری", "افراد خصوصی"], eps: [{ title: "بازدید", desc: "فهرست مشترک." }, { title: "تخلیه", desc: "سیستماتیک." }, { title: "حذف", desc: "مرتب‌سازی حرفه‌ای." }, { title: "وضعیت نهایی", desc: "تحویل تمیز." }], egu: ["حذف زیست‌محیطی", "پردازش محرمانه", "تحویل تمیز"], ect: "درخواست تخلیه", ecx: "با ما تماس بگیرید.",
        mmt: "نصب حرفه‌ای", mmd: "FLOXANT مبلمان و آشپزخانه نصب می‌کند.", mbg: "نصب", mht: "نصب", mhd: "دقت در جزئیات.", mmit: "نصب با تخصص", mp1: "مبلمان باکیفیت شایسته نصب حرفه‌ای است.", mp2: "از قفسه‌های IKEA تا آشپزخانه‌های طراح.", mfi: ["پس از اسباب‌کشی", "مشتریان تجاری", "نصب آشپزخانه"], mps: [{ title: "آماده‌سازی", desc: "بررسی دستورالعمل‌ها." }, { title: "نصب", desc: "نصب حرفه‌ای." }, { title: "تست", desc: "تست قطعات متحرک." }, { title: "کنترل", desc: "نظافت محل کار." }], mgu: ["نصب حرفه‌ای", "مراقبت از سطوح", "محل کار تمیز"], mct: "سفارش نصب", mcx: "نصب حرفه‌ای.",
        hmt: "منطقه ممنوعیت پارک", hmd: "FLOXANT مناطق ممنوعیت را مدیریت می‌کند.", hbg: "لجستیک", hht: "منطقه ممنوعیت پارک", hhd: "دسترسی آزاد – پایه هر اسباب‌کشی.", hit: "مناطق – به‌موقع و قانونی", hp1: "در بسیاری از مناطق شهری منطقه رسمی لازم است.", hp2: "FLOXANT کل فرآیند را بر عهده می‌گیرد.", hfi: ["اسباب‌کشی مرکز شهر", "تجاری", "هر اسباب‌کشی"], hps: [{ title: "درخواست", desc: "ارائه." }, { title: "تایید", desc: "تایید." }, { title: "نصب", desc: "علائم." }, { title: "برچیدن", desc: "حذف علائم." }], hgu: ["پردازش رسمی کامل", "نصب به‌موقع", "خدمات کامل"], hct: "درخواست منطقه", hcx: "دسترسی آزاد تضمین کنید.",
        rrmt: "نظافت رگنسبورگ", rrmd: "نظافت حرفه‌ای در رگنسبورگ.", rrhp: "نظافت حرفه‌ای در", rrhd: "مرکز عملیاتی ما.", rrit: "نظافت نهایی در رگنسبورگ", rrp1: "پایگاه عملیاتی.", rrp2: "فرآیند مستند.", rrst: "خدمات نظافت", rrec: "نظافت نهایی", rred: "کامل.", rrcc: "نظافت پس از ساخت", rrcd: "پس از بازسازی.", rroc: "نظافت دفتر", rrod: "منظم یا یکباره.", rrct: "درخواست در رگنسبورگ", rrcx: "رزرو کنید.",
        ermt: "تخلیه رگنسبورگ", ermd: "FLOXANT در رگنسبورگ تخلیه می‌کند.", erhp: "تخلیه در", erhd: "رها کردن فرآیندی است.", erit: "تخلیه در رگنسبورگ", erp1: "مرکز عملیاتی.", erp2: "مرتب‌سازی در محل.", erst: "خدمات تخلیه", erhh: "تسویه", erhhd: "تخلیه کامل.", erco: "تخلیه تجاری", ercod: "دفاتر و انبارها.", erpa: "تخلیه جزئی", erpad: "اتاق‌های انتخابی.", erct: "درخواست تخلیه", ercx: "تماس بگیرید.",
        brmt: "اسباب‌کشی دفتر رگنسبورگ", brmd: "FLOXANT سازماندهی می‌کند.", brhp: "اسباب‌کشی دفتر در", brhd: "تداوم کسب‌وکار.", brit: "اسباب‌کشی دفتر در رگنسبورگ", brp1: "رگنسبورگ در حال رشد.", brp2: "ما هماهنگ می‌کنیم.", brst: "خدمات اسباب‌کشی", brfm: "اسباب‌کشی کامل", brfd: "دفتر و IT.", brir: "جابجایی IT", brid: "قطع اتصال حرفه‌ای.", brwm: "اسباب‌کشی آخر هفته", brwd: "خارج از ساعات کاری.", brct: "برنامه‌ریزی", brcx: "بیایید برنامه‌ریزی کنیم.",
        sb: "تجربه Signature", fws: "این تجربه برای چه کسی است؟",
        sg: {
            sig_ritual_exit: { h: "جعبه آیین خداحافظی", d: "ترک خانه یعنی بستن یک فصل.", pl: "ارزش روان‌شناختی", c: "افزودن جعبه آیین" },
            sig_clean_start: { h: "مراسم شروع تازه", d: "قبل از مبلمان، فضا را آماده می‌کنیم.", pl: "ارزش روان‌شناختی", c: "رزرو شروع تازه" },
            sig_neighbour_kit: { h: "کیت همسایه جدید", d: "اولین برداشت مهم است.", pl: "ارزش اجتماعی", c: "سفارش کیت" },
            sig_first_48h: { h: "بسته ۴۸ ساعت اول", d: "ساعات اول تعیین‌کننده‌اند.", pl: "ارزش عملی", c: "رزرو بسته" },
            sig_bureaucracy: { h: "سپر بوروکراسی", d: "تشریفات بخشی از هر اسباب‌کشی است.", pl: "ارزش سازمانی", c: "درخواست سپر" },
            sig_furniture_opt: { h: "بهینه‌سازی مبلمان", d: "چیدن، نه فقط گذاشتن.", pl: "ارزش طراحی", c: "درخواست بهینه‌سازی" },
            sig_cleaning_guarantee: { h: "تضمین نظافت", d: "تحویل تمیز – تضمینی.", pl: "ارزش مالی", c: "افزودن تضمین" },
            sig_storage_rot: { h: "چرخش انبار", d: "همه چیز لازم نیست یکجا جابجا شود.", pl: "ارزش لجستیکی", c: "درخواست چرخش" },
            sig_kids_box: { h: "جعبه اسباب‌کشی کودک", d: "کودکان اسباب‌کشی را متفاوت تجربه می‌کنند.", pl: "ارزش آموزشی", c: "سفارش جعبه کودک" },
            sig_service_24h: { h: "سرویس ۲۴ ساعته", d: "گاهی اسباب‌کشی نمی‌تواند صبر کند.", pl: "ارزش زمانی", c: "درخواست سرویس ۲۴ ساعته" },
            sig_ladies_team: { h: "تیم بانوان", d: "برخی شرایط حساسیت ویژه می‌خواهد.", pl: "ارزش شخصی", c: "درخواست تیم بانوان" },
            sig_memory_capsule: { h: "کپسول خاطره", d: "برخی مکان‌ها شایسته یادآوری هستند.", pl: "ارزش احساسی", c: "افزودن کپسول" },
            sig_maybe_box: { h: "جعبه شاید", d: "هر تصمیمی لازم نیست فوری باشد.", pl: "ارزش تصمیم‌گیری", c: "درخواست جعبه شاید" },
            sig_key_handover: { h: "تحویل کلید", d: "مستند. امن. قابل ردیابی.", pl: "ارزش حقوقی", c: "رزرو تحویل کلید" }
        }
    }));

console.log('Farsi done.');
