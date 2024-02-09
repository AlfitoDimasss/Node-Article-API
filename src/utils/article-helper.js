const fs = require('fs');

const dataPath = './src/data/articles.json';

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadArticles = () => {
  const fileBuffer = fs.readFileSync('./src/data/articles.json', 'utf-8');
  const articles = JSON.parse(fileBuffer);
  return articles;
};

const saveArticles = (articles) => {
  fs.writeFileSync('./src/data/articles.json', JSON.stringify(articles));
};

const addArticles = (article) => {
  const articles = loadArticles();
  articles.push(article);
  saveArticles(articles);
};

const isArticleSaved = (id) => {
  const articles = loadArticles();
  return articles.filter((article) => article.id === id).length > 0;
}

const findArticleIndex = (id) => {
  const articles = loadArticles();
  return articles.findIndex((article) => article.id === id);
}

const deleteArticle = (id) => {
  const articles = loadArticles();
  const filteredArticles = articles.filter((article) => article.id != id);
  saveArticles(filteredArticles);
};

module.exports = {
  loadArticles,
  saveArticles,
  addArticles,
  isArticleSaved,
  findArticleIndex,
  deleteArticle,
};