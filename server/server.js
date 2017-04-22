'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

const assetFolder = path.join(__dirname, '../public');

app.use(express.static(assetFolder));

app.get('*', (req, res) => {
   res.sendFile(path.join(assetFolder, 'index.html'));
});

app.listen(port);
console.log('Server started and listening on port', port);
console.log('NODE_ENV:', process.env.NODE_ENV);