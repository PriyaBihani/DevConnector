// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import fs from 'fs';

// import App from './client/src/App';

const express = require('express');
const connectDb = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDb();

// Init Middleware - body Parser
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// app.get('/', (req, res) => {
//    const app = ReactDOMServer.renderToString(<App />);

//    const indexFile = path.resolve('./client/build/index.html');

//    fs.readFile(indexFile, 'utf-8', (err, data) => {
//       if (err) {
//          console.log('Something went wrong:', err);
//          return res.status(500).send('Ooops, better luck next time!');
//       }

//       return res.send(
//          data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
//       );
//    });
// });

// app.use(express.static('./client/build'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//    // Set static folder
//    app.use(express.static('client/build'));

//    app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//    });
// }

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
