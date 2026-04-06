const fs = require('fs');
const glob = require('glob');
const paths = [
 '24h-umzug-bayern', 'buero-umzug-regensburg', 'familienumzug-bayern', 
 'halteverbotszone-muenchen', 'halteverbotszone-nuernberg', 'halteverbotszone-regensburg', 
 'klaviertransport-muenchen', 'klaviertransport-nuernberg', 'klaviertransport-regensburg', 
 'kleintransporte', 'kurzfristiger-umzug-bayern', 'notfall-umzug-bayern', 
 'seniorenumzug-bayern', 'seniorenumzug-muenchen', 'seniorenumzug-nuernberg', 
 'seniorenumzug-regensburg', 'studentenumzug-regensburg', 'umzugskosten-bayern', 
 'wohnungsaufloesung-bayern'
];

paths.forEach(p => {
   const file = 'app/[lang]/' + p + '/page.tsx';
   if(fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const match = content.match(/title:\s*['"](.*?)['"]/);
      if (match) {
         console.log(p, '=>', match[1]);
      } else {
         console.log(p, '=> No static title match');
      }
      
      const hasGetDict = content.includes('getDictionary');
      const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/s);
      
      console.log(' - Using Dict?', hasGetDict);
      if (h1Match) console.log(' - H1:', h1Match[1].trim().substring(0, 50));
   }
});
