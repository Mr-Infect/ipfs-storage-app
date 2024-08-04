const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

let ipfs;

(async () => {
  const { create } = await import('ipfs-http-client');
  ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

  // Route for uploading files to IPFS
  app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const data = fs.readFileSync(file.path);
      const result = await ipfs.add(data);
      res.json({ hash: result.path });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();

