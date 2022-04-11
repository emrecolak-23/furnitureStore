// Import Packages
const express = require('express');

// Create express app
const app = express();

// Server Created
app.get('/', (req, res)=>{
  res.send('Emre Çolak');
});

// Declare Port Number
const PORT = process.env.PORT || 17000;
app.listen(PORT, ()=> {
  console.log(`Server listened at ${PORT}`);
});