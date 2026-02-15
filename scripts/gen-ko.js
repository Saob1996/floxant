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

// ===== KOREAN =====
gen('ko', { title: "서비스 지역", hub_note: "FLOXANT 본사는 뒤셀도르프에 있습니다. 운영 센터는 레겐스부르크와 오버팔츠에 위치하며, 바이에른 전역과 독일 전국 장거리 이사를 지원합니다.", description: "본사: 뒤셀도르프. 운영 센터: 레겐스부르크.", cities: { regensburg: "레겐스부르크", bavaria: "바이에른", munich: "뮌헨", nuremberg: "뉘른베르크", augsburg: "아우크스부르크", germany: "독일 전역" } },
    apply({
        mi: "", mu: "뮌헨 이사", mh: "바이에른 주도로 스트레스 없이. FLOXANT는 고정 가격 보장 프리미엄 이사 서비스를 제공합니다.", mb: "뮌헨 및 주변", mit: "뮌헨 이사 – 계획과 정밀함으로", mi1: "뮌헨은 역동적인 대도시입니다. 바이에른 주도에서의 이사는 좁은 계단, 주차 부족 등 물류적 도전과제가 됩니다. 경험과 철저한 계획이 필요합니다.", mi2: "FLOXANT는 이러한 도전을 전문적으로 관리하는 이사 서비스입니다. 단순히 시작하지 않고 – 상세하게 계획합니다.",
        tt: "본사에 대한 투명성", tx: "FLOXANT 법적 본사는 뒤셀도르프에 있습니다. 우리 팀은 뮌헨에서 정기적으로 근무합니다.", pt: "뮌헨 서비스 포트폴리오", cm: "뮌헨 시내 이사", cd: "시내에서 빠르고 효율적.", rm: "뮌헨 장거리 이사", rd: "이자르에서 라인까지. 물류 최적화.", cl: "정리", cld: "오래된 가구 전문 처리.", dt: "뮌헨 특성", dtx: "모든 도시에는 특성이 있습니다.", lt: "바이에른에서 독일 전역으로", ltx: "많은 고객이 뮌헨에서 이동합니다.", prt: "투명한 가격, 놀랄 일 없음", prx: "뮌헨은 이미 충분히 비쌉니다. 우리는 절대적인 가격 투명성을 추구합니다.", fi: "무료 점검: 영상 통화를 통한 사전 평가.", fis: "보험 포함: 가구가 완전히 보장됩니다.", fs: "전문 인력: 경험이 풍부하고 세심합니다.", ln: "다른 지역", mct: "뮌헨 견적", mcx: "지금 문의를 시작하세요.",
        cb: "기본 서비스", fw: "누구를 위한 서비스인가요?", pr: "우리의 프로세스", gt: "우리의 보증",
        umt: "개인 이사", umd: "FLOXANT가 정밀하게 개인 이사를 동행합니다.", uht: "개인 이사", uhd: "이사는 운송 이상입니다. 전환입니다.", uit: "세부 사항까지 고려한 이사", up1: "개인 이사는 삶의 모든 측면에 영향을 미칩니다. 개인 용품, 소중한 추억 – 모두 개별적인 관심이 필요합니다.", up2: "명확한 프로세스로 완전한 투명성을 보장합니다.", ufi: ["세심한 서비스를 원하는 개인과 가족", "시내/지역 주거 이사", "귀중품 특별 보호가 필요한 이사"], ups: [{ title: "평가", desc: "무료 점검." }, { title: "고정 가격", desc: "투명한 견적." }, { title: "실행", desc: "전문 포장 및 안전 운송." }, { title: "인도", desc: "조립, 배치 및 청소." }], ugu: ["고정 가격 보장", "완전 보험", "전문 교육 인력"], uct: "비구속적 문의 제출", ucx: "맞춤 견적으로 시작하세요.",
        bmt: "사무실 이사", bmd: "FLOXANT가 최소 다운타임으로 사무실 이사를 조직합니다.", bbg: "상업", bht: "사무실 이사", bhd: "비즈니스 연속성을 위한 계획.", bit: "정밀한 기업 이사", bp1: "사무실 이사는 활성 비즈니스 프로세스에 개입합니다. IT 인프라, 기밀 문서.", bp2: "모든 작업을 조율합니다.", bfi: ["모든 규모의 기업", "법률 사무소", "다운타임 최소화 기업"], bps: [{ title: "프로젝트 계획", desc: "상세 분석." }, { title: "조율", desc: "IT 팀 연계." }, { title: "실행", desc: "지정 시간 내 이사." }, { title: "가동", desc: "워크스테이션 구성." }], bgu: ["보장된 시간대", "IT 보험", "신중한 처리"], bct: "사무실 이사 계획", bcx: "함께 계획합시다.",
        fmt: "장거리 이사", fmd: "FLOXANT가 바이에른 출발 장거리 이사를 조직합니다.", fbg: "장거리", fht: "장거리 이사", fhd: "거리는 장벽이 아닙니다.", fit: "정밀한 장거리", fp1: "장거리 이사는 특별한 계획이 필요합니다.", fp2: "레겐스부르크에서 함부르크, 뮌헨에서 베를린.", ffi: ["직장 변경", "가족", "직원 이동"], fps: [{ title: "경로", desc: "최적 경로." }, { title: "포장", desc: "특수 재료." }, { title: "운송", desc: "GPS 추적." }, { title: "배송", desc: "정시 배송." }], fgu: ["전 구간 고정 가격", "완전 보험", "배송 보장"], fct: "장거리 이사 문의", fcx: "어디로 이사하시겠습니까?",
        rmt: "전문 청소", rmd: "FLOXANT 전문 최종 청소 서비스.", rbg: "청소", rht: "청소", rhd: "청결은 마무리와 새 시작의 기초입니다.", rit: "체계적 최종 청소", rp1: "최종 청소는 보증금 반환의 결정적 요소입니다.", rp2: "꼼꼼하고 빠르게 작업합니다.", rfi: ["인수 전 임차인", "매각 전 소유자", "상업 공간"], rps: [{ title: "점검", desc: "상태 평가." }, { title: "실행", desc: "체계적 청소." }, { title: "품질 관리", desc: "사진 기록 검수." }, { title: "인도", desc: "깨끗한 인도." }], rgu: ["집주인 기준 충족", "사진 문서 포함", "정당한 경우 재청소"], rct: "청소 주문", rcx: "전문 최종 청소 주문.",
        emt: "전문 정리", emd: "FLOXANT 전문 부동산 정리.", ebg: "처리", eht: "정리", ehd: "놓는 것은 신뢰가 필요합니다.", eit: "책임감 있는 정리", ep1: "정리는 물건을 치우는 것 이상입니다.", ep2: "전문 분류, 친환경 처리.", efi: ["주거 정리", "상업 정리", "개인"], eps: [{ title: "현장 확인", desc: "공동 재고 조사." }, { title: "정리", desc: "체계적." }, { title: "처리", desc: "전문 분류." }, { title: "최종 상태", desc: "깨끗한 인도." }], egu: ["친환경 처리 문서화", "신중 처리", "깨끗한 인도 보장"], ect: "정리 문의", ecx: "연락하세요.",
        mmt: "전문 조립", mmd: "FLOXANT 가구 및 주방 전문 조립.", mbg: "조립", mht: "조립", mhd: "세부 사항의 정밀함.", mmit: "전문 조립", mp1: "품질 가구는 전문 조립을 받을 자격이 있습니다.", mp2: "IKEA 선반부터 디자이너 주방까지.", mfi: ["이사 후", "상업 고객", "주방 설치"], mps: [{ title: "준비", desc: "설명서 확인." }, { title: "조립", desc: "전문 설치." }, { title: "기능 테스트", desc: "가동 부품 테스트." }, { title: "최종 점검", desc: "작업 영역 청소." }], mgu: ["전문 조립", "표면 보호", "깨끗한 작업 공간"], mct: "조립 주문", mcx: "타협 없는 전문 조립.",
        hmt: "주정차 금지 구역", hmd: "FLOXANT 주정차 금지 구역 처리.", hbg: "물류", hht: "주정차 금지 구역", hhd: "자유로운 접근 – 모든 이사의 기초.", hit: "주정차 금지 구역 – 적시에 합법적으로", hp1: "많은 도심 지역에서 공식 금지 구역이 필요합니다.", hp2: "FLOXANT가 전체 프로세스를 담당합니다.", hfi: ["도심 이사", "상업 이사", "모든 이사"], hps: [{ title: "신청", desc: "관할 기관 제출." }, { title: "승인", desc: "확인." }, { title: "설치", desc: "표지판 설치." }, { title: "철거", desc: "표지판 제거." }], hgu: ["완전 공식 처리", "적시 설치", "풀 서비스"], hct: "금지 구역 신청", hcx: "자유로운 접근 확보.",
        rrmt: "레겐스부르크 청소", rrmd: "레겐스부르크 전문 청소.", rrhp: "전문 청소 위치:", rrhd: "운영 센터.", rrit: "레겐스부르크 최종 청소", rrp1: "운영 기지.", rrp2: "문서화된 프로세스.", rrst: "청소 서비스", rrec: "최종 청소", rred: "완전 청소.", rrcc: "공사 후 청소", rrcd: "리모델링 후.", rroc: "사무실 청소", rrod: "정기 또는 일회.", rrct: "레겐스부르크 문의", rrcx: "예약.",
        ermt: "레겐스부르크 정리", ermd: "FLOXANT 레겐스부르크 정리.", erhp: "정리 위치:", erhd: "놓는 과정.", erit: "레겐스부르크 정리", erp1: "운영 센터.", erp2: "현장 분류.", erst: "정리 서비스", erhh: "주거 정리", erhhd: "완전 정리.", erco: "상업 정리", ercod: "사무실 및 창고.", erpa: "부분 정리", erpad: "선택 방.", erct: "정리 문의", ercx: "연락.",
        brmt: "레겐스부르크 사무실 이사", brmd: "FLOXANT 레겐스부르크 조직.", brhp: "사무실 이사 위치:", brhd: "비즈니스 연속성.", brit: "레겐스부르크 사무실 이사", brp1: "레겐스부르크 성장.", brp2: "조율합니다.", brst: "사무실 이사 서비스", brfm: "완전 이사", brfd: "사무실 및 IT.", brir: "IT 이전", brid: "전문 분리.", brwm: "주말 이사", brwd: "업무 시간 외.", brct: "계획", brcx: "함께 계획합시다.",
        sb: "Signature 경험", fws: "이 경험은 누구를 위한 것인가요?",
        sg: {
            sig_ritual_exit: { h: "작별 의식 상자", d: "집을 떠나는 것은 한 장을 닫는 것입니다.", pl: "심리적 가치", c: "의식 상자 추가" },
            sig_clean_start: { h: "깨끗한 시작 의식", d: "가구 전에 공간을 준비합니다.", pl: "심리적 가치", c: "깨끗한 시작 예약" },
            sig_neighbour_kit: { h: "새 이웃 키트", d: "첫인상은 중요합니다.", pl: "사회적 가치", c: "이웃 키트 주문" },
            sig_first_48h: { h: "첫 48시간 패키지", d: "새 집에서의 첫 시간이 결정적입니다.", pl: "실용적 가치", c: "48시간 패키지 예약" },
            sig_bureaucracy: { h: "관료주의 방패", d: "서류 절차는 모든 이사의 일부입니다.", pl: "조직적 가치", c: "방패 요청" },
            sig_furniture_opt: { h: "가구 최적화", d: "배치하기, 그냥 놓지 않기.", pl: "디자인 가치", c: "최적화 요청" },
            sig_cleaning_guarantee: { h: "청소 보증", d: "깨끗한 인도 – 보장됨.", pl: "재정적 가치", c: "보증 추가" },
            sig_storage_rot: { h: "창고 순환", d: "모든 것을 한 번에 옮길 필요 없습니다.", pl: "물류 가치", c: "순환 요청" },
            sig_kids_box: { h: "어린이 이사 상자", d: "아이들은 이사를 다르게 경험합니다.", pl: "교육적 가치", c: "어린이 상자 주문" },
            sig_service_24h: { h: "24시간 이사 서비스", d: "때로는 이사가 기다릴 수 없습니다.", pl: "시간 가치", c: "24시간 서비스 요청" },
            sig_ladies_team: { h: "여성 팀", d: "일부 상황은 특별한 배려가 필요합니다.", pl: "개인적 가치", c: "여성 팀 요청" },
            sig_memory_capsule: { h: "기억 캡슐", d: "어떤 장소는 기억될 자격이 있습니다.", pl: "감성 가치", c: "캡슐 추가" },
            sig_maybe_box: { h: "아마도 상자", d: "모든 결정이 즉시일 필요는 없습니다.", pl: "결정 가치", c: "아마도 상자 요청" },
            sig_key_handover: { h: "열쇠 인도", d: "문서화됨. 안전함. 추적 가능.", pl: "법적 가치", c: "열쇠 인도 예약" }
        }
    }));

console.log('Korean done.');
