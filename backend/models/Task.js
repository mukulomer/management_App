const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description : { type: String },
  deadline : {type : Date,required : true},
  status : {  type: String, required: true , enum : ['To Do','In Progress','Done'] }
});

module.exports = mongoose.model('Task', tasksSchema);
