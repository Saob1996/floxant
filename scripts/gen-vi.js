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

// ===== VIETNAMESE =====
gen('vi', { title: "Khu vực dịch vụ", hub_note: "Trụ sở chính FLOXANT tại Düsseldorf. Trung tâm vận hành tại Regensburg và Oberpfalz. Chúng tôi phục vụ khắp Bavaria và cung cấp dịch vụ chuyển nhà đường dài trên toàn nước Đức.", description: "Trụ sở tại Düsseldorf. Trung tâm vận hành tại Regensburg.", cities: { regensburg: "Regensburg", bavaria: "Bavaria", munich: "München", nuremberg: "Nürnberg", augsburg: "Augsburg", germany: "Toàn nước Đức" } },
    apply({
        mi: "Chuyển nhà của bạn tại", mu: "München", mh: "Không căng thẳng đến thủ phủ Bavaria. FLOXANT cung cấp dịch vụ cao cấp với cam kết giá cố định.", mb: "München và vùng phụ cận", mit: "Chuyển nhà tại München – có kế hoạch và chính xác", mi1: "München là đô thị năng động. Việc chuyển nhà tại thủ phủ Bavaria thường là thách thức về hậu cần. Cầu thang hẹp, thiếu chỗ đỗ xe – điều kiện đòi hỏi kinh nghiệm và lập kế hoạch tốt.", mi2: "FLOXANT là dịch vụ chuyển nhà chuyên xử lý những thách thức này. Chúng tôi không chỉ bắt đầu – chúng tôi lên kế hoạch chi tiết.",
        tt: "Minh bạch về trụ sở", tx: "Trụ sở pháp lý của FLOXANT tại Düsseldorf. Đội ngũ của chúng tôi thường xuyên làm việc tại München.", pt: "Danh mục dịch vụ cho München", cm: "Chuyển nhà nội thành München", cd: "Nhanh chóng và hiệu quả.", rm: "Chuyển nhà đường dài", rd: "Từ Isar đến Rhein.", cl: "Dọn dẹp", cld: "Xử lý chuyên nghiệp đồ cũ.", dt: "Đặc điểm München", dtx: "Mỗi thành phố có đặc thù riêng.", lt: "Từ Bavaria đến toàn Đức", ltx: "Nhiều khách hàng chuyển từ München đi.", prt: "Giá minh bạch không bất ngờ", prx: "München đã đủ đắt. Chúng tôi cam kết minh bạch tuyệt đối.", fi: "Khảo sát miễn phí: đánh giá trước qua video.", fis: "Bảo hiểm bao gồm: nội thất được bảo vệ toàn diện.", fs: "Nhân viên chuyên nghiệp: giàu kinh nghiệm và cẩn thận.", ln: "Địa điểm khác", mct: "Báo giá cho München", mcx: "Bắt đầu yêu cầu ngay.",
        cb: "Dịch vụ cơ bản", fw: "Dịch vụ dành cho ai?", pr: "Quy trình của chúng tôi", gt: "Cam kết của chúng tôi",
        umt: "Chuyển nhà tư nhân", umd: "FLOXANT đồng hành cùng bạn trong chuyến chuyển nhà.", uht: "Chuyển nhà tư nhân", uhd: "Chuyển nhà không chỉ là vận chuyển. Đó là một sự chuyển đổi.", uit: "Chuyển nhà – chu đáo đến từng chi tiết", up1: "Chuyển nhà tư nhân chạm đến mọi khía cạnh cuộc sống. Đồ dùng cá nhân, kỷ niệm quý giá – tất cả cần sự chú ý riêng.", up2: "Đội ngũ làm việc theo quy trình rõ ràng, đảm bảo minh bạch toàn diện.", ufi: ["Cá nhân và gia đình", "Chuyển nhà nội thành", "Đồ vật quý giá"], ups: [{ title: "Đánh giá", desc: "Khảo sát miễn phí." }, { title: "Giá cố định", desc: "Báo giá minh bạch." }, { title: "Thực hiện", desc: "Đóng gói và vận chuyển chuyên nghiệp." }, { title: "Bàn giao", desc: "Lắp ráp và dọn dẹp." }], ugu: ["Cam kết giá cố định", "Bảo hiểm đầy đủ", "Nhân viên chuyên nghiệp"], uct: "Gửi yêu cầu", ucx: "Bắt đầu với báo giá cá nhân.",
        bmt: "Chuyển văn phòng", bmd: "FLOXANT tổ chức chuyển văn phòng với thời gian gián đoạn tối thiểu.", bbg: "Thương mại", bht: "Chuyển văn phòng", bhd: "Liên tục kinh doanh cần lập kế hoạch.", bit: "Chuyển văn phòng chính xác", bp1: "Chuyển văn phòng ảnh hưởng đến quy trình kinh doanh. Hạ tầng CNTT, tài liệu mật – mọi chi tiết phải chính xác.", bp2: "Chúng tôi phối hợp tất cả.", bfi: ["Doanh nghiệp mọi quy mô", "Văn phòng luật", "Doanh nghiệp giảm thiểu gián đoạn"], bps: [{ title: "Lập kế hoạch", desc: "Phân tích chi tiết." }, { title: "Phối hợp", desc: "Liên lạc với bộ phận IT." }, { title: "Thực hiện", desc: "Chuyển trong khung giờ xác định." }, { title: "Đưa vào hoạt động", desc: "Cấu hình trạm làm việc." }], bgu: ["Khung giờ đảm bảo", "Bảo hiểm CNTT", "Xử lý kín đáo"], bct: "Lên kế hoạch chuyển văn phòng", bcx: "Cùng lên kế hoạch.",
        fmt: "Chuyển nhà đường dài", fmd: "FLOXANT tổ chức chuyển nhà đường dài.", fbg: "Đường dài", fht: "Chuyển nhà đường dài", fhd: "Khoảng cách không là trở ngại.", fit: "Đường dài chính xác", fp1: "Chuyển nhà đường dài cần lập kế hoạch đặc biệt.", fp2: "Từ Regensburg đến Hamburg, từ München đến Berlin.", ffi: ["Thay đổi công việc", "Gia đình", "Điều chuyển nhân viên"], fps: [{ title: "Lộ trình", desc: "Tuyến đường tối ưu." }, { title: "Đóng gói", desc: "Vật liệu đặc biệt." }, { title: "Vận chuyển", desc: "Theo dõi GPS." }, { title: "Giao hàng", desc: "Giao đúng hẹn." }], fgu: ["Giá cố định", "Bảo hiểm đầy đủ", "Đảm bảo giao hàng"], fct: "Yêu cầu chuyển nhà", fcx: "Bạn muốn đến đâu?",
        rmt: "Vệ sinh chuyên nghiệp", rmd: "FLOXANT cung cấp dịch vụ vệ sinh cuối kỳ.", rbg: "Vệ sinh", rht: "Vệ sinh", rhd: "Sạch sẽ là nền tảng của kết thúc và khởi đầu mới.", rit: "Vệ sinh cuối kỳ có hệ thống", rp1: "Vệ sinh cuối kỳ quyết định việc hoàn trả tiền đặt cọc.", rp2: "Đội ngũ làm việc tỉ mỉ và nhanh chóng.", rfi: ["Người thuê", "Chủ nhà", "Mặt bằng thương mại"], rps: [{ title: "Kiểm tra", desc: "Đánh giá tình trạng." }, { title: "Thực hiện", desc: "Vệ sinh có hệ thống." }, { title: "Kiểm soát", desc: "Nghiệm thu với ảnh chụp." }, { title: "Bàn giao", desc: "Bàn giao sạch sẽ." }], rgu: ["Tiêu chuẩn chủ nhà", "Tài liệu ảnh", "Vệ sinh lại khi cần"], rct: "Đặt vệ sinh", rcx: "Đặt dịch vụ vệ sinh chuyên nghiệp.",
        emt: "Dọn dẹp chuyên nghiệp", emd: "FLOXANT dọn dẹp tài sản chuyên nghiệp.", ebg: "Xử lý", eht: "Dọn dẹp", ehd: "Buông bỏ cần sự tin tưởng.", eit: "Dọn dẹp có trách nhiệm", ep1: "Dọn dẹp không chỉ là bỏ đồ.", ep2: "Phân loại chuyên nghiệp và xử lý sinh thái.", efi: ["Thanh lý nhà cửa", "Dọn dẹp thương mại", "Cá nhân"], eps: [{ title: "Khảo sát", desc: "Kiểm kê chung." }, { title: "Dọn dẹp", desc: "Có hệ thống." }, { title: "Xử lý", desc: "Phân loại chuyên nghiệp." }, { title: "Trạng thái cuối", desc: "Bàn giao sạch." }], egu: ["Xử lý sinh thái", "Xử lý kín đáo", "Bàn giao sạch"], ect: "Yêu cầu dọn dẹp", ecx: "Liên hệ chúng tôi.",
        mmt: "Lắp ráp chuyên nghiệp", mmd: "FLOXANT lắp ráp nội thất và bếp.", mbg: "Lắp ráp", mht: "Lắp ráp", mhd: "Chính xác trong từng chi tiết.", mmit: "Lắp ráp chuyên nghiệp", mp1: "Nội thất chất lượng xứng đáng được lắp ráp chuyên nghiệp.", mp2: "Từ kệ IKEA đến bếp thiết kế.", mfi: ["Sau chuyển nhà", "Khách hàng thương mại", "Lắp đặt bếp"], mps: [{ title: "Chuẩn bị", desc: "Kiểm tra hướng dẫn." }, { title: "Lắp ráp", desc: "Lắp đặt chuyên nghiệp." }, { title: "Kiểm tra", desc: "Test các bộ phận." }, { title: "Hoàn thiện", desc: "Dọn dẹp khu vực." }], mgu: ["Lắp ráp chuyên nghiệp", "Bảo vệ bề mặt", "Khu vực sạch"], mct: "Đặt lắp ráp", mcx: "Lắp ráp không thỏa hiệp.",
        hmt: "Khu vực cấm đỗ xe", hmd: "FLOXANT xử lý khu vực cấm đỗ.", hbg: "Hậu cần", hht: "Khu vực cấm đỗ xe", hhd: "Lối vào tự do – nền tảng cho mọi chuyến chuyển nhà.", hit: "Khu vực cấm đỗ – đúng hạn và hợp pháp", hp1: "Ở nhiều khu vực đô thị cần khu vực cấm đỗ chính thức.", hp2: "FLOXANT đảm nhận toàn bộ quy trình.", hfi: ["Chuyển nhà trung tâm", "Chuyển nhà thương mại", "Mọi chuyển nhà"], hps: [{ title: "Nộp đơn", desc: "Nộp lên cơ quan." }, { title: "Phê duyệt", desc: "Xác nhận." }, { title: "Lắp đặt", desc: "Đặt biển báo." }, { title: "Tháo dỡ", desc: "Gỡ biển." }], hgu: ["Xử lý chính thức đầy đủ", "Lắp đặt đúng hạn", "Dịch vụ trọn gói"], hct: "Nộp đơn khu vực cấm", hcx: "Đảm bảo lối vào.",
        rrmt: "Vệ sinh Regensburg", rrmd: "Vệ sinh chuyên nghiệp tại Regensburg.", rrhp: "Vệ sinh chuyên nghiệp tại", rrhd: "Trung tâm vận hành.", rrit: "Vệ sinh cuối kỳ tại Regensburg", rrp1: "Cơ sở vận hành.", rrp2: "Quy trình có tài liệu.", rrst: "Dịch vụ vệ sinh", rrec: "Vệ sinh cuối kỳ", rred: "Toàn diện.", rrcc: "Vệ sinh sau xây dựng", rrcd: "Sau sửa chữa.", rroc: "Vệ sinh văn phòng", rrod: "Định kỳ hoặc một lần.", rrct: "Yêu cầu tại Regensburg", rrcx: "Đặt lịch.",
        ermt: "Dọn dẹp Regensburg", ermd: "FLOXANT dọn dẹp tại Regensburg.", erhp: "Dọn dẹp tại", erhd: "Buông bỏ là quá trình.", erit: "Dọn dẹp tại Regensburg", erp1: "Trung tâm vận hành.", erp2: "Phân loại tại chỗ.", erst: "Dịch vụ dọn dẹp", erhh: "Thanh lý", erhhd: "Dọn dẹp toàn bộ.", erco: "Dọn dẹp thương mại", ercod: "Văn phòng và kho.", erpa: "Dọn dẹp từng phần", erpad: "Phòng được chọn.", erct: "Yêu cầu dọn dẹp", ercx: "Liên hệ.",
        brmt: "Chuyển văn phòng Regensburg", brmd: "FLOXANT tổ chức tại Regensburg.", brhp: "Chuyển văn phòng tại", brhd: "Liên tục kinh doanh.", brit: "Chuyển văn phòng tại Regensburg", brp1: "Regensburg đang phát triển.", brp2: "Chúng tôi phối hợp.", brst: "Dịch vụ chuyển văn phòng", brfm: "Chuyển toàn bộ", brfd: "Văn phòng và CNTT.", brir: "Di chuyển CNTT", brid: "Ngắt kết nối chuyên nghiệp.", brwm: "Chuyển cuối tuần", brwd: "Ngoài giờ làm việc.", brct: "Lên kế hoạch", brcx: "Cùng lên kế hoạch.",
        sb: "Trải nghiệm Signature", fws: "Trải nghiệm dành cho ai?",
        sg: {
            sig_ritual_exit: { h: "Hộp Nghi Thức Chia Tay", d: "Rời xa ngôi nhà là khép lại một chương.", pl: "Giá trị tâm lý", c: "Thêm hộp nghi thức" },
            sig_clean_start: { h: "Nghi Lễ Khởi Đầu Mới", d: "Trước khi bày biện, chúng tôi chuẩn bị không gian.", pl: "Giá trị tâm lý", c: "Đặt khởi đầu sạch" },
            sig_neighbour_kit: { h: "Bộ Chào Hàng Xóm", d: "Ấn tượng đầu tiên rất quan trọng.", pl: "Giá trị xã hội", c: "Đặt bộ hàng xóm" },
            sig_first_48h: { h: "Gói 48 Giờ Đầu", d: "Những giờ đầu là quyết định.", pl: "Giá trị thực tiễn", c: "Đặt gói 48h" },
            sig_bureaucracy: { h: "Lá Chắn Thủ Tục", d: "Thủ tục là phần của mỗi chuyến chuyển nhà.", pl: "Giá trị tổ chức", c: "Yêu cầu lá chắn" },
            sig_furniture_opt: { h: "Tối Ưu Nội Thất", d: "Sắp xếp, không chỉ đặt vào.", pl: "Giá trị thiết kế", c: "Yêu cầu tối ưu" },
            sig_cleaning_guarantee: { h: "Bảo Đảm Vệ Sinh", d: "Bàn giao sạch – cam kết.", pl: "Giá trị tài chính", c: "Thêm bảo đảm" },
            sig_storage_rot: { h: "Luân Chuyển Kho", d: "Không phải tất cả cần chuyển cùng lúc.", pl: "Giá trị hậu cần", c: "Yêu cầu luân chuyển" },
            sig_kids_box: { h: "Hộp Chuyển Nhà Trẻ Em", d: "Trẻ em trải nghiệm chuyển nhà khác.", pl: "Giá trị giáo dục", c: "Đặt hộp trẻ em" },
            sig_service_24h: { h: "Dịch Vụ 24 Giờ", d: "Đôi khi chuyển nhà không thể đợi.", pl: "Giá trị thời gian", c: "Yêu cầu dịch vụ 24h" },
            sig_ladies_team: { h: "Đội Ngũ Nữ", d: "Một số tình huống cần sự nhạy cảm đặc biệt.", pl: "Giá trị cá nhân", c: "Yêu cầu đội nữ" },
            sig_memory_capsule: { h: "Viên Nang Ký Ức", d: "Một số nơi xứng đáng được ghi nhớ.", pl: "Giá trị cảm xúc", c: "Thêm viên nang" },
            sig_maybe_box: { h: "Hộp Có Thể", d: "Không phải quyết định nào cũng cần ngay.", pl: "Giá trị quyết định", c: "Yêu cầu hộp Có Thể" },
            sig_key_handover: { h: "Bàn Giao Chìa Khóa", d: "Có tài liệu. An toàn. Truy vết được.", pl: "Giá trị pháp lý", c: "Đặt bàn giao chìa khóa" }
        }
    }));

console.log('Vietnamese done.');
