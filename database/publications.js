const mongoose=require("mongoose");

//Creating the book schema
const PublicationSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

//Create a book model
const PublicationModel=mongoose.model(PublicationSchema);

module.exports=PublicationModel;