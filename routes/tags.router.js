'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');

//GET ALL TAGS
router.get('/tags', (req, res, next) => {

  knex.select('id', 'name')
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(next);

});

//GET TAG BY ID
router.get('/tags/:id', (req, res, next) => {

  const tagId = req.params.id;

  knex.select('id', 'name')
    .from('tags')
    .where('id', tagId)
    .then(result => {
      res.json(result);
    })
    .catch(next);

});

//CREATE TAG
router.post('/tags', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then(([results]) => {
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
    })
    .catch(err => next(err));
});

//UPDATE TAG
router.put('/tags/:id', (req, res, next) => {
  const updatedName = req.body.name;
  const tagId = req.params.id;

  if (!updatedName) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('tags')
    .update('name', updatedName)
    .where('id', tagId)
    .returning(['id', 'name'])
    .then(([results]) => {
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
    })
    .catch(err => next(err));
});

//DELETE TAG
router.delete('/tags/:id', (req, res, next) => {

  const tagId = req.params.id;

  knex('tags')
    .where('id', tagId)
    .del()
    .then(count => {
      count ? res.status(204).end() : next();
    })
    .catch(next);


});

module.exports = router;