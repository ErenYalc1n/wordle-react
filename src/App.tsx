import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [word, setWord] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://wordle-webapi-production.onrender.com/api/DailyWords/today')
      .then(res => {
        setWord(res.data.word || 'Kelime yok'); // response { word: "KAVUN" } gibi olmalı
      })
      .catch(err => {
        // API'den gelen hata mesajını al
        const msg = err.response?.data?.error || 'Sunucu hatası';
        setError(msg);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Wordle Günü</h1>
      {word && <p>Bugünün kelimesi: <strong>{word}</strong></p>}
      {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
      {!word && !error && <p>Yükleniyor...</p>}
    </div>
  );
}

export default App;
