const express = require('express');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 7860

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', async (req, res) => {
  try {
    const targetUrl = `http://51.83.103.21:20057${req.originalUrl}`
    const response = await fetch(targetUrl)

    // Ambil semua headers penting dari VPS
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const contentDisposition = response.headers.get('content-disposition')
    const contentLength = response.headers.get('content-length')

    // Set headers ke client
    res.set('Content-Type', contentType)
    if (contentDisposition) res.set('Content-Disposition', contentDisposition)
    if (contentLength) res.set('Content-Length', contentLength)

    // Selalu ambil sebagai buffer dan kirim
    const buffer = await response.buffer()
    res.status(response.status).send(buffer)
  } catch (err) {
    // Modifikasi URL dalam error message dengan regex
    let modifiedErrorDetail = err.message

    // Ganti http://ipvps:port dengan https://zynnxy.koyeb.app
    modifiedErrorDetail = modifiedErrorDetail.replace(/http:\/\/193\.70\.34\.25:20025/g, 'https://zynxxy.koyeb.app')
    
    // Ganti ipvps:port dengan https://zynnxy.koyeb.app dalam detail error
    modifiedErrorDetail = modifiedErrorDetail.replace(/193\.70\.34\.25:20025/g, 'zynxxy.koyeb.app')

    // Kirim error yang sudah dimodifikasi
    console.error("Modified Error Detail:", modifiedErrorDetail)
    res.status(500).json({ error: 'Proxy error', detail: modifiedErrorDetail })
  }
})


app.listen(PORT, () => {
  console.log(`Universal proxy server running on port ${PORT}`)
})
