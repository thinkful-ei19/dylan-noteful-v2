'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


//GET ALL FOLDERS
router.get('/folders', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(item => {
      res.json(item);
    })
    .catch(next);
});

//GET FOLDER BY ID
router.get('/folders/:id', (req, res, next) => {

  const folderId = req.params.id;

  knex.select('id', 'name')
    .from('folders')
    .where('id', folderId)
    .then(item => {
      res.json(item);
    })
    .catch(next);
});

//UPDATE FOLDER
router.put('/folders/:id', (req, res, next) => {

  const folderId = req.params.id;
  const updatedName = req.body.name;

  if (!updatedName) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .update('name', updatedName)
    .where('id', folderId)
    .returning(['id', 'name'])
    .then(item => {
      item ? res.json(item) : next();
    })
    .catch(next);

});

//CREATE A FOLDER
router.post('/folders', (req, res, next) => {
  
  const { name } = req.body;

  const newFolder = { name };

  if (!newFolder.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .insert(newFolder)
    .into('folders')
    .returning(['id', 'name'])
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/folders/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(next);

});

//DELETE A FOLDER
router.delete('/folders/:id', (req, res, next) => {

  const folderId = req.params.id;

  knex('folders')
    .select('id', 'name')
    .where('id', folderId)
    .del()
    .then(count => {
      count ? res.status(204).end() : next();
    })
    .catch(err => next(err));


});



module.exports = router;