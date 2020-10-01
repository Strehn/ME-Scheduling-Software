const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MachineSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
});

module.exports = Machine = mongoose.model("machines", MachineSchema);