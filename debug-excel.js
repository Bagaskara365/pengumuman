// Test script untuk debug Excel data
// Buka browser console (F12) dan paste script ini untuk debug

async function testExcelData() {
  try {
    console.log('🧪 Testing Excel data loading...');
    
    // Test fetch Excel file
    const response = await fetch('/nama_format.xlsx');
    console.log('📁 Excel file response:', response.status, response.statusText);
    
    if (!response.ok) {
      console.error('❌ Failed to fetch Excel file');
      return;
    }
    
    // Import xlsx library (jika sudah loaded di halaman)
    const XLSX = window.XLSX || await import('xlsx');
    
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    console.log('📊 Workbook sheets:', workbook.SheetNames);
    
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log('📋 Raw Excel data:', jsonData);
    
    // Test username generation
    jsonData.forEach((row, index) => {
      const email = row.email || row.Email || '';
      const username = email.split('@')[0].replace(/\./g, '').toLowerCase();
      console.log(`👤 Row ${index + 1}:`, {
        email,
        username,
        token: row.token || row.Token,
        nama: row.nama || row.Nama,
        status: row.status_lolos || row.status
      });
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Jalankan test
testExcelData();