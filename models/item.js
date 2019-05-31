const mongoose =require('mongoose');
const Item = mongoose.model('Item',{  //item is the name of database table
    itemName: {
        type: String
    },
    itemPrice:
    {
        type:String
    },
    itemImageName:
    {
        type:String
    },
    itemDescription:
    {
        type: String

    }
})

module.exports =Item