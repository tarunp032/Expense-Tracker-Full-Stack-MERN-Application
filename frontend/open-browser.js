#!/usr/bin/env node
const open = require('open');
const http = require('http');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

// Function to check if server is running
const checkServer = (retries = 30) => {
  const req = http.get(url, { timeout: 5000 }, (res) => {
    if (res.statusCode === 200) {
      console.log(`\n✅ Server is ready! Opening ${url}...\n`);
      open(url).catch(() => {
        console.log(`Please open ${url} in your browser manually`);
      });
    }
  });

  req.on('error', () => {
    if (retries > 0) {
      setTimeout(() => checkServer(retries - 1), 500);
    } else {
      console.log(`\nPlease open ${url} in your browser manually\n`);
    }
  });

  req.on('timeout', () => {
    req.destroy();
    if (retries > 0) {
      setTimeout(() => checkServer(retries - 1), 500);
    }
  });
};

// Start checking after a short delay
setTimeout(() => {
  checkServer();
}, 2000);
