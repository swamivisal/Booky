const mongoose=require("mongoose");

//Creating the book schema
const BookSchema=mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    author: [Number],
    language: String,
    numPage: Number,
    publications: [Number],
    category: [String]
});

//Create a book model
const BookModel=mongoose.model(BookSchema);

module.exports=BookModel;