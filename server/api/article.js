const { Article } = require('../mongoose/model');

// 아래의 코드들은 나중에 객체로 리팩토링 하면 좋을듯
// CREATE

const articleCreate = async (req, res) => {
  console.log(req.body);
  const { content } = req.body;

  // api 요청으로 받은 데이터를 Model 에 접목시켜서 객체를 하나 만듦
  const newArticle = await Article({ content });

  // 아래의 과정으로 DB 에 저장한다.
  const saveRequest = await newArticle.save();

  console.log(saveRequest);
  res.send(saveRequest);
};

// READ

const articleRead = async (req, res) => {
  // find 는 쿼리 검색. 객체 안에 특정 조건들을 넣을 수 있다.
  const articles = await Article.find({});
  res.send(articles);
};

// UPDATE
const articleUpdate = async (req, res) => {
  // article 의 id 와 수정할 내용을 가져온다.
  const { id, content } = req.body;
  const updateArticle = await Article.findByIdAndUpdate(id, { content });
  // updateArticle 은 업데이트된 내용이 아닌 이전 데이터를 담고 있다.
  res.send(updateArticle);
};

// DELETE
const articleDelete = async (req, res) => {
  const { id } = req.params;
  const deleteArticle = await Article.findByIdAndDelete(id);
  // deleteArticle 은 삭제된 컨텐츠의 내용을 담아낸다
  res.send(deleteArticle);
};

module.exports = {
  articleCreate,
  articleRead,
  articleUpdate,
  articleDelete,
};
