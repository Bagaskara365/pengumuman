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
  whatsapp_link?: string;
}

// Function to automatically generate message based on status
const generateMessage = (status: 'LOLOS' | 'TIDAK LOLOS'): string => {
  if (status === 'LOLOS') {
    return 'Selamat! Anda lolos ke tahap wawancara. Silakan bergabung dengan grup WhatsApp untuk informasi lebih lanjut.';
  }
  return 'Mohon maaf belum berhasil kali ini. Terima kasih atas partisipasi Anda dan semangat untuk kesempatan berikutnya!';
};

// Function to load CSV data from data folder
const loadCSVData = async (): Promise<PesertaData[]> => {
  try {
    const csvModule = await import('../data/pesertalolos.csv?raw');
    const csvContent = csvModule.default;
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const pesertaData: PesertaData[] = results.data.map((row: any) => {
              const nama = row.Nama || '';
              const username = row.Username || '';
              const token = row.Token || '';
              const hasil = row.Hasil || '';
              const jurusan = row.Jurusan || '';
              const fakultas = row.Fakultas || '';
              const divisi = row.Divisi || '';
              
              let status: 'LOLOS' | 'TIDAK LOLOS' = 'TIDAK LOLOS';
              if (hasil && hasil.trim().toLowerCase() === 'lolos') {
                status = 'LOLOS';
              }
              
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
                pesan_khusus: generateMessage(status),
                whatsapp_link: status === 'LOLOS' ? 'https://chat.whatsapp.com/HygTyDHTuTcAbf9YPhaId7?mode=ems_copy_t' : undefined
              };
            }).filter(p => p.username && p.token && p.nama);
            
            resolve(pesertaData);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// Fallback data in case CSV loading fails
const getFallbackData = (): PesertaData[] => {
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
      pesan_khusus: generateMessage("LOLOS"),
      whatsapp_link: "https://chat.whatsapp.com/HygTyDHTuTcAbf9YPhaId7?mode=ems_copy_t"
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
    }
  ];
};

export const loadPesertaData = async (): Promise<PesertaData[]> => {
  try {
    return await loadCSVData();
  } catch (error) {
    return getFallbackData();
  }
};

export const validateLogin = async (username: string, token: string): Promise<PesertaData | null> => {
  const data = await loadPesertaData();
  const peserta = data.find(p => 
    p.username.toLowerCase() === username.toLowerCase() && 
    p.token === token
  );
  
  return peserta || null;
};