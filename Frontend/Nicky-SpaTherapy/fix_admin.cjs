const fs = require('fs');
const path = 'src/layouts/AdminLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');

// Show exact content around line 46-49 to detect whitespace
console.log('Line 46 chars:', JSON.stringify(lines[45]));
console.log('Line 47 chars:', JSON.stringify(lines[46]));
console.log('Line 48 chars:', JSON.stringify(lines[47]));
console.log('Line 49 chars:', JSON.stringify(lines[48]));

// Manually fix by inserting </div> after line 47 (index 46)
// Check if line 47 ends </div> and line 49 starts with <nav
if (lines[45].includes('Admin Panel') && lines[46].includes('</div>') && lines[48].includes('<nav')) {
  console.log('Need to insert closing div after line 47');
  lines.splice(47, 0, '        </div>');
  content = lines.join('\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Fixed!');
} else {
  console.log('Pattern not matched. Current structure:');
  for (let i = 42; i < 52; i++) console.log((i+1) + ': ' + lines[i]);
}
