var keystone = require('keystone');
var Types = keystone.Field.Types;

var Accommodation = new keystone.List('Accommodation', {
  autokey: { from: 'name', path: 'key' }
});

Accommodation.add({
  name: { type: String, required: true, initial: true }
});

Accommodation.relationship({ ref: 'Post', refPath: 'accommodationType' });
Accommodation.defaultColumns = 'name';
Accommodation.register();
