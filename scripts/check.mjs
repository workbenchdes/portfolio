import { existsSync, readFileSync } from 'node:fs';
const required = ['index.html', 'src/app.jsx', 'src/styles.css', 'src/data/projects.json', 'src/data/brands.json'];
const missing = required.filter(file => !existsSync(file));
if (missing.length) { console.error('Missing project files:', missing.join(', ')); process.exit(1); }
for (const file of ['src/data/projects.json', 'src/data/brands.json']) JSON.parse(readFileSync(file, 'utf8'));
console.log('Source files and JSON data parse correctly.');
console.log('Bundled output check is separate: run npm run build after installing dependencies.');
