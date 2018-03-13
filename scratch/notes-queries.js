'use strict';

const knex = require('../knex');

// knex.select(1).then(res => console.log(res));

knex
  .select('id', 'title', 'content')
  .from('notes')
  .where(function() {
    if (true) {
      this.where('title', 'like', '%ways%');
    }
  })
  .then(console.log);

