const fs = require('fs');
const path = require('path');
const DICT_DIR = path.join(__dirname, '..', 'dictionaries');

// Load EN as base template
const en = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));

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

function generateLocale(locale, trans) {
    const filePath = path.join(DICT_DIR, `${locale}.json`);
    let existing = {};
    try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) { }

    // Merge EN structure with existing translations
    const merged = enforceStructure(en, existing);

    if (trans.area) merged.area = { ...merged.area, ...trans.area };
    if (trans.pages) merged.pages = trans.pages;

    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`${locale}.json: ${fs.readFileSync(filePath, 'utf8').split('\n').length} lines`);
}

generateLocale('tr', {
    area: {
        title: "Hizmet Alanları",
        description: "FLOXANT'ın merkezi Düsseldorf'tadır. Operasyonel merkezimiz Regensburg ve Oberpfalz'dadır. Buradan Bavyera genelinde ve Almanya çapında uzun mesafe nakliye hizmeti sunuyoruz.",
        hub_note: "FLOXANT'ın merkezi Düsseldorf'tadır. Operasyonel merkezimiz Regensburg ve Oberpfalz'dadır. Buradan Bavyera genelinde ve Almanya çapında uzun mesafe nakliye hizmeti sunuyoruz.",
        cities: { regensburg: "Regensburg", bavaria: "Bavyera", munich: "Münih", nuremberg: "Nürnberg", augsburg: "Augsburg", germany: "Almanya geneli" }
    },
    pages: {
        umzug_muenchen: {
            hero_title_prefix: "Taşınmanız", hero_title_highlight: "Münih'te",
            hero_desc: "Bavyera başkentine stressiz taşınma veya Münih'ten dünyaya. FLOXANT sabit fiyat garantili premium nakliye hizmetleri sunar.",
            badge: "Münih ve Çevresi", intro_title: "Münih'te Taşınma – Plan ve Hassasiyetle",
            intro_text_1: "Münih, dünya genelinden insanları çeken canlı bir metropol. Ancak Bavyera başkentinde taşınma genellikle lojistik bir zorluk teşkil eder. Schwabing'de dar merdivenler, Glockenbachviertel'de park yeri bulamama veya konut komplekslerinde katı zaman aralıkları: koşullar deneyim ve iyi planlama gerektirir.",
            intro_text_2: "FLOXANT, tam da bu zorlukları ustaca aşan bir nakliye hizmeti temsil eder. Sadece işe başlamayız; taşınmanızı detaylı olarak planlarız.",
            transparency_title: "Merkez Hakkında Şeffaflık Notu",
            transparency_text: "FLOXANT'ın yasal merkezi Düsseldorf'tadır. Ancak ekibimiz Münih ve çevresinde düzenli olarak çalışmaktadır.",
            portfolio_title: "Münih İçin Hizmet Portföyümüz",
            services: {
                city: { title: "Münih Şehir İçi Taşıma", desc: "Şehir içinde hızlı ve verimli." },
                remote: { title: "Münih'ten Uzun Mesafe", desc: "Isar'dan Ren'e veya Spree'ye. Lojistik olarak optimize edilmiş." },
                clearance: { title: "Boşaltma", desc: "Münih'te daire tasfiyesinde eski eşyaların profesyonel bertarafı." }
            },
            details_title: "Münih Özel: Nelere Dikkat Edilmeli", details_text: "Her şehrin kendine has özellikleri vardır ve Münih istisna değildir.",
            remote_title: "Bavyera'dan Tüm Almanya'ya", remote_text: "Birçok müşterimiz profesyonel olarak Münih'ten diğer metropollere taşınır.",
            pricing_title: "Sürprizsiz Şeffaf Fiyatlar", pricing_text: "Münih zaten yeterince pahalı. FLOXANT'ta mutlak maliyet şeffaflığına güveniyoruz.",
            features: { inspection: "Ücretsiz Keşif: Taşınma eşyalarınızı video görüşme ile önceden inceliyoruz.", insurance: "Sigorta Dahil: Eşyalarınız güvende ve tam sigortalı.", staff: "Nitelikli Personel: Deneyimli, güler yüzlü ve özenli." },
            links_title: "Bölgedeki Diğer Lokasyonlar", cta_title: "Münih İçin Teklifiniz", cta_text: "Talebinizi şimdi başlatın."
        },
        service_umzug: {
            meta_title: "Özel Taşınma – Kişisel Taşınmanız", meta_desc: "FLOXANT özel taşınmanıza hassasiyet ve gizlilikle eşlik eder.",
            badge: "Temel Hizmet", hero_title: "Özel Taşınma", hero_desc: "Taşınma nakliyeden fazlasıdır. Bir geçiştir. FLOXANT bu sürece gizlilik, yöntem ve güvenilirlikle eşlik eder.",
            intro_title: "Taşınmanız – Son Detaya Kadar Düşünülmüş",
            intro_p1: "Özel bir taşınma hayatın her yönüne dokunur. Kişisel eşyalar, değerli anılar, hassas mobilyalar – her şey bireysel ilgi gerektirir.",
            intro_p2: "Ekibimiz her aşamada tam şeffaflık sağlayan net bir süreçle çalışır.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Özenli taşıma değer veren bireyler ve aileler", "Şehir içi veya bölgesel konut taşınmaları", "Değerli eşyalar için özel koruma gerektiren taşınmalar"],
            process_title: "Sürecimiz", process_steps: [
                { title: "Değerlendirme", desc: "Ücretsiz keşif – yerinde veya video görüşme ile." },
                { title: "Sabit Fiyat Teklifi", desc: "Gizli masraf olmadan şeffaf teklif." },
                { title: "Uygulama", desc: "Profesyonel paketleme, güvenli nakliye, zamanında teslimat." },
                { title: "Teslim", desc: "Montaj, yerleştirme ve eski konutun temizlenmesi." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Ek ücret olmadan sabit fiyat garantisi", "Tüm eşyalarınız için tam sigorta", "Nitelikli, profesyonel eğitimli personel"],
            cta_title: "Bağlayıcı Olmayan Talep Gönderin", cta_text: "Taşınmanıza kişisel bir teklifle başlayın."
        },
        service_buero_umzug: {
            meta_title: "Ofis Taşıma – Profesyonel İş Taşınması", meta_desc: "FLOXANT ofis taşınmanızı minimum kesinti ile organize eder.",
            badge: "Ticari", hero_title: "Ofis Taşıma", hero_desc: "İş sürekliliği planlama gerektirir. Şirketinizin yeni lokasyonda gecikmesiz tam işlevsel olmasını sağlıyoruz.",
            intro_title: "Kurumsal Taşınmalar Hassasiyetle",
            intro_p1: "Ofis taşınması aktif iş süreçlerine müdahale eder. BT altyapısı, hassas belgeler – her detay doğru olmalıdır.",
            intro_p2: "BT bağlantı kesiminden fiziksel nakle, yeniden kuruluma kadar tüm işleri koordine ediyoruz.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Aktif operasyonları olan her ölçekte işletme", "Hukuk büroları, muayenehaneler", "Kesinti süresini minimize etmesi gereken şirketler"],
            process_title: "Sürecimiz", process_steps: [
                { title: "Proje Planlaması", desc: "Ofis yapınızın detaylı analizi." },
                { title: "Koordinasyon", desc: "BT ekibiniz ve tesis yönetimi ile irtibat." },
                { title: "Uygulama", desc: "Tanımlı zaman dilimlerinde taşınma." },
                { title: "Devreye Alma", desc: "İş istasyonu kurulumu ve fonksiyon testi." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Uyum garantili tanımlı zaman dilimleri", "BT ekipmanı için sigorta kapsamı", "İş operasyonlarını kesintiye uğratmadan gizli işlem"],
            cta_title: "Ofis Taşınmanızı Planlayın", cta_text: "Kurumsal taşınmanızı birlikte yapılandıralım."
        },
        service_fernumzug: {
            meta_title: "Uzun Mesafe Taşıma – Almanya ve Avrupa Genelinde", meta_desc: "FLOXANT Bavyera'dan tüm Almanya'ya uzun mesafe taşınma organize eder.",
            badge: "Uzun Mesafe", hero_title: "Uzun Mesafe Taşıma", hero_desc: "Mesafe engel değildir. Regensburg, Bavyera ve tüm Almanya'yı taviz kabul etmeyen lojistikle birbirine bağlıyoruz.",
            intro_title: "Uzun Mesafe Hassasiyetle",
            intro_p1: "Uzun mesafe taşınma farklı kalitede planlama gerektirir. Daha uzun nakliye rotaları ve iki lokasyonda eşzamanlı koordinasyon.",
            intro_p2: "Regensburg'dan Hamburg'a, Münih'ten Berlin'e: ekibimiz rotaları planlar ve eşyalarınızın güvenle ulaşmasını sağlar.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Kariyer nedenli yer değiştirmeler", "Başka şehre taşınan aileler", "Çalışan transfer eden şirketler"],
            process_title: "Sürecimiz", process_steps: [
                { title: "Rota Planlaması", desc: "Trafik ve hava durumunu dikkate alan optimal rotalama." },
                { title: "Paketleme", desc: "Uzun mesafe nakliye için özel malzemelerle profesyonel paketleme." },
                { title: "Nakliye", desc: "Deneyimli sürücülerle GPS izlemeli nakliye." },
                { title: "Teslimat", desc: "Zamanında teslimat, montaj ve yeni lokasyonda yerleştirme." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Tüm mesafe için sabit fiyat teklifi", "Nakliye boyunca tam sigorta", "Tanımlı zaman dilimlerinde teslimat garantisi"],
            cta_title: "Uzun Mesafe Taşınma Talep Edin", cta_text: "Nereye gitmek istiyorsunuz? Kişiye özel teklifinizi alın."
        },
        service_reinigung: {
            meta_title: "Profesyonel Temizlik – Son Temizlik ve Teslim", meta_desc: "FLOXANT ev sahibi standartlarında profesyonel son temizlik sunar.",
            badge: "Temizlik", hero_title: "Temizlik", hero_desc: "Temizlik bir detay değildir – düzenli bir kapanış ve net bir yeni başlangıcın temelidir.",
            intro_title: "Sistemli Son Temizlik",
            intro_p1: "Son temizlik, sorunsuz depozito iadesi için belirleyici faktördür. FLOXANT tanımlı ev sahibi standartlarında çalışır.",
            intro_p2: "Temizlik ekibimiz titiz, hızlı ve mülkünüze saygılı çalışır.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Mülk teslimi öncesi kiracılar", "Satış veya yeniden kiralama öncesi mal sahipleri", "Kira sonu ticari tesisler"],
            process_title: "Sürecimiz", process_steps: [
                { title: "İnceleme", desc: "Durum değerlendirmesi ve temizlik kapsamının belirlenmesi." },
                { title: "Uygulama", desc: "Tüm odaların, zeminlerin, pencerelerin sistematik temizliği." },
                { title: "Kalite Kontrolü", desc: "Kontrol listesiyle kabul. Fotoğraf belgeleme." },
                { title: "Teslim", desc: "Ev sahibi veya sonraki kiracı için hazır teslim." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Ev sahibi standartlarında temizlik", "Fotoğraf belgeleme dahil", "Meşru şikayetler için yeniden temizlik"],
            cta_title: "Temizlik Sipariş Edin", cta_text: "Profesyonel son temizlik için talepta bulunun."
        },
        service_entruempelung: {
            meta_title: "Boşaltma – Profesyonel Temizleme ve Bertaraf", meta_desc: "FLOXANT konut ve ticari mülkleri profesyonelce boşaltır.",
            badge: "Bertaraf", hero_title: "Boşaltma", hero_desc: "Bırakmak güven gerektirir. Profesyonel, gizli ve çevresel sorumlulukla boşaltıyoruz.",
            intro_title: "Sorumlulukla Boşaltma",
            intro_p1: "Boşaltma nesneleri kaldırmaktan fazlasıdır. Arkasında genellikle duygusal kararlar vardır.",
            intro_p2: "Profesyonelce ayırıyor, çevreci şekilde bertaraf ediyor ve tertemiz alanlar bırakıyoruz.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Ev tasfiyesi ve miras temizliği", "İş kapanışında ticari boşaltma", "Birikmiş eşyalardan profesyonelce kurtulmak isteyenler"],
            process_title: "Sürecimiz", process_steps: [
                { title: "Tur", desc: "Ortak envanter. Neyin kalacağına siz karar verirsiniz." },
                { title: "Boşaltma", desc: "Eğitimli ekibimiz tarafından sistematik boşaltma." },
                { title: "Bertaraf", desc: "Yasal gerekliliklere uygun profesyonel ayırma ve bertaraf." },
                { title: "Son Durum", desc: "Mülkün tertemiz teslimi." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Belgeli çevre dostu bertaraf", "Hassas durumlarda gizli işlem", "Tertemiz teslim garantisi"],
            cta_title: "Boşaltma Talep Edin", cta_text: "Gizli danışma için bize ulaşın."
        },
        service_montage: {
            meta_title: "Montaj – Profesyonel Mobilya ve Mutfak Kurulumu", meta_desc: "FLOXANT mobilya ve mutfakları profesyonelce monte eder.",
            badge: "Montaj", hero_title: "Montaj", hero_desc: "Detayda hassasiyet. Mobilya ve mutfaklarınızın profesyonel montajı ve demontajı.",
            intro_title: "Uzmanlıkla Montaj",
            intro_p1: "Kaliteli mobilya ve mutfaklar profesyonel montajı hak eder.",
            intro_p2: "IKEA raflarından tasarım mutfaklara kadar – özenli, temiz ve saygılı çalışırız.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Taşınma veya yeni alım sonrası bireyler", "Ofis düzeni yapan ticari müşteriler", "Renovasyon sırasında mutfak kurulumu"],
            process_title: "Sürecimiz", process_steps: [
                { title: "Hazırlık", desc: "Montaj talimatları ve malzemelerin incelenmesi." },
                { title: "Montaj", desc: "Oda geometrisi ve kullanımı dikkate alınarak profesyonel kurulum." },
                { title: "Fonksiyon Testi", desc: "Hareketli parçaların ve çekmecelerin testi." },
                { title: "Son Kontrol", desc: "Çalışma alanının temizlenmesi ve ambalaj malzemesinin bertarafı." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Eğitimli personel tarafından profesyonel montaj", "Yüzeylere ve malzemelere özenli davranış", "Tamamlandığında temiz çalışma alanı"],
            cta_title: "Montaj Sipariş Edin", cta_text: "Taviz vermeden profesyonel montaj."
        },
        service_halteverbotszone: {
            meta_title: "Park Yasağı Bölgesi – Resmi İzin ve Kurulum", meta_desc: "FLOXANT park yasağı bölgeleri için başvuru yapar ve kurar.",
            badge: "Lojistik", hero_title: "Park Yasağı Bölgesi", hero_desc: "Engelsiz erişim, sorunsuz taşınmanın temelidir. Resmi izin sürecini sizin için üstleniyoruz.",
            intro_title: "Park Yasağı Bölgeleri – Zamanında ve Yasal",
            intro_p1: "Birçok kentsel alanda resmi park yasağı bölgesi kurmak sorunsuz taşınma için gereklidir.",
            intro_p2: "FLOXANT tüm süreci üstlenir: başvuru, tabela kurulumu ve taşınma sonrası kaldırma.",
            for_whom_title: "Bu Hizmet Kimin İçin?", for_whom_items: ["Özel otoparkı olmayan şehir merkezi taşınmaları", "Büyük araç erişimi gerektiren ticari taşınmalar", "Garantili erişim gerektiren her taşınma"],
            process_title: "Sürecimiz", process_steps: [
                { title: "Başvuru", desc: "İlgili trafik makamına tüm belgelerle başvuru." },
                { title: "Onay", desc: "İzin takibi ve onayı." },
                { title: "Kurulum", desc: "Yasal süre ile park yasağı tabelalarının yerleştirilmesi." },
                { title: "Kaldırma", desc: "Taşınma tamamlandıktan sonra tabelaların kaldırılması." }
            ],
            guarantees_title: "Garantilerimiz", guarantees: ["Eksiksiz resmi işlem", "Zamanında tabela kurulumu", "Sizin açınızdan hiçbir çaba gerektirmeyen tam hizmet"],
            cta_title: "Park Yasağı Bölgesi Başvurusu", cta_text: "Taşınma gününüz için engelsiz erişim sağlayın."
        },
        reinigung_regensburg: {
            meta_title: "Temizlik Regensburg – Profesyonel Son Temizlik", meta_desc: "FLOXANT Regensburg'da profesyonel son temizlik sunar.",
            badge: "Regensburg", hero_title_prefix: "Profesyonel Temizlik", hero_title_highlight: "Regensburg",
            hero_desc: "Regensburg operasyonel merkezimizdir. Burada yerel mülk yöneticilerinin standartlarını biliyoruz.",
            intro_title: "Regensburg'da Son Temizlik – Ana Bölgemiz",
            intro_p1: "FLOXANT'ın operasyonel üssü olarak Regensburg, temizlik hizmetlerimizin merkezidir.",
            intro_p2: "Son temizliğimiz kontrol listesi ve fotoğraf belgeleme ile belgelenmiş bir süreci takip eder.",
            services_title: "Regensburg Temizlik Hizmetlerimiz",
            services: {
                end_cleaning: { title: "Son Temizlik", desc: "Ev sahibi standartlarında eksiksiz mülk temizliği." },
                construction_cleaning: { title: "İnşaat Sonrası Temizlik", desc: "Renovasyon sonrası profesyonel temizlik." },
                office_cleaning: { title: "Ofis Temizliği", desc: "Ticari tesislerin düzenli veya tek seferlik temizliği." }
            },
            cta_title: "Regensburg'da Temizlik Talep Edin", cta_text: "Regensburg'da profesyonel temizliğiniz için randevu alın."
        },
        entruempelung_regensburg: {
            meta_title: "Boşaltma Regensburg – Profesyonel Temizleme", meta_desc: "FLOXANT Regensburg'da mülkleri profesyonelce boşaltır.",
            badge: "Regensburg", hero_title_prefix: "Boşaltma", hero_title_highlight: "Regensburg",
            hero_desc: "Bırakmak bir süreçtir. Regensburg'da saygı ve özenle eşlik ediyoruz.",
            intro_title: "Regensburg'da Boşaltma – Yerinde ve Kişisel",
            intro_p1: "Regensburg operasyonel merkezimizdir ve tam burada en güçlüyüz.",
            intro_p2: "Ekibimiz yerinde profesyonelce ayırır ve çevreci şekilde bertaraf eder.",
            services_title: "Regensburg Boşaltma Hizmetlerimiz",
            services: {
                household: { title: "Ev Tasfiyesi", desc: "Özel konutların eksiksiz boşaltılması." },
                commercial: { title: "Ticari Boşaltma", desc: "Ofis ve depoların profesyonel boşaltılması." },
                partial: { title: "Kısmi Boşaltma", desc: "Belirli oda veya alanların hedefli boşaltılması." }
            },
            cta_title: "Regensburg'da Boşaltma Talep Edin", cta_text: "Gizli danışma için bize ulaşın."
        },
        buero_umzug_regensburg: {
            meta_title: "Ofis Taşıma Regensburg – Profesyonel İş Taşınması", meta_desc: "FLOXANT Regensburg'da ofis taşınması organize eder.",
            badge: "Regensburg", hero_title_prefix: "Ofis Taşıma", hero_title_highlight: "Regensburg",
            hero_desc: "İş sürekliliği önceliktir. Regensburg'da ofisinizi sistem ve gizlilikle taşıyoruz.",
            intro_title: "Regensburg'da Ofis Taşıma – Ana Bölgemiz",
            intro_p1: "Regensburg iş lokasyonu olarak istikrarlı şekilde büyüyor. FLOXANT yerel uzmanlığa sahiptir.",
            intro_p2: "Ofis taşınmanızı ekibinizin ertesi iş günü verimli çalışabilmesi için koordine ediyoruz.",
            services_title: "Ofis Taşıma Hizmetlerimiz",
            services: {
                full_move: { title: "Komple Taşınma", desc: "Tüm ofis birimlerinin ve BT altyapısının tam taşınması." },
                it_relocation: { title: "BT Taşıma", desc: "Sunucuların ve ağ altyapısının profesyonel bağlantı kesimi ve yeniden bağlantısı." },
                weekend_move: { title: "Hafta Sonu Taşınması", desc: "Sıfır kesinti için mesai saatleri dışında uygulama." }
            },
            cta_title: "Regensburg'da Ofis Taşınmanızı Planlayın", cta_text: "Ofis taşınmanızı birlikte planlayalım."
        },
        sig_ritual_exit: {
            meta_title: "Ritüel Veda Kutusu – Bilinçli Bir Veda", meta_desc: "FLOXANT Ritüel Veda Kutusu bilinçli bir vedaya eşlik eder.",
            badge: "Signature Deneyim", hero_title: "Ritüel Veda Kutusu", hero_desc: "Bir evi terk etmek bir bölümü kapatmak demektir.",
            story_title: "Neden Veda Bir Ritüeli Hak Eder", story_p1: "Her ev anılar taşır. Ritüel Veda Kutusu, genellikle göz ardı edilen bir geçişe cevabımızdır.",
            story_p2: "Kutunun içinde küçük bir tören bulacaksınız: bir mum, el yazısı rehber ve mühürlenebilir bir zarf.",
            purpose_title: "Psikolojik Değer", purpose_text: "Bilinçli geçişler taşınmanın duygusal stresini azaltır.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Evini basitçe terk etmeyip veda etmek isteyenler için.",
            cta_title: "Ritüel Veda Kutusu Ekleyin", cta_text: "Taşınmanızı bir Ritüel Veda Kutusu ile tamamlayın."
        },
        sig_clean_start: {
            meta_title: "Temiz Başlangıç Töreni", meta_desc: "FLOXANT Temiz Başlangıç Töreni yeni dairenizi bilinçli taşınma için hazırlar.",
            badge: "Signature Deneyim", hero_title: "Temiz Başlangıç Töreni", hero_desc: "Mobilyalarınızı yerleştirmeden önce, yeni alanınızı hazırlıyoruz.",
            story_title: "Yeni Başlangıç Berraklıkla Başlar", story_p1: "Yeni ev ilk saniyeden sizin gibi hissettirmelidir.",
            story_p2: "Sadece yüzeyleri temizlemiyoruz – bir atmosfer yaratıyoruz.", purpose_title: "Psikolojik Değer", purpose_text: "Temiz, hazırlanmış alan bilinçaltınıza sinyal verir: burada yeni bir şey başlıyor.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Mevcut mülklere taşınanlar veya renovasyon sonrası.",
            cta_title: "Temiz Başlangıç Rezerve Edin", cta_text: "Taşınmanızı hazırlayın."
        },
        sig_neighbour_kit: {
            meta_title: "Yeni Komşu Seti", meta_desc: "FLOXANT Yeni Komşu Seti yeni mahalleye varışınızı kolaylaştırır.",
            badge: "Signature Deneyim", hero_title: "Yeni Komşu Seti", hero_desc: "İlk izlenimler önemlidir – yeni komşularınızla dahil.",
            story_title: "Varış Bağlantıyla Başlar", story_p1: "Yeni bir ortamda insan kendini yabancı hisseder. Yeni Komşu Seti bu mesafeyi zarif bir şekilde kapatır.",
            story_p2: "Seti hazırlıyor ve taşınma gününüzde teslim ediyoruz.", purpose_title: "Sosyal Değer", purpose_text: "İyi komşuluk ilişkileri ilk günden başlar.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Çok daireli bir binaya taşınan aileler, çiftler veya bireyler için.",
            cta_title: "Yeni Komşu Seti Talep Edin", cta_text: "Taşınmanızı Yeni Komşu Seti ile tamamlayın."
        },
        sig_first_48h: {
            meta_title: "İlk 48 Saat Paketi", meta_desc: "FLOXANT İlk 48 Saat Paketi ilk iki gün için ihtiyacınız olan her şeyi sağlar.",
            badge: "Signature Deneyim", hero_title: "İlk 48 Saat Paketi", hero_desc: "Yeni evinizdeki ilk saatler belirleyicidir.",
            story_title: "Kritik İlk 48 Saat", story_p1: "Taşınmadan sonra ev acil durumdadır. Paket ihtiyacınız olan her şeyi içerir.",
            story_p2: "Paket yeni evinize girdiğinizde hazırdır.", purpose_title: "Pratik Değer", purpose_text: "İlk 48 saat taşınmanın duygusal değerlendirmesini belirler.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Taşınma sonrası hemen işlevsel olmak isteyenler için.",
            cta_title: "İlk 48 Saat Paketini Rezerve Edin", cta_text: "Yeni evinizde rahat başlayın."
        },
        sig_bureaucracy: {
            meta_title: "Bürokratik Kalkan", meta_desc: "FLOXANT Bürokratik Kalkan taşınma etrafındaki resmi işlemleri üstlenir.",
            badge: "Signature Deneyim", hero_title: "Bürokratik Kalkan", hero_desc: "Resmi ziyaretler ve işlemler her taşınmanın parçasıdır.",
            story_title: "Bürokrasi Sizin Derdiniz Olmamalı", story_p1: "Taşınma bir formaliteler dalgası getirir. Bürokratik Kalkan tüm bu görevleri toplar ve halleder.",
            story_p2: "Ekibimiz Regensburg ve Bavyera genelindeki prosedürlere hakimdir.", purpose_title: "Organizasyonel Değer", purpose_text: "Bürokrasi taşınmalardaki en büyük stres faktörlerinden biridir.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Taşınmalarına odaklanmak isteyen bireyler ve şirketler için.",
            cta_title: "Bürokratik Kalkan Talep Edin", cta_text: "Formaliteleri devredin."
        },
        sig_furniture_opt: {
            meta_title: "Mobilya Optimizasyonu", meta_desc: "FLOXANT Mobilya Optimizasyonu mobilyalarınızı yeni alanlarda mükemmel yerleştirir.",
            badge: "Signature Deneyim", hero_title: "Mobilya Optimizasyonu", hero_desc: "Mobilyayı sadece koymak yerine yerleştirmek. Yeni alan için düzeni optimize ediyoruz.",
            story_title: "Alanınız, Yeniden Tasarlanmış", story_p1: "Eski mobilya yeni odalarda – her zaman hemen uymuyor. Mobilya Optimizasyonu analiz eder ve optimal düzen önerir.",
            story_p2: "Ekibimiz optimizasyonu taşınma gününde uygular.", purpose_title: "Tasarım Değeri", purpose_text: "İyi düşünülmüş oda düzeni yaşam kalitesini artırır.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Mevcut mobilyaları farklı boyutlu bir alana taşıyanlar için.",
            cta_title: "Mobilya Optimizasyonu Talep Edin", cta_text: "Yeni alanınızı profesyonelce düzenletin."
        },
        sig_cleaning_guarantee: {
            meta_title: "Temizlik Garantisi", meta_desc: "FLOXANT Temizlik Garantisi tertemiz teslimi garanti eder.",
            badge: "Signature Deneyim", hero_title: "Temizlik Garantisi", hero_desc: "Tertemiz teslim – garantili. Ev sahibinin şikayeti varsa ücretsiz yeniden temizliyoruz.",
            story_title: "Teslimde Güvence", story_p1: "Mülk teslimi taşınmadan sonra en stresli andır.",
            story_p2: "14 gün içinde meşru temizlik eksikliği tespit edilirse, ücretsiz düzeltiriz.", purpose_title: "Finansal Değer", purpose_text: "Temizlik Garantisi depozitonuzu korur.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Stressiz mülk teslimi isteyen tüm kiracılar için.",
            cta_title: "Temizlik Garantisi Ekleyin", cta_text: "Tesliminizi güvence altına alın."
        },
        sig_storage_rot: {
            meta_title: "Depo Rotasyonu", meta_desc: "FLOXANT Depo Rotasyonu esnek erişimli güvenli geçici depolama sunar.",
            badge: "Signature Deneyim", hero_title: "Depo Rotasyonu", hero_desc: "Her şeyin aynı anda taşınması gerekmez. Depo Rotasyonu zamansal esneklik sağlar.",
            story_title: "Stratejik Bir Araç Olarak Geçici Depolama", story_p1: "Bazen takvimler uyuşmaz. Depo Rotasyonu bu zamanlama sorununu çözer.",
            story_p2: "Eşyalarınız Regensburg bölgesinde güvenle depolanır.", purpose_title: "Lojistik Değer", purpose_text: "Zamanlama esnekliği baskıyı azaltır ve daha iyi kararlar sağlar.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Taşınma tarihleri senkronize olmayanlar için.",
            cta_title: "Depo Rotasyonu Talep Edin", cta_text: "Esnek geçici depolama güvence altına alın."
        },
        sig_kids_box: {
            meta_title: "Çocuk Taşınma Kutusu", meta_desc: "FLOXANT Çocuk Taşınma Kutusu taşınmayı çocuklar için maceraya dönüştürür.",
            badge: "Signature Deneyim", hero_title: "Çocuk Taşınma Kutusu", hero_desc: "Çocuklar taşınmayı yetişkinlerden farklı yaşar. Kutumuz geçişi olumlu bir deneyime dönüştürür.",
            story_title: "Çocuk Gözüyle Taşınma", story_p1: "Çocuklar için taşınma belirsizlik demektir. Çocuk Taşınma Kutusu bu sürece eşlik eder.",
            story_p2: "Kutu taşınma gününden önce teslim edilir.", purpose_title: "Eğitimsel Değer", purpose_text: "Taşınma sürecine aktif dahil edilen çocuklar değişimle daha iyi başa çıkar.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "3-12 yaş arası çocuklu aileler için.",
            cta_title: "Çocuk Taşınma Kutusu Sipariş Edin", cta_text: "Taşınmayı çocuklarınız için olumlu bir deneyim yapın."
        },
        sig_service_24h: {
            meta_title: "24 Saat Taşınma Hizmeti", meta_desc: "FLOXANT 24 Saat Taşınma Hizmeti acil ve zamana duyarlı taşınmalar için.",
            badge: "Signature Deneyim", hero_title: "24 Saat Taşınma Hizmeti", hero_desc: "Bazen taşınma bekleyemez. 24 saat hizmetimiz ihtiyacınız olduğunda hazırdır.",
            story_title: "Bir Vaat Olarak Erişilebilirlik", story_p1: "Her taşınma mesai saatlerine uymaz. 24 Saat Hizmeti akşam, gece ve hafta sonu müsaitlik garanti eder.",
            story_p2: "Nöbet ekibimiz kısa sürede hazırdır.", purpose_title: "Zamansal Değer", purpose_text: "Zaman baskısı taşınmalardaki en büyük stres faktörüdür.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Acil taşınmalar veya mesai saatleri dışında taşınması gerekenler için.",
            cta_title: "24 Saat Hizmeti Talep Edin", cta_text: "Her zaman bize ulaşın. 24 saat sizin için buradayız."
        },
        sig_ladies_team: {
            meta_title: "Kadın Ekibi", meta_desc: "FLOXANT Kadın Ekibi yalnızca kadın personelle taşınma sunar.",
            badge: "Signature Deneyim", hero_title: "Kadın Ekibi", hero_desc: "Bazı durumlar özel hassasiyet gerektirir. Kadın Ekibimiz yalnızca kadın personelle taşınma sunar.",
            story_title: "Saygı Anlamakla Başlar", story_p1: "Müşterilerin tamamen kadın ekiple daha rahat hissettiği durumlar vardır.",
            story_p2: "Kadın taşınma ekibimiz aynı profesyonellik ve verimlilikle çalışır.", purpose_title: "Kişisel Değer", purpose_text: "Kadın Ekibi taşınma için korunan bir ortam yaratır.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Kişisel, kültürel veya dini nedenlerle kadın ekip tercih eden kadın müşteriler için.",
            cta_title: "Kadın Ekibi Talep Edin", cta_text: "Kadın Ekibimizle taşınmanızı rezerve edin. Gizli, profesyonel ve ek ücret yok."
        },
        sig_memory_capsule: {
            meta_title: "Anı Kapsülü", meta_desc: "FLOXANT Anı Kapsülü eski evinizden bir anı saklar.",
            badge: "Signature Deneyim", hero_title: "Anı Kapsülü", hero_desc: "Bazı yerler hatırlanmayı hak eder. Anı Kapsülü bir anı yakalar – sonsuza dek.",
            story_title: "Zamanda Donmuş Bir Yer", story_p1: "Son kutu paketlenmeden önce dururuz. Anı Kapsülü boş odaların fotoğraflarını, bir notunuzu ve küçük bir nesneyi içerir.",
            story_p2: "Bu kapsül hemen açılmak için değildir. Bir çapa – zamanı yakalayan fiziksel bir nesne.", purpose_title: "Duygusal Değer", purpose_text: "Anılar zamanla solar. Kapsül tanımlı bir anı korur.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Kendileri için çok şey ifade eden bir yeri terk edenler için.",
            cta_title: "Anı Kapsülü Ekleyin", cta_text: "Eski evinizden bir anı koruyun."
        },
        sig_maybe_box: {
            meta_title: "Belki Kutusu", meta_desc: "FLOXANT Belki Kutusu belirsiz kararlar için zaman verir.",
            badge: "Signature Deneyim", hero_title: "Belki Kutusu", hero_desc: "Her karar hemen verilmek zorunda değildir. Belki Kutusu zor sorular için zaman verir.",
            story_title: "Karar Baskısını Azaltmak", story_p1: "Taşınma sırasında aynı anda sayısız karar istenir. Belki Kutusu tam bu durumlar için tasarlandı.",
            story_p2: "Emin olmadığınız eşyaları 90 güne kadar saklıyoruz.", purpose_title: "Karar Değeri", purpose_text: "Karar aşırı yükü pişmanlık verici seçimlere yol açar.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Belirli eşyalardan hemen ayrılmakta zorluk çekenler için.",
            cta_title: "Belki Kutusu Talep Edin", cta_text: "Zor kararlar için kendinize zaman verin."
        },
        sig_key_handover: {
            meta_title: "Anahtar Teslimi", meta_desc: "FLOXANT Anahtar Teslimi mülk teslimini güvenli şekilde belgeler.",
            badge: "Signature Deneyim", hero_title: "Anahtar Teslimi", hero_desc: "Belgelenmiş. Güvenli. İzlenebilir. Huzurunuz için profesyonel protokoller.",
            story_title: "Son Adım, Düzgün Belgelenmiş", story_p1: "Anahtar teslimi bir bölümün resmi kapanışını işaretler. Hizmet profesyonel bir protokol oluşturur.",
            story_p2: "Anlaşmazlık durumunda kanıt olarak kullanılacak eksiksiz belge paketi alırsınız.", purpose_title: "Hukuki Değer", purpose_text: "Belgelenmiş teslim her iki tarafı da korur.",
            for_whom_title: "Bu Deneyim Kimin İçin?", for_whom_text: "Hukuki olarak güvenli mülk teslimine değer veren tüm kiracı ve ev sahipleri için.",
            cta_title: "Anahtar Teslimini Rezerve Edin", cta_text: "Mülk tesliminizi profesyonelce belgeleyin."
        }
    }
});

console.log('Turkish dictionary generated.');
