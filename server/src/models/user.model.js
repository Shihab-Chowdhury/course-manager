import mongoose from "mongoose";

const reqString = {
    type: String,
    required:true,
    minlength:3,
    maxlength:255
};

const opString = {
    type: String,
    minlength:3,
    maxlength:255
};

const email = {
    type: String,
    required:true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
};

const password = {
    type: String,
    requered: true
};

const UserSchema = mongoose.Schema({
    
    name: reqString,
    email: email,
    password: password,
    dob: Date,
    phone: opString,
    gender: opString,
    address: opString

}, {timestamps : true});

export const UserModel = mongoose.model('User', UserSchema);