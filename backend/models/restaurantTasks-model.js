const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  username: { type: String, trim: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  description: { type: String, required: true, trim: true },
});

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;
