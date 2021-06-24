import express from 'express';
// app.use( morgan(':method :url :status :response-time ms - :res[content-length]') );

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`This server is running at localhost:${PORT}`);
});
