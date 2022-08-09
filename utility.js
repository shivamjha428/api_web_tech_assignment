const postModal = require("./postSchema");
const userModel = require("./schema");
const buyModal=require('./buySchema')
const checkExistingUser = async (email)=> {
    let existingUser = false;
    await userModel.find({email: email}).then((userData)=> {
        if(userData.length) {
            existingUser = true;
        }
    });
    return existingUser;
}
const CheckBuy=async (inventory_id1,req_item)=> {
    let buyAble = false;
    await postModal.find({inventory_id1}).then((userData)=> {
        if(parseInt(userData.available)>=parseInt(req_item)) {
            // userData.available=userData.available-req_item;
            buyAble = true;
        }
    }).catch((err)=>{
        buyAble=false
    });
    return buyAble;
}
const Remove=(inventory_id1,req_item)=>{
    postModal.find({inventory_id1}).updateOne({available:90},{$set:{available:90-parseInt(req_item)}})
}
module.exports = {checkExistingUser, CheckBuy, Remove};