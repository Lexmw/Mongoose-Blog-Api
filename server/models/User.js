const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{type:String, required:true},
    lastName: {type:String, required: true},
    email:{type: String, required:true},
    social:{
            facebook:{type:String, required: true},
            twitter:{type:String, required:true},
            linkedIn: {type:String, required:true}
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
});

module.exports = mongoose.model('User', UserSchema);