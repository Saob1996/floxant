const fs = require('fs');
const zhLines = fs.readFileSync('dictionaries/zh.json', 'utf8').split('\n');

// Check exactly what's on critical lines
const checks = [2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2229, 2260, 2261, 2262, 2263, 2264];

checks.forEach(lineNum => {
  const idx = lineNum - 1;
  const line = zhLines[idx] || '';
  // Escape for safe display, keep CJK
  const safe = JSON.stringify(line);
  const display = safe.length > 200 ? safe.substring(0, 200) + '...' : safe;
  fs.appendFileSync('line_check.txt', 'L' + lineNum + ': ' + display + '\n');
});
