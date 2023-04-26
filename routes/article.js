var express = require('express');
var router = express.Router();
var articleService = require('../service/articleService');

router.get('/listeArticle', function(req, res, next) {
      fetch('http://localhost:5000/article').then( res => {
            if(!res){
                  console.error('Error fetching article')
            }
            return res.json();
      }).then(data => {
            res.render('article',{articles: data.data});
      }).catch(err => console.error(err));

});

router.get('/AddArticle', function(req, res, next) {
      res.render('addArticle')
});

router.get('/updateArticle/:id', function(req, res, next) {
      const {id} = req.params
      fetch('http://localhost:5000/article/'+id).then( res => {
            if(!res){
                  console.error('Error fetching article')
            }
            return res.json();
      }).then(data => {
            console.log(data.data)
            res.render('updateArticle',{articles: data.data});
      }).catch(err => console.error(err));
});

router.get('/', async function(req, res, next) {
    try {
        const articles = await articleService.getAllArticle();
        return res.status(201).json({data: articles});
  } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
  }
});

router.get('/:id', async function(req, res, next) {
    try {
        const {id} = req.params;
        const articles = await articleService.getArticleById(id);
        return res.status(201).json({data: articles});
  } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
  }
});

router.post('/', async function(req, res, next) {
  try {
        const body = req.body;
        const articles = await articleService.addArticle(body);
        return res.status(201).json({data: articles, message: "Article added successfully"});
} catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
}
});

router.put('/update', async function(req, res, next) {
      try {
            const body = req.body;
            const articles = await articleService.updateArticle(body);
            return res.status(201).json({data: articles, message: "Article updated successfully"});
    } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
    }
    });

router.delete('/:id', async function(req, res, next) {
    try {
        const {id} = req.params;
        const articles = await articleService.deleteArticle(id);
        return res.status(201).json({data: articles, message: `Article with id: ${id} removed successfully`});
  } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
  }
});

module.exports = router;
