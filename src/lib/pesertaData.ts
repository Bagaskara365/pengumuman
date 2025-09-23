export interface PesertaData {
  email: string;
  token: string;
  nama: string;
  status_lolos: 'LOLOS' | 'TIDAK LOLOS';
  program_studi: string;
  fakultas: string;
  divisi: string;
  pesan_khusus: string;
}

// Static data instead of CSV for easier management
const pesertaData: PesertaData[] = [
  {
    email: "ahmad.budi@email.com",
    token: "ABC123",
    nama: "Ahmad Budi Santoso",
    status_lolos: "LOLOS",
    program_studi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    divisi: "Program",
    pesan_khusus: "Selamat! Anda lolos ke tahap wawancara"
  },
  {
    email: "siti.nurhaliza@email.com",
    token: "DEF456",
    nama: "Siti Nurhaliza",
    status_lolos: "LOLOS",
    program_studi: "Teknik Elektro",
    fakultas: "Fakultas Teknik",
    divisi: "Elektrik",
    pesan_khusus: "Selamat! Anda lolos ke tahap wawancara"
  },
  {
    email: "john.doe@email.com",
    token: "GHI789",
    nama: "John Doe",
    status_lolos: "TIDAK LOLOS",
    program_studi: "Teknik Mesin",
    fakultas: "Fakultas Teknik",
    divisi: "Mekanik",
    pesan_khusus: "Mohon maaf belum berhasil kali ini"
  },
  {
    email: "jane.smith@email.com",
    token: "JKL012",
    nama: "Jane Smith",
    status_lolos: "LOLOS",
    program_studi: "Teknik Industri",
    fakultas: "Fakultas Teknik",
    divisi: "Mekanik",
    pesan_khusus: "Selamat! Anda lolos ke tahap wawancara"
  },
  {
    email: "muhammad.rizki@email.com",
    token: "MNO345",
    nama: "Muhammad Rizki",
    status_lolos: "LOLOS",
    program_studi: "Sistem Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    divisi: "Program",
    pesan_khusus: "Selamat! Anda lolos ke tahap wawancara"
  },
  {
    email: "sarah.amanda@email.com",
    token: "PQR678",
    nama: "Sarah Amanda",
    status_lolos: "TIDAK LOLOS",
    program_studi: "Teknik Sipil",
    fakultas: "Fakultas Teknik",
    divisi: "Elektrik",
    pesan_khusus: "Mohon maaf belum berhasil kali ini"
  }
];

export const loadPesertaData = async (): Promise<PesertaData[]> => {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => resolve(pesertaData), 100);
  });
};

export const validateLogin = async (email: string, token: string): Promise<PesertaData | null> => {
  const data = await loadPesertaData();
  const peserta = data.find(p => p.email.toLowerCase() === email.toLowerCase() && p.token === token);
  return peserta || null;
};