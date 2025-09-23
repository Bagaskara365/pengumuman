import Papa from 'papaparse';

export interface PesertaData {
  username: string;
  email: string;
  token: string;
  nama: string;
  status_lolos: 'LOLOS' | 'TIDAK LOLOS';
  program_studi: string;
  fakultas: string;
  divisi: string;
  pesan_khusus: string;
}

// Function to automatically generate message based on status
const generateMessage = (status: 'LOLOS' | 'TIDAK LOLOS'): string => {
  return status === 'LOLOS' 
    ? 'Selamat! Anda lolos ke tahap wawancara'
    : 'Mohon maaf belum berhasil kali ini';
};

// Function to load CSV data from data folder
const loadCSVData = async (): Promise<PesertaData[]> => {
  try {
    console.log('🔄 Loading CSV data from data/pesertalolos.csv...');
    
    // Import the CSV file directly
    const csvModule = await import('../data/pesertalolos.csv?raw');
    const csvContent = csvModule.default;
    
    console.log('📄 CSV content loaded, parsing...');
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            console.log('📊 Raw CSV data:', results.data);
            
            const pesertaData: PesertaData[] = results.data.map((row: any) => {
              // Map CSV columns to our interface
              const nama = row.Nama || '';
              const username = row.Username || '';
              const token = row.Token || '';
              const hasil = row.Hasil || '';
              const jurusan = row.Jurusan || '';
              const fakultas = row.Fakultas || '';
              const divisi = row.Divisi || '';
              
              // Determine status - if Hasil is empty, default to 'TIDAK LOLOS'
              let status: 'LOLOS' | 'TIDAK LOLOS' = 'TIDAK LOLOS';
              if (hasil && hasil.toLowerCase().includes('lolos')) {
                status = 'LOLOS';
              }
              
              // Generate email from username
              const email = username ? `${username}@email.com` : '';
              
              return {
                username: username,
                email: email,
                token: token,
                nama: nama,
                status_lolos: status,
                program_studi: jurusan,
                fakultas: fakultas,
                divisi: divisi,
                pesan_khusus: generateMessage(status)
              };
            }).filter(p => p.username && p.token && p.nama); // Filter out invalid entries
            
            console.log('✅ CSV data processed successfully:', pesertaData.length, 'records');
            console.log('👥 Available users:', pesertaData.map(p => ({ 
              username: p.username, 
              token: p.token, 
              nama: p.nama,
              status: p.status_lolos 
            })));
            
            resolve(pesertaData);
          } catch (error) {
            console.error('❌ Error processing CSV data:', error);
            reject(error);
          }
        },
        error: (error) => {
          console.error('❌ Error parsing CSV:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('❌ Error loading CSV file:', error);
    throw error;
  }
};

// Fallback data in case CSV loading fails
const getFallbackData = (): PesertaData[] => {
  console.log('⚠️ Using fallback data');
  return [
    {
      username: "hathaya.hafiz",
      email: "hathaya.hafiz@email.com",
      token: "9wxL1sCKod",
      nama: "Hathaya Mikail Hafiz",
      status_lolos: "LOLOS",
      program_studi: "Teknik Elektro",
      fakultas: "Fakultas Teknik",
      divisi: "Elektrik",
      pesan_khusus: generateMessage("LOLOS")
    },
    {
      username: "rizky.afitra",
      email: "rizky.afitra@email.com",
      token: "LM3JL11QKy",
      nama: "Rizky Afitra",
      status_lolos: "TIDAK LOLOS",
      program_studi: "Teknik Komputer",
      fakultas: "Fakultas Teknik",
      divisi: "Elektrik",
      pesan_khusus: generateMessage("TIDAK LOLOS")
    },
    {
      username: "bryan.saragih",
      email: "bryan.saragih@email.com",
      token: "Ccmkirkk7u",
      nama: "Bryan Nathanael Saragih",
      status_lolos: "TIDAK LOLOS",
      program_studi: "Teknik Elektro",
      fakultas: "Fakultas Teknik",
      divisi: "Program",
      pesan_khusus: generateMessage("TIDAK LOLOS")
    },
    {
      username: "wilyan.buwono",
      email: "wilyan.buwono@email.com",
      token: "F1oO1mXJ2T",
      nama: "Wilyan Purbo Buwono",
      status_lolos: "TIDAK LOLOS",
      program_studi: "Informatika",
      fakultas: "Fakultas Sains dan Matematika",
      divisi: "Program",
      pesan_khusus: generateMessage("TIDAK LOLOS")
    }
  ];
};

export const loadPesertaData = async (): Promise<PesertaData[]> => {
  try {
    return await loadCSVData();
  } catch (error) {
    console.error('❌ Failed to load CSV data, using fallback:', error);
    return getFallbackData();
  }
};

export const validateLogin = async (username: string, token: string): Promise<PesertaData | null> => {
  console.log('🔐 Validating login:', { username, token });
  
  const data = await loadPesertaData();
  const peserta = data.find(p => 
    p.username.toLowerCase() === username.toLowerCase() && 
    p.token === token
  );
  
  console.log('🎯 Login result:', peserta ? `✅ Success: ${peserta.nama}` : '❌ Failed');
  return peserta || null;
};