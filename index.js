const express = require('express');
const app = express();
const port = 3000;

const data = require('./data_dinkes.json');

app.use(express.json());

app.post('/webhook', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;
  
  let responseText = "Maaf, saya belum punya informasi tentang itu.";

  if (intent === "JadwalVaksin") {
    responseText = data.jadwal_vaksin;
  } else if (intent === "AlamatPuskesmas") {
    const lokasi = parameters.lokasi.toLowerCase();
    responseText = data.alamat_puskesmas[lokasi] || "Maaf, lokasi puskesmas tidak ditemukan.";
  } else if (intent === "KontakDinkes") {
    responseText = data.kontak_dinkes;
  }

  return res.json({ fulfillmentText: responseText });
});

app.listen(port, () => {
  console.log(`Bot webhook listening at http://localhost:${port}`);
});
