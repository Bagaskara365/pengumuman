import { useState, useEffect } from "react";
import { loadPesertaData, PesertaData } from "@/lib/pesertaData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DebugDataComponent = () => {
  const [data, setData] = useState<PesertaData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const pesertaData = await loadPesertaData();
      setData(pesertaData);
      console.log('🔍 Loaded data for debugging:', pesertaData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('❌ Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Card className="p-6 m-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">🔍 Debug Data Excel</h2>
        <Button onClick={loadData} disabled={loading}>
          {loading ? 'Loading...' : 'Reload Data'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Data Loaded: {data.length} records
        </h3>
        
        {data.map((peserta, index) => (
          <div key={index} className="border p-4 rounded bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Username:</strong> {peserta.username}
              </div>
              <div>
                <strong>Token:</strong> {peserta.token}
              </div>
              <div>
                <strong>Email:</strong> {peserta.email}
              </div>
              <div>
                <strong>Nama:</strong> {peserta.nama}
              </div>
              <div>
                <strong>Status:</strong> {peserta.status_lolos}
              </div>
              <div>
                <strong>Program Studi:</strong> {peserta.program_studi}
              </div>
            </div>
            <div className="mt-2">
              <strong>Pesan:</strong> {peserta.pesan_khusus}
            </div>
            <div className="mt-2 text-sm text-blue-600">
              <strong>Login Test:</strong> username: <code>{peserta.username}</code>, token: <code>{peserta.token}</code>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};