const fs = require('fs');
const files = ['dictionaries/de.json', 'dictionaries/en.json', 'dictionaries/ru.json'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\nFILE: ${file}`);
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('"common":') || trimmed.startsWith('"authority_magnet":')) {
      console.log(`  LINE ${i + 1}: ${trimmed}`);
    }
  });
});
