const mongoose = require("mongoose")

const buySchema = new mongoose.Schema({
    inventory_id1:String,
    req_item:String
})

const  buyModal = mongoose.model("buy",buySchema)

module.exports = buyModal;