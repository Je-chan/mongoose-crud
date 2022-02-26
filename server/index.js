const express = require('express');
const cors = require('cors');
const app = express();
const { Article } = require('./api');
const PORT = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// req.body - post 에서 들어온 payload 를 받을 수 있게 된다.

// ! GET
app.get('/', (req, res) => {
  console.log('je');
  res.send('이거는 되지롱');
});
app.get('/read', Article.articleRead);

// ! POST
app.post('/create', Article.articleCreate);

// ! PATCH
app.patch('/update', Article.articleUpdate);

// ! DELETE
app.delete('/delete/:id', Article.articleDelete);

app.listen(PORT, 'localhost', () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});
