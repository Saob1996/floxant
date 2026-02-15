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

// ===== CHINESE =====
gen('zh', { title: "服务区域", hub_note: "FLOXANT总部位于杜塞尔多夫。我们的运营中心位于雷根斯堡和上普法尔茨。从这里，我们为巴伐利亚全境的客户提供服务，并提供全德长途搬迁服务。", description: "总部位于杜塞尔多夫。运营中心位于雷根斯堡。", cities: { regensburg: "雷根斯堡", bavaria: "巴伐利亚", munich: "慕尼黑", nuremberg: "纽伦堡", augsburg: "奥格斯堡", germany: "全德国" } },
    apply({
        mi: "您在", mu: "慕尼黑的搬迁", mh: "轻松搬迁至巴伐利亚首府。FLOXANT提供固定价格保证的优质搬迁服务。", mb: "慕尼黑及周边", mit: "慕尼黑搬迁 – 周密计划，精准执行", mi1: "慕尼黑是一座充满活力的大都市。在巴伐利亚首府搬迁往往是一项物流挑战。狭窄的楼梯、停车位不足 – 这些条件需要经验和良好的规划。", mi2: "FLOXANT是精通这些挑战的搬迁服务。我们不是简单地开始工作 – 我们详细规划您的搬迁。",
        tt: "关于总部的透明度", tx: "FLOXANT的法定总部位于杜塞尔多夫。然而我们的团队定期在慕尼黑工作。", pt: "我们的慕尼黑服务组合", cm: "慕尼黑市内搬迁", cd: "市内快速高效。", rm: "慕尼黑长途搬迁", rd: "从伊萨尔河到莱茵河。物流优化。", cl: "清理", cld: "专业处理旧家具。", dt: "慕尼黑特点", dtx: "每个城市都有其特点。", lt: "从巴伐利亚到全德国", ltx: "许多客户从慕尼黑搬到其他大城市。", prt: "透明价格，无意外", prx: "慕尼黑已经够贵了。我们坚持绝对的价格透明。", fi: "免费检查：通过视频通话提前评估。", fis: "含保险：您的家具完全受保。", fs: "专业团队：经验丰富，细致认真。", ln: "其他地区", mct: "您的慕尼黑报价", mcx: "立即开始咨询。",
        cb: "基础服务", fw: "适合哪些人群？", pr: "我们的流程", gt: "我们的保证",
        umt: "私人搬迁", umd: "FLOXANT以精准和细心陪伴您的私人搬迁。", uht: "私人搬迁", uhd: "搬迁不只是运输，更是一次人生转变。", uit: "您的搬迁 – 考虑到每一个细节", up1: "私人搬迁涉及生活的方方面面。个人物品、珍贵回忆 – 一切都需要个别关注。", up2: "我们的团队按照清晰的流程工作，确保每个环节完全透明。", ufi: ["重视细心服务的个人和家庭", "市内或区域住宅搬迁", "需要特殊保护贵重物品的搬迁"], ups: [{ title: "评估", desc: "免费上门或视频检查。" }, { title: "固定价格", desc: "透明报价，无隐藏费用。" }, { title: "执行", desc: "专业打包，安全运输。" }, { title: "交付", desc: "安装、布置和清洁。" }], ugu: ["固定价格保证", "全额保险", "专业培训团队"], uct: "提交免费咨询", ucx: "从个性化报价开始。",
        bmt: "办公室搬迁", bmd: "FLOXANT组织您的办公室搬迁，最小化停工时间。", bbg: "商业", bht: "办公室搬迁", bhd: "业务连续性需要规划。", bit: "精准的企业搬迁", bp1: "办公室搬迁涉及活跃的业务流程。IT基础设施、机密文件 – 每个细节都必须正确。", bp2: "我们协调所有工作。", bfi: ["各种规模的企业", "律师事务所", "最小化停工的企业"], bps: [{ title: "项目规划", desc: "详细分析。" }, { title: "协调", desc: "与IT团队联络。" }, { title: "执行", desc: "在指定时间窗口搬迁。" }, { title: "启用", desc: "工作站配置。" }], bgu: ["保证时间窗口", "IT保险", "谨慎处理"], bct: "规划办公搬迁", bcx: "让我们一起规划。",
        fmt: "长途搬迁", fmd: "FLOXANT组织从巴伐利亚出发的长途搬迁。", fbg: "长途", fht: "长途搬迁", fhd: "距离不是障碍。", fit: "精准的长途搬迁", fp1: "长途搬迁需要特殊的规划质量。", fp2: "从雷根斯堡到汉堡，从慕尼黑到柏林。", ffi: ["工作变动", "搬迁家庭", "员工调动"], fps: [{ title: "路线规划", desc: "最优路线。" }, { title: "打包", desc: "专业材料。" }, { title: "运输", desc: "GPS跟踪。" }, { title: "送达", desc: "准时送达。" }], fgu: ["全程固定价格", "全额保险", "准时保证"], fct: "咨询长途搬迁", fcx: "您想搬到哪里？",
        rmt: "专业清洁", rmd: "FLOXANT提供专业的终期清洁服务。", rbg: "清洁", rht: "清洁", rhd: "清洁是良好结束和新开始的基础。", rit: "系统化的终期清洁", rp1: "终期清洁是退还押金的关键因素。", rp2: "我们的团队工作精准高效。", rfi: ["退租租户", "出售业主", "商业场所"], rps: [{ title: "检查", desc: "状态评估。" }, { title: "执行", desc: "系统清洁。" }, { title: "质量控制", desc: "拍照记录验收。" }, { title: "移交", desc: "清洁移交。" }], rgu: ["达到房东标准", "含拍照记录", "有理由则重新清洁"], rct: "预订清洁", rcx: "预订专业终期清洁。",
        emt: "清理清运", emd: "FLOXANT专业清运物业。", ebg: "处置", eht: "清理清运", ehd: "放手需要信任。我们专业且环保地清运。", eit: "负责任的清运", ep1: "清运不仅仅是搬走东西。", ep2: "我们专业分类，环保处置。", efi: ["住宅清算", "商业清运", "个人"], eps: [{ title: "现场查看", desc: "共同清点。" }, { title: "清运", desc: "系统化清运。" }, { title: "处置", desc: "专业分类处置。" }, { title: "最终状态", desc: "清洁移交。" }], egu: ["环保处置有记录", "谨慎处理", "保证清洁移交"], ect: "咨询清运", ecx: "联系我们。",
        mmt: "专业安装", mmd: "FLOXANT专业安装家具和厨房。", mbg: "安装", mht: "安装", mhd: "细节中的精准。", mmit: "专业安装", mp1: "优质家具值得专业安装。", mp2: "从IKEA书架到设计师厨房。", mfi: ["搬迁后", "商业客户", "厨房安装"], mps: [{ title: "准备", desc: "检查说明书。" }, { title: "安装", desc: "专业安装。" }, { title: "功能测试", desc: "活动部件测试。" }, { title: "最终检查", desc: "清洁工作区。" }], mgu: ["专业安装", "保护表面", "清洁工作区"], mct: "预订安装", mcx: "专业安装，毫不妥协。",
        hmt: "禁停区域", hmd: "FLOXANT办理禁停区域。", hbg: "物流", hht: "禁停区域", hhd: "通畅通道是搬迁成功的基础。", hit: "禁停区域 – 及时合法", hp1: "在许多城市区域需要官方禁停区。", hp2: "FLOXANT负责整个流程。", hfi: ["市中心搬迁", "商业搬迁", "任何需要保证通道的搬迁"], hps: [{ title: "申请", desc: "向有关部门提交。" }, { title: "批准", desc: "跟进确认。" }, { title: "设置", desc: "放置标志。" }, { title: "拆除", desc: "搬迁后拆除。" }], hgu: ["完整的官方办理", "及时设置", "全程服务"], hct: "申请禁停区", hcx: "确保通畅通道。",
        rrmt: "雷根斯堡清洁", rrmd: "雷根斯堡专业清洁。", rrhp: "专业清洁在", rrhd: "我们的运营中心。", rrit: "雷根斯堡终期清洁", rrp1: "运营基地。", rrp2: "记录化流程。", rrst: "清洁服务", rrec: "终期清洁", rred: "完整清洁。", rrcc: "施工后清洁", rrcd: "装修后清洁。", rroc: "办公室清洁", rrod: "定期或一次性。", rrct: "在雷根斯堡预订", rrcx: "预约。",
        ermt: "雷根斯堡清运", ermd: "FLOXANT在雷根斯堡清运。", erhp: "清运在", erhd: "放手是一个过程。", erit: "雷根斯堡清运", erp1: "运营中心。", erp2: "现场分类。", erst: "清运服务", erhh: "住宅清算", erhhd: "完整清运。", erco: "商业清运", ercod: "办公室和仓库。", erpa: "部分清运", erpad: "选定房间。", erct: "咨询清运", ercx: "联系我们。",
        brmt: "雷根斯堡办公搬迁", brmd: "FLOXANT在雷根斯堡组织。", brhp: "办公搬迁在", brhd: "业务连续性。", brit: "雷根斯堡办公搬迁", brp1: "雷根斯堡商业增长。", brp2: "我们协调搬迁。", brst: "办公搬迁服务", brfm: "完整搬迁", brfd: "办公室和IT。", brir: "IT迁移", brid: "专业断接。", brwm: "周末搬迁", brwd: "工作时间外。", brct: "规划搬迁", brcx: "一起规划。",
        sb: "尊享Signature体验", fws: "谁适合这种体验？",
        sg: {
            sig_ritual_exit: { h: "告别仪式盒", d: "离开一个家就是关上一个篇章。", pl: "心理价值", c: "添加仪式盒" },
            sig_clean_start: { h: "清新开始仪式", d: "在摆放家具之前，我们先准备空间。", pl: "心理价值", c: "预订清新开始" },
            sig_neighbour_kit: { h: "新邻居套装", d: "第一印象很重要。", pl: "社交价值", c: "订购邻居套装" },
            sig_first_48h: { h: "前48小时套餐", d: "新家的前几个小时至关重要。", pl: "实用价值", c: "预订48小时套餐" },
            sig_bureaucracy: { h: "官僚盾牌", d: "手续是每次搬迁的一部分。", pl: "组织价值", c: "申请官僚盾牌" },
            sig_furniture_opt: { h: "家具优化", d: "布置，而不只是放置。", pl: "设计价值", c: "申请家具优化" },
            sig_cleaning_guarantee: { h: "清洁保证", d: "清洁移交 – 有保证。", pl: "财务价值", c: "添加清洁保证" },
            sig_storage_rot: { h: "仓储轮换", d: "不是所有东西都要一次搬完。", pl: "物流价值", c: "申请仓储轮换" },
            sig_kids_box: { h: "儿童搬家盒", d: "孩子对搬家的体验不同。", pl: "教育价值", c: "订购儿童盒" },
            sig_service_24h: { h: "24小时搬迁服务", d: "有时候搬迁等不了。", pl: "时间价值", c: "申请24小时服务" },
            sig_ladies_team: { h: "女性团队", d: "某些情况需要特别的敏感度。", pl: "个人价值", c: "申请女性团队" },
            sig_memory_capsule: { h: "记忆胶囊", d: "有些地方值得被铭记。", pl: "情感价值", c: "添加记忆胶囊" },
            sig_maybe_box: { h: "也许盒子", d: "不是每个决定都必须立刻做出。", pl: "决策价值", c: "申请也许盒子" },
            sig_key_handover: { h: "钥匙交接", d: "有记录。安全。可追溯。", pl: "法律价值", c: "预订钥匙交接" }
        }
    }));

console.log('Chinese done.');
