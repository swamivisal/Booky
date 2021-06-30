const mongoose=require("mongoose");

//Creating the book schema
const AuthorSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

//Create a book model
const AuthorModel=mongoose.model(AuthorSchema);

module.exports=AuthorModel;