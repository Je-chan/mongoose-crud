require('dotenv').config();
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const schema = require('./schema');

const db = mongoose.connection;

const model = (() => {
  db.on('error', console.error);
  db.on('open', () => {
    console.log('Connecting mongoDB');
  });

  // Atlas mongoDB cluster 와 연결
  mongoose.connect(
    `mongodb+srv://${process.env.MONGOOSE_ID}:${process.env.MONGOOSE_PASSWORD}@mongodb-crud.g6uxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );

  // 스키마 연결
  const model = {};
  // 스키마는 여러가지가 있을 수 있다.
  // 여러 개가 있어서 루프를 돌 수 있으므로, 일단 한 개밖에 없지만 for 로 돌려서 일반적인 경우를 확인
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }

  return model;
})();

module.exports = model;
