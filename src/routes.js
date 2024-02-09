const { renderViewHandler, getAllArticleHandler, addArticlesHandler, editArticleByIdHandler, deleteArticleByIdHandler } = require("./handler")

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: renderViewHandler,
  },
  {
    method: 'GET',
    path: '/articles',
    handler: getAllArticleHandler,
  },
  {
    method: 'POST',
    path: '/articles',
    handler: addArticlesHandler,
  },
  {
    method: 'PUT',
    path: '/articles/{id}',
    handler: editArticleByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: deleteArticleByIdHandler,
  },
];

module.exports = routes;