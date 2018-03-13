'use strict';

const knex = require('../knex');

// knex.select(1).then(res => console.log(res));

// knex
//   .select('id', 'title', 'content')
//   .from('notes')
//   .where(function() {
//     if (true) {
//       this.where('title', 'like', '%ways%');
//     }
//   })
//   .then(console.log);

// knex
//   .select('id', 'title', 'content')
//   .from('notes')
//   .where('id', '1001')
//   .then(console.log);

// knex('notes')
//   .update( { title: 'new title' } )
//   .where('id', 1001)
//   .then(console.log);


// knex
//   .insert( { title: 'new new title', content: 'new new content' } )
//   .into('notes')
//   .returning(['id', 'title', 'content'])
//   .then(console.log);

knex('notes')
  .select('id', 'title', 'content')
  .where('id', '1011')
  .del()
  .then(console.log);