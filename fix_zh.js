const fs = require('fs');

const zhPath = 'dictionaries/zh.json';
const content = fs.readFileSync(zhPath, 'utf8');
const lines = content.split('\n');

const hemauRepair = `    "umzug_hemau": {
      "meta_title": "Hemau 搬家起价 79 欧元 – 立即预订 | FLOXANT",
      "faqs": [
        {
          "q": "在 Hemau 搬家需要多少钱？",
          "a": "带搬运工的货车通常以优惠的起步价提供。对于普通家庭，我们根据房间数量和运输距离计算量身定制的固定价格，通常在 400 欧元到 1,500 欧元之间。"
        },
        {
          "q": "在 Hemau 预订搬家日期需要多长时间？",
          "a": "由于我们的调度中心位于附近的雷根斯堡，我们通常可以在 Hemau 实现非常短期的搬家或紧急预约。"
        },
        {
          "q": "您负责 Hemau 的禁止停车区吗？",
          "a": "是的，绝对负责。如果您的家门口停车位紧张，我们会负责正式申请以及由当地政府设置禁止停车标志。"
        },
        {
          "q": "您在 Hemau 也提供厨房安装服务吗？",
          "a": "我们会专业地拆除您的厨房并安全地包装零件。在可行范围内，我们也乐意负责专业的重新组装。"
        },
        {
          "q": "我需要自己准备搬家纸箱吗？",
          "a": "不需要。您可以很方便地通过我们租赁或购买坚固的搬家纸箱、衣物箱和内装纸。"
        }
      ]
    },
    "umzug_herzogenaurach": {
      "meta_title": "Herzogenaurach 搬家公司 ✓ 固定价格 ✓ 已投保 | FLOXANT",
      "faqs": [
        {
          "q": "在 Herzogenaurach 搬家需要多少钱？",
          "a": "费用取决于公寓大小、楼层和距离。学生搬家起价非常优惠。家庭搬家将在免费实地考察后获得量身定制的固定价格报价。"
        },
        {
          "q": "FLOXANT 在 Herzogenaurach 的响应速度有多快？",
          "a": "由于我们的团队每天在纽伦堡大都市区线路上行驶，我们通常可以在几天内实现在 Herzogenaurach 的预约。"
        },
        {
          "q": "我的搬家物品在 FLOXANT 有保险吗？",
          "a": "是的。每次运输都通过我们的商业责任保险和符合德国商法典 (HGB) §451g 的法定运输责任保险进行保障。"
        },
        {
          "q": "您在 Herzogenaurach 也提供清理服务吗？",
          "a": "是的。我们将搬家、清理和最终清洁组合成一个套餐。非常适合住宅搬迁或旧公寓需要保持‘扫帚清洁’状态移交的情况。"
        }
      ]
    },`;

// Find the boundaries
const startIndex = 2209; // 0-indexed line 2210
const endIndex = lines.findIndex(l => l.includes('"umzug_hohenfels": {'));

if (endIndex === -1) {
  console.error('Could not find umzug_hohenfels boundary');
  process.exit(1);
}

// Replace
const newLines = [
  ...lines.slice(0, startIndex),
  hemauRepair,
  ...lines.slice(endIndex)
];

const newContent = newLines.join('\n');
fs.writeFileSync(zhPath, newContent, 'utf8');
console.log('Successfully repaired zh.json');

// Verify validity
try {
  JSON.parse(newContent.replace(/[\u0000-\u001f]/g,''));
  console.log('JSON is valid');
} catch (e) {
  console.error('JSON is INVALID:', e.message);
  // Find where it breaks
  const linesAfterFix = newContent.split('\n');
  const errorMatch = e.message.match(/position (\d+)/);
  if (errorMatch) {
    const pos = parseInt(errorMatch[1]);
    const beforeError = newContent.substring(0, pos);
    const lineNum = beforeError.split('\n').length;
    console.error('Error likely around line:', lineNum);
    console.error('Context:', newContent.substring(pos - 20, pos + 20));
  }
}
