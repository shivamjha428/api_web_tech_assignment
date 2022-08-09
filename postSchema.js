const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    inventory_id:String,
    inventory_type:String,
    item_name:String,
    available:String
})

const  postModal = mongoose.model("post",postSchema)

module.exports = postModal;