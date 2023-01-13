import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: String,
    email: String,
    password: String, 
});

const modelName = "users";
const collectionName = "users";
const UserModel = mongoose.model(modelName, UserSchema, collectionName);

export default UserModel;