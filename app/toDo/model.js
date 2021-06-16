const config = require('../config/models.js');
config.increment.initialize(config.db);

const schema = new config.mongoose.Schema({
  toDos: [
    {
      toDo: String,
      tag: String,
      tagColor: String,
      done: Boolean
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  strict: true
});

schema.plugin(config.paginate);
var toDo = config.mongoose.model('toDos', schema);
module.exports = toDo;