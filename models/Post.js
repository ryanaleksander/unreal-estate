var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

var localStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: 'public/img',
    publicPath: '/img'
  }
});

Post.add({
  title: { type: String, required: true, initial: true, index: true },
  publishedDate: { type: Types.Date, required: true, initial: true, index: true },
  image: {
    type: Types.File,
    required: true,
    initial: true,
    storage: localStorage
  },
  videoUrl: { type: Types.Url },
  address: { type: String, required: true, initial: true },
  type: { type: Types.Select, options: 'Bán, Cho thuê', required: true, initial: true },
  accommodationType: { type: Types.Relationship, ref: 'Accommodation', required: true, initial: true },
  area: { type: Types.Number, format: '0,0.00', required: true, initial: true },
  price: { type: Types.Money, format: '0,0', required: true, initial: true },
  unit: { type: Types.Select, options: 'VND, VND/tháng, VND/m2', required: true, initial: true },
  sum: { type: Types.Money, format: '0,0', default: 0 },
  floors: { type: Types.Number, format: '0', required: true, initial: true },
  toilets: { type: Types.Number, format: '0', required: true, initial: true },
  bedrooms: { type: Types.Number, format: '0', required: true, initial: true },
  description: { type: Types.Textarea, format: '0', required: true, initial: true },
  status: { type: Types.Select, options: 'Active, Inactive'},
	author: { type: Types.Relationship, ref: 'Account', required: true, initial: true }
});

Post.defaultColumns = 'title, publishedDate, address, type, sttatus',
Post.register();
