import express from 'express';

const app = express();
const port = 3001;

var helmet = require('helmet');
 app.use(helmet({
     crossOriginResourcePolicy: false
 }));
 app.use(express.json());
 app.use(express.urlencoded({
     limit: '5mb',
     extended: true
 }));
 const cors = require('cors');
 app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});