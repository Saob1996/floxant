const fs = require('fs');
const path = require('path');

const lang = process.argv[2];
if (!lang) {
  console.error("Please provide target language code (e.g. 'es')");
  process.exit(1);
}

const uniquePath = path.join(__dirname, 'unique_de.json');
const uniqueDe = JSON.parse(fs.readFileSync(uniquePath, 'utf8'));

const preserveWords = [
    "München", "Regensburg", "Nürnberg", "Bayern", "Deutschland", "Oberpfalz", "Niederbayern", 
    "Straubing", "Landshut", "Augsburg", "Ingolstadt", "Passau", "Erlangen", "Fürth", 
    "Würzburg", "Bamberg", "Bayreuth", "Amberg", "Weiden", "Neumarkt", "Schwandorf",
    "FLOXANT"
];

async function translateText(text) {
    if (!text || typeof text !== 'string') return text;
    
    let protectedMap = [];
    let processingText = text;
    
    preserveWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        processingText = processingText.replace(regex, (match) => {
            const placeholder = `__PROT${protectedMap.length}__`;
            protectedMap.push(match);
            return placeholder;
        });
    });

    processingText = processingText.replace(/<[^>]+>/g, (match) => {
        const placeholder = `__TAG${protectedMap.length}__`;
        protectedMap.push(match);
        return placeholder;
    });

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${lang}&dt=t&q=${encodeURIComponent(processingText)}`;
    
    try {
        let retries = 3;
        let res;
        while(retries > 0) {
            try {
                res = await fetch(url);
                if (res.ok) break;
            } catch(e) {}
            retries--;
            await new Promise(r => setTimeout(r, 1000));
        }

        const data = await res.json();
        let translatedText = '';
        if (data && data[0]) {
            data[0].forEach(item => {
                if (item[0]) translatedText += item[0];
            });
        } else {
            translatedText = processingText; 
        }

        protectedMap.forEach((original, index) => {
            const tagRegex = new RegExp(`__\\s*PROT${index}\\s*__`, 'gi');
            translatedText = translatedText.replace(tagRegex, original);

            const htmlRegex = new RegExp(`__\\s*TAG${index}\\s*__`, 'gi');
            translatedText = translatedText.replace(htmlRegex, original);
        });

        translatedText = translatedText.replace(/\s+([.,!?])/g, "$1");

        return translatedText;
    } catch (e) {
        return text;
    }
}

async function bulkTranslate() {
    console.log(`Starting bulk translation to ${lang}...`);
    const resultObj = {};
    const entries = Object.entries(uniqueDe);
    
    // We will collect all translation tasks
    const tasks = [];
    
    for (const [k, v] of entries) {
        if (typeof v === 'string') {
            tasks.push(async () => {
                resultObj[k] = await translateText(v);
            });
        } else if (Array.isArray(v)) {
            tasks.push(async () => {
                const translatedArr = [];
                for (const item of v) {
                    if (typeof item === 'string') {
                        translatedArr.push(await translateText(item));
                    } else if (typeof item === 'object') {
                        const [transQ, transA] = await Promise.all([
                            translateText(item.q),
                            translateText(item.a)
                        ]);
                        translatedArr.push({
                            original_q: item.original_q,
                            q: transQ,
                            a: transA
                        });
                    }
                }
                resultObj[k] = translatedArr;
            });
        }
    }

    // Process tasks with concurrency limit of 50
    const concurrency = 50;
    let completed = 0;
    for (let i = 0; i < tasks.length; i += concurrency) {
        const batch = tasks.slice(i, i + concurrency);
        await Promise.all(batch.map(fn => fn()));
        completed += batch.length;
        console.log(`Translated ${completed}/${tasks.length}`);
    }

    fs.writeFileSync(path.join(__dirname, `unique_${lang}.json`), JSON.stringify(resultObj, null, 2));
    console.log(`Translation complete. Saved to unique_${lang}.json!`);
}

bulkTranslate();
