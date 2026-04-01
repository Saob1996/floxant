const fs = require('fs');

const zhPath = 'dictionaries/zh.json';
const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'));

// SEO Optimization for Regensburg (雷根斯堡) and Bavaria (巴伐利亚) in Chinese
// Following the user's goal: "Ziel, seite in der erste search ergebnisse in regensburg und bayern"

// Regensburg Specific Pages
if (zh.pages.umzug_regensburg) {
  zh.pages.umzug_regensburg.meta_title = "专业 雷根斯堡 搬家公司 (Regensburg) ✓ 固定价格 ✓ 已投保 | FLOXANT";
  zh.pages.umzug_regensburg.meta_desc = "在雷根斯堡 (Regensburg) 寻找优质搬家公司？FLOXANT 提供高效、透明价格的搬家、清洁和家具组装服务。立即通过我们的 24 小时服务咨询！";
}

if (zh.pages.reinigung_regensburg) {
  zh.pages.reinigung_regensburg.meta_title = "专业 雷根斯堡 清洁服务 (Regensburg) – 完美的公寓移交 | FLOXANT";
  zh.pages.reinigung_regensburg.meta_desc = "雷根斯堡 (Regensburg) 的专业扫帚和深度清洁。确保您的押金全额退回。立即预约您的清洁专家！";
}

if (zh.pages.entruempelung_regensburg) {
  zh.pages.entruempelung_regensburg.meta_title = "雷根斯堡 清运与处理 (Regensburg) – 快速、环保、透明 | FLOXANT";
  zh.pages.entruempelung_regensburg.meta_desc = "在雷根斯堡 (Regensburg) 快速、便捷地处理旧家具。无论住宅还是商业场所，我们都提供高性价比的清运服务。";
}

if (zh.pages.buero_umzug_regensburg) {
  zh.pages.buero_umzug_regensburg.meta_title = "雷根斯堡 办公室搬迁专家 (Regensburg) – 减少停机时间 | FLOXANT";
  zh.pages.buero_umzug_regensburg.meta_desc = "雷根斯堡 (Regensburg) 的专业公司搬迁。IT 基础设施搬迁、工作站安装，助您在几小时内重回正轨。";
}

// Bavaria/Bayern General Pages
if (zh.pages.umzug_bayern) {
  zh.pages.umzug_bayern.meta_title = "巴伐利亚 (Bayern) 领先搬家服务 – 全德范围 & 可靠 | FLOXANT";
  zh.pages.umzug_bayern.meta_desc = "在整个巴伐利亚州 (Bayern) 搬家从未如此简单。FLOXANT 是您跨地区搬迁、长途运输和优质服务的首选合作伙伴。";
}

if (zh.pages.reinigung_bayern) {
  zh.pages.reinigung_bayern.meta_title = "巴伐利亚 清洁服务 (Bayern) – 深度清洁与专业移交 | FLOXANT";
}

if (zh.pages.entruempelung_bayern) {
  zh.pages.entruempelung_bayern.meta_title = "巴伐利亚 清运服务 (Bayern) – 专业处理与废弃物清理 | FLOXANT";
}

// Additional keywords for general pages that mention Regensburg/Bayern often
if (zh.pages.umzug_checkliste) {
  zh.pages.umzug_checkliste.meta_title = "搬家清单 – 在雷根斯堡和巴伐利亚搬家的完美指南 | FLOXANT";
}

// Ensure "Regensburg" and "Bayern" appear together in home or common meta if applicable
if (zh.home) {
  zh.home.meta_title = "FLOXANT | 雷根斯堡 (Regensburg) 与巴伐利亚的顶级搬家公司";
  zh.home.meta_description = "您在雷根斯堡 (Regensburg) 和整个巴伐利亚的高级搬迁、清洁和清运合作伙伴。透明价格，专业团队，已投保。";
}

fs.writeFileSync(zhPath, JSON.stringify(zh, null, 2), 'utf8');
console.log('SEO optimization for Regensburg and Bavaria applied to zh.json');
