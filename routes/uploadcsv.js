const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const router = express.Router();


// Set up Multer for CSV file uploads
const uploadFolder = path.join(__dirname, '../uploads');
const maxFiles = 10;

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Define upload folder
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `transactions_${timestamp}.csv`);
  },
});

const upload = multer({ storage: storage });

// Upload CSV file route
router.post('/upload-csv', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the list of files in the folder
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory.');
    }

    // If there are more than 'maxFiles', remove the oldest file
    if (files.length > maxFiles) {
      files.sort((a, b) => {
        const aTime = fs.statSync(path.join(uploadFolder, a)).birthtime;
        const bTime = fs.statSync(path.join(uploadFolder, b)).birthtime;
        return aTime - bTime; // ascending order
      });

      // Remove the oldest file
      fs.unlink(path.join(uploadFolder, files[0]), (err) => {
        if (err) {
          console.error('Error deleting old file:', err);
        }
      });
    }

    // Update the active CSV tracking file
    const activeFilePath = path.join(uploadFolder, 'activeFile.json');
    fs.writeFileSync(activeFilePath, JSON.stringify({ activeCsv: req.file.filename }));

    // Send success response
    res.json({ message: "CSV uploaded successfully!" });
  });
});

// Endpoint to fetch the active CSV (optional for frontend to track active file)
router.get('/csv-records', (req, res) => {
  const activePath = path.join(uploadFolder, 'activeFile.json');

  if (!fs.existsSync(activePath)) {
    return res.status(404).send('No active CSV found.');
  }

  const activeCsv = JSON.parse(fs.readFileSync(activePath)).activeCsv;
  const csvFilePath = path.join(uploadFolder, activeCsv);

  if (!fs.existsSync(csvFilePath)) {
    return res.status(404).send('Active CSV file missing.');
  }

  const csvData = fs.readFileSync(csvFilePath, 'utf8');
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true
  });

  res.json({
    activeCsv,
    records: result.data
  });
});

module.exports = router;