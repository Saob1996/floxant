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

// ===== JAPANESE =====
gen('ja', { title: "サービスエリア", hub_note: "FLOXANTの本社はデュッセルドルフにあります。運営センターはレーゲンスブルクとオーバープファルツにあり、バイエルン全域へのサービスとドイツ全国の長距離引越しを提供しています。", description: "本社：デュッセルドルフ。運営センター：レーゲンスブルク。", cities: { regensburg: "レーゲンスブルク", bavaria: "バイエルン", munich: "ミュンヘン", nuremberg: "ニュルンベルク", augsburg: "アウクスブルク", germany: "ドイツ全国" } },
    apply({
        mi: "お引越し先：", mu: "ミュンヘン", mh: "バイエルンの州都へストレスフリーで。FLOXANTは固定価格保証付きのプレミアム引越しサービスを提供します。", mb: "ミュンヘンと周辺地域", mit: "ミュンヘンへの引越し – 計画と精密さで", mi1: "ミュンヘンはダイナミックな大都市です。バイエルンの州都での引越しは、狭い階段や駐車場不足など、物流上の課題となることがしばしばです。経験と入念な計画が求められます。", mi2: "FLOXANTはこれらの課題を見事に管理する引越しサービスです。私たちは単に作業を始めるのではなく、お引越しを詳細に計画します。",
        tt: "本社についての透明性", tx: "FLOXANTの法的本社はデュッセルドルフにあります。しかし当チームはミュンヘンで定期的に業務を行っています。", pt: "ミュンヘン向けサービスポートフォリオ", cm: "ミュンヘン市内引越し", cd: "市内で迅速かつ効率的。", rm: "ミュンヘン発長距離引越し", rd: "イザール川からライン川まで。物流最適化。", cl: "片付け", cld: "古い家具の専門的処分。", dt: "ミュンヘンの特性", dtx: "どの都市にも固有の特性があります。", lt: "バイエルンからドイツ全国へ", ltx: "多くのお客様がミュンヘンから移転されます。", prt: "明朗な価格、サプライズなし", prx: "ミュンヘンは十分に高価です。私たちは絶対的な価格透明性を追求します。", fi: "無料点検：ビデオ通話による事前評価。", fis: "保険込み：お客様の家具は完全に保護されます。", fs: "有資格スタッフ：経験豊富で丁寧。", ln: "その他の地域", mct: "ミュンヘンのお見積もり", mcx: "今すぐお問い合わせください。",
        cb: "基本サービス", fw: "このサービスの対象は？", pr: "プロセス", gt: "保証内容",
        umt: "個人引越し", umd: "FLOXANTが精密さと丁寧さで個人のお引越しをサポートします。", uht: "個人引越し", uhd: "引越しは運搬以上のもの。それは人生の転換です。", uit: "細部まで考え抜かれたお引越し", up1: "個人の引越しは人生のあらゆる側面に関わります。大切な持ち物、貴重な思い出 – すべてに個別の注意が必要です。", up2: "私たちのチームは明確なプロセスで完全な透明性を確保します。", ufi: ["丁寧なサービスを重視する個人・ご家族", "市内・地域内の住居引越し", "特別な保護が必要な引越し"], ups: [{ title: "評価", desc: "無料点検（現地またはビデオ）。" }, { title: "固定価格", desc: "透明なお見積もり。" }, { title: "実施", desc: "専門的な梱包と安全な輸送。" }, { title: "引き渡し", desc: "組立て、配置、清掃。" }], ugu: ["固定価格保証", "完全保険", "専門研修を受けたスタッフ"], uct: "お気軽にお問い合わせください", ucx: "カスタムお見積もりから始めましょう。",
        bmt: "オフィス引越し", bmd: "FLOXANTがダウンタイム最小でオフィス移転を組織します。", bbg: "商業", bht: "オフィス引越し", bhd: "ビジネスの継続性には計画が必要です。", bit: "精密な企業引越し", bp1: "オフィスの引越しは稼働中のビジネスプロセスに介入します。ITインフラ、機密書類 – すべての細部が重要です。", bp2: "すべての作業を調整します。", bfi: ["あらゆる規模の企業", "法律事務所", "ダウンタイム最小化企業"], bps: [{ title: "プロジェクト計画", desc: "詳細分析。" }, { title: "調整", desc: "ITチームとの連携。" }, { title: "実施", desc: "指定時間枠での引越し。" }, { title: "稼働開始", desc: "ワークステーション設定。" }], bgu: ["保証された時間枠", "IT機器保険", "慎重な取り扱い"], bct: "オフィス引越しを計画", bcx: "一緒に計画しましょう。",
        fmt: "長距離引越し", fmd: "FLOXANTがバイエルン発の長距離引越しを組織します。", fbg: "長距離", fht: "長距離引越し", fhd: "距離は障壁ではありません。", fit: "精密な長距離引越し", fp1: "長距離引越しには特別な計画品質が求められます。", fp2: "レーゲンスブルクからハンブルク、ミュンヘンからベルリンまで。", ffi: ["転職による移転", "ご家族の転居", "社員の異動"], fps: [{ title: "ルート計画", desc: "最適ルート。" }, { title: "梱包", desc: "特殊素材。" }, { title: "輸送", desc: "GPS追跡。" }, { title: "配達", desc: "時間通りの配達。" }], fgu: ["全行程固定価格", "完全保険", "配達保証"], fct: "長距離引越しのお問い合わせ", fcx: "どちらへお引越しですか？",
        rmt: "プロフェッショナルクリーニング", rmd: "FLOXANTのプロフェッショナル最終清掃。", rbg: "清掃", rht: "清掃", rhd: "清潔さは終了と新しい始まりの基盤です。", rit: "体系的な最終清掃", rp1: "最終清掃は敷金返還の決定的要因です。", rp2: "私たちのチームは丁寧かつ迅速に作業します。", rfi: ["引き渡し前の借主", "売却前のオーナー", "商業施設"], rps: [{ title: "点検", desc: "状態評価。" }, { title: "実施", desc: "体系的清掃。" }, { title: "品質管理", desc: "写真記録による検収。" }, { title: "引き渡し", desc: "清潔な引き渡し。" }], rgu: ["オーナー基準の清掃", "写真記録付き", "正当な場合の再清掃"], rct: "清掃を注文", rcx: "プロフェッショナルな最終清掃。",
        emt: "専門的な片付け・処分", emd: "FLOXANTが専門的に物件を片付けます。", ebg: "処分", eht: "片付け・処分", ehd: "手放すには信頼が必要です。", eit: "責任ある片付け", ep1: "片付けは物を除去する以上のことです。", ep2: "専門的に分類し、環境に配慮して処分します。", efi: ["住居の整理", "商業施設の片付け", "個人"], eps: [{ title: "現地確認", desc: "共同在庫調査。" }, { title: "片付け", desc: "体系的に。" }, { title: "処分", desc: "専門的分類。" }, { title: "最終状態", desc: "清潔な引き渡し。" }], egu: ["環境配慮の処分", "慎重な取り扱い", "清潔な引き渡し保証"], ect: "片付けのお問い合わせ", ecx: "お気軽にご連絡ください。",
        mmt: "専門的な組立て", mmd: "FLOXANTが家具とキッチンを専門的に組み立てます。", mbg: "組立て", mht: "組立て", mhd: "細部における精密さ。", mmit: "専門的な組立て", mp1: "品質の高い家具は専門的な組立てに値します。", mp2: "IKEAの棚からデザイナーキッチンまで。", mfi: ["引越し後", "商業クライアント", "キッチン設置"], mps: [{ title: "準備", desc: "説明書確認。" }, { title: "組立て", desc: "専門的設置。" }, { title: "機能テスト", desc: "可動部分のテスト。" }, { title: "最終点検", desc: "作業エリアの清掃。" }], mgu: ["専門的組立て", "表面保護", "清潔な作業場"], mct: "組立てを注文", mcx: "妥協のない専門的組立て。",
        hmt: "駐車禁止区域", hmd: "FLOXANTが駐車禁止区域を手配します。", hbg: "ロジスティクス", hht: "駐車禁止区域", hhd: "自由なアクセスがすべての引越しの基盤です。", hit: "駐車禁止区域 – 適時かつ合法的に", hp1: "多くの都市部では公式の禁止区域が必要です。", hp2: "FLOXANTがプロセス全体を担当します。", hfi: ["市中心部の引越し", "商業引越し", "すべての引越し"], hps: [{ title: "申請", desc: "当局への提出。" }, { title: "承認", desc: "確認。" }, { title: "設置", desc: "標識の設置。" }, { title: "撤去", desc: "標識の撤去。" }], hgu: ["完全な公式手続き", "適時の設置", "フルサービス"], hct: "禁止区域を申請", hcx: "自由なアクセスを確保。",
        rrmt: "レーゲンスブルク清掃", rrmd: "レーゲンスブルクでの専門清掃。", rrhp: "専門清掃：", rrhd: "運営センター。", rrit: "レーゲンスブルクの最終清掃", rrp1: "運営拠点。", rrp2: "文書化されたプロセス。", rrst: "清掃サービス", rrec: "最終清掃", rred: "完全清掃。", rrcc: "建設後清掃", rrcd: "リフォーム後。", rroc: "オフィス清掃", rrod: "定期または一回。", rrct: "レーゲンスブルクでの注文", rrcx: "ご予約ください。",
        ermt: "レーゲンスブルク片付け", ermd: "FLOXANTがレーゲンスブルクで片付けます。", erhp: "片付け：", erhd: "手放すプロセス。", erit: "レーゲンスブルクでの片付け", erp1: "運営センター。", erp2: "現地での分類。", erst: "片付けサービス", erhh: "住居整理", erhhd: "完全片付け。", erco: "商業片付け", ercod: "オフィスと倉庫。", erpa: "部分片付け", erpad: "選択した部屋。", erct: "片付けのお問い合わせ", ercx: "ご連絡ください。",
        brmt: "レーゲンスブルクオフィス引越し", brmd: "FLOXANTがレーゲンスブルクで組織します。", brhp: "オフィス引越し：", brhd: "ビジネスの継続性。", brit: "レーゲンスブルクでのオフィス引越し", brp1: "レーゲンスブルクは成長中。", brp2: "調整します。", brst: "オフィス引越しサービス", brfm: "完全引越し", brfd: "オフィスとIT。", brir: "IT移転", brid: "専門的な切断。", brwm: "週末引越し", brwd: "営業時間外。", brct: "計画", brcx: "一緒に計画しましょう。",
        sb: "Signatureエクスペリエンス", fws: "この体験はどなた向けですか？",
        sg: {
            sig_ritual_exit: { h: "お別れの儀式ボックス", d: "家を離れることは一つの章を閉じること。", pl: "心理的価値", c: "儀式ボックスを追加" },
            sig_clean_start: { h: "クリーンスタート・セレモニー", d: "家具の前に、空間を整えます。", pl: "心理的価値", c: "クリーンスタートを予約" },
            sig_neighbour_kit: { h: "新しいご近所キット", d: "第一印象は大切です。", pl: "社会的価値", c: "ご近所キットを注文" },
            sig_first_48h: { h: "最初の48時間パッケージ", d: "新居での最初の数時間が決定的です。", pl: "実用的価値", c: "48時間パッケージを予約" },
            sig_bureaucracy: { h: "官僚シールド", d: "手続きはあらゆる引越しの一部です。", pl: "組織的価値", c: "シールドを申請" },
            sig_furniture_opt: { h: "家具最適化", d: "配置する、ただ置くだけではなく。", pl: "デザイン的価値", c: "最適化を申請" },
            sig_cleaning_guarantee: { h: "清掃保証", d: "清潔な引き渡し – 保証付き。", pl: "財務的価値", c: "保証を追加" },
            sig_storage_rot: { h: "倉庫ローテーション", d: "すべてを一度に移す必要はありません。", pl: "物流的価値", c: "ローテーションを申請" },
            sig_kids_box: { h: "お子様引越しボックス", d: "お子様は引越しを異なる体験をします。", pl: "教育的価値", c: "お子様ボックスを注文" },
            sig_service_24h: { h: "24時間引越しサービス", d: "待てない引越しもあります。", pl: "時間的価値", c: "24時間サービスを申請" },
            sig_ladies_team: { h: "女性チーム", d: "特別な配慮が必要な状況もあります。", pl: "個人的価値", c: "女性チームを申請" },
            sig_memory_capsule: { h: "メモリーカプセル", d: "記憶に値する場所があります。", pl: "感情的価値", c: "カプセルを追加" },
            sig_maybe_box: { h: "「もしかして」ボックス", d: "すべての決断が即座である必要はありません。", pl: "決断の価値", c: "ボックスを申請" },
            sig_key_handover: { h: "鍵の引き渡し", d: "文書化。安全。追跡可能。", pl: "法的価値", c: "鍵の引き渡しを予約" }
        }
    }));

console.log('Japanese done.');
