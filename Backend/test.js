// ! Key: Access .default for jsPDF-AutoTable under require()
const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable').default;

// Test script
const doc = new jsPDF();
autoTable(doc, {
  head: [['A', 'B']],
  body: [['Hello', 'World']],
});
require('fs').writeFileSync('test.pdf', Buffer.from(doc.output('arraybuffer')));
console.log('PDF generated!');
