const express = require('express');

const app = express();

const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// req.body - post 에서 들어온 payload 를 받을 수 있게 된다.

app.get('/', (req, res) => {
  res.send('success');
});

app.listen(PORT, 'localhost', () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});
