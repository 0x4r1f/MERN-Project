const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
