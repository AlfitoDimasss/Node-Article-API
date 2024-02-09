const { nanoid } = require('nanoid')
const { loadArticles, addArticles, isArticleSaved, findArticleIndex, saveArticles, deleteArticle } = require("./utils/article-helper");

// RENDER VIEW

const renderViewHandler = (request, h) => {
  return h.view('index');
};

// RENDER VIEW

// GET ALL ARTICLE

const getAllArticleHandler = () => ({
  status: 'success',
  total: loadArticles().length,
  articles: loadArticles(),
});

// GET ALL ARTICLE

// ADD ARTICLE

const addArticlesHandler = (request, h) => {
  const { title, image, link, description, channel } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newArticle = {
    id,
    title,
    image,
    link,
    description,
    channel,
    insertedAt,
    updatedAt,
  };

  addArticles(newArticle);

  const isSuccess = isArticleSaved(id);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Artikel berhasil ditambahkan',
      data: {
        id: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Artikel gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// ADD ARTICLE

// EDIT ARTICLE

const editArticleByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, image, link, description, channel } = request.payload;

  const articleIndex = findArticleIndex(id);

  if (articleIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui artikel. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const articles = loadArticles();
  articles[articleIndex] = {
    ...articles[articleIndex],
    title,
    image,
    link,
    description,
    channel,
    updatedAt,
  };

  saveArticles(articles);

  const response = h.response({
    status: 'success',
    message: 'Artikel berhasil diperbarui',
  });
  response.code(200);
  return response;
}

// EDIT ARTICLE

const deleteArticleByIdHandler = (request, h) => {
  const { id } = request.params;

  const articleIndex = findArticleIndex(id);

  if (articleIndex !== -1) {
    deleteArticle(id);
    const response = h.response({
      status: 'success',
      message: 'Artikel berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Artikel gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  renderViewHandler,
  getAllArticleHandler,
  addArticlesHandler,
  editArticleByIdHandler,
  deleteArticleByIdHandler,
};