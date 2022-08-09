const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique:true,
    },
    Cust_id: String,
    Cust_name: String,
  });
  const userModel = mongoose.model("user", userSchema);

module.exports = userModel;