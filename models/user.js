const mongoose =require('mongoose');
const User = mongoose.model('User',{
    userFname: {
        type: String
    },
    userLname:
    {
        type:String
    },
    username:
    {
        type:String
    },
    password:
    {
        type:String
    }
})

/*const me = new User({
    name: 'Utsav',
    age: 20,
    address: 'Basundhara'
})*/

module.exports =User