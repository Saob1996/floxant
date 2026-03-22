const fs = require('fs');
const files = [
  'components/calculator/ExpressCalculator.tsx',
  'components/calculator/LeadCaptureForm.tsx',
  'components/calculator/forms/EntsorgungForm.tsx',
  'components/calculator/forms/ReinigungForm.tsx',
  'components/calculator/forms/UmzugForm.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
      let c = fs.readFileSync(f, 'utf8');
      c = c.replace(/import\s+\{([^}]*)motion([^}]*)\}\s+from\s+['"]framer-motion['"]/, (match, p1, p2) => {
        return 'import {' + p1 + 'm' + p2 + '} from "framer-motion"';
      });
      c = c.replace(/<motion\./g, '<m.');
      c = c.replace(/<\/motion\./g, '</m.');
      fs.writeFileSync(f, c);
      console.log('Fixed:', f);
  }
});
console.log('DONE');
