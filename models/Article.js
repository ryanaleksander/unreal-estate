var keystone = require('keystone');
var Types = keystone.Field.Types;

var Article = new keystone.List('Article', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Article.add({
  title: { type: String, required: true },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  publishedDate: { type: Types.Date, index: true }
});

Article.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});


Article.defaultColumns = 'title, content, publishedDate';
Article.register();
