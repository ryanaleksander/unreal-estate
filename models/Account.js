var keystone = require('keystone');
var Types = keystone.Field.Types;

var Account = new keystone.List('Account', {
  map: { name: 'name' }
});

Account.add({
  name: { type: String, index: true, required: true },
  email: { type: Types.Email, index: true, initial: true, required: true },
  password: { type: Types.Password, initial: true, required: true },
  phone: { type: String, required: true, initial: true },
  gender: { type: Types.Select, options: 'Nam, Nữ' },
  address: { type: String, required: true, initial: true },
});

Account.defaultColumns = 'name, email, phone, gender, address, birthday';
Account.register();
