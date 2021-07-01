require("dotenv").config();

//Import express
const express = require("express");
const mongoose = require("mongoose");

//Import Database
const database = require("./database/index");

//Import models
const BookModel=require("./database/books");
const AuthorModel=require("./database/authors")
const PublicationModel=require("./database/publications")

// Initialization
const booky = express();

//configuration
booky.use(express.json());

//Establish database connection
mongoose.connect(
  process.env.MONGO_URL,
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  }
)
.then(()=>console.log("connection established"));

//---------------------------------------------------GET----------------------------------------------------- 

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/",async (req, res) => {
  const getAllBooks=await BookModel.find();
  return res.json({ books: getAllBooks });
});

/*
Route           /isbn1
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/isbn1/:isbn",async (req, res) => {

  const getSpecificBook=await BookModel.findOne({ISBN:req.params.isbn})

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /category1
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/category1/:category",async (req, res) => {
  const getSpecificBook=await BookModel.findOne({category:req.params.category})

  if(!getSpecificBook) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /language1
Description     Get specific books based on language
Access          PUBLIC
Parameter       language
Methods         GET
*/
booky.get("/language1/:lang",async(req,res)=>{
    const getSpecificBook =await BookModel.findOne({language:req.params.lang})
    if (!getSpecificBook) {
        return res.json({
          error: `No book found for the language of ${req.params.lang}`,
        });
      }
    return res.json({book: getSpecificBook});
})


/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", async(req, res) => {
  const getAllAuthors=await AuthorModel.findOne()
  return res.json({ authors: getAllAuthors });
});

/*
Route------------/author/id1
Description------get specific author
Access-----------PUBLIC
Parameter--------id
Methods----------GET
*/
booky.get("/author/id1/:id",async(req,res) =>{
  const getSpecificAuthor=await AuthorModel.findOne({id:1});
  if(!getSpecificAuthor){
      return res.json({
          error:`No Author found for the specified id of ${req.params.id}`
      });
  }
  return res.json({Authors:getSpecificAuthor});
});

/*
Route------------/author/isbn1
Description------get all authors based on books
Access-----------PUBLIC
Parameter--------isbn
Methods----------GET
*/
booky.get("/author/isbn1/:isbn", async(req, res) => {
  const getSpecificAuthor=await AuthorModel.findOne({books:req.params.isbn});

  if (!getSpecificAuthor) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", async(req, res) => {
  const getAllPublication=await(PublicationModel.findOne())
  return res.json({ publications: getAllPublication });
});

/*
Route------------/publications/id1
Description------get specific publication
Access-----------PUBLIC
Parameter--------id
Methods----------GET
*/
booky.get("/publications/id1/:id",async(req,res) =>{
    const getSpecificPublication=await(PublicationModel.findOne({id:req.params.id}))
    if(!getSpecificPublication){
        return res.json({
            error:`No Publication found for the specified id of ${req.params.id}`
        });
    }
    return res.json({Publication:getSpecificPublication});
  });

/*
Route           /publications/book1
Description     get all publications based on book
Access          PUBLIC
Parameter       Book
Methods         GET
*/
booky.get("/publications/isbn1/:isbn",async(req,res) => {
  const getSpecificPublication=await(PublicationModel.findOne({isbn:req.params.id}))
  if(!getSpecificPublication){
    return res.json({
    error: `No Publication found for the book of ${req.params.isbn}`,
    });
  }
  return res.json({ publications: getSpecificPublication });
});
//----------------------------------------------------POST----------------------------------------------------------

/*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameter       None
Methods         POST
*/

booky.post("/book/new",async (req,res)=>{
    const {newBook}=req.body;
    BookModel.create(newBook);
    return res.json({message:"book was added"});
});

/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameter       None
Methods         POST
*/

booky.post("/author/new",(req,res)=>{
  const {newAuthor}=req.body;
  AuthorModel.create(newAuthor);
  return res.json({message:"author was added"});
});

/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameter       None
Methods         POST
*/
booky.post("/publication/new",(req,res)=>{
  const {newPublication}=req.body;
  PublicationModel.create(newPublication);
  return res.json({message:"publication was added"});
});

//---------------------------------------------------PUT------------------------------------------------

/*
Route           /book/update/title
Description     update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
  database.books.forEach((book)=>{
    if(book.ISBN==req.params.isbn){
      book.title=req.body.bookTitle;
      return;
    }
  });
  return res.json({books:database.books,message:"book title was updated"});
});

/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/author/update/:isbn",(req,res)=>{
  database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
      book.author.push(req.body.newAuthor);
      return;
    }
  });
  database.authors.forEach((author)=>{
    if(author.id===req.body.newAuthor){
      author.books.push(req.params.isbn);
      return;
    }
  });
  return res.json({
    books:database.books,
    authors:database.authors,
    message:"new author was added"})
});

/*
Route           /author/update
Description     update name of author based on id
Access          PUBLIC
Parameter       id
Methods         PUT
*/
booky.put("/author/update/:id",(req,res)=>{
  database.authors.forEach((author)=>{
    if(author.id==req.params.id){
      author.name=req.body.newAuthor;
      return;
    }
  });
  return res.json({author:database.authors});
});

/*
Route           /publication/update
Description     update name of publication based on id
Access          PUBLIC
Parameter       id
Methods         PUT
*/
booky.put("/publication/update/:id",(req,res)=>{
  database.publications.forEach((publication)=>{
    if(publication.id==req.params.id){
      publication.name=req.body.newPublication;
      return;
    }
  });
  return res.json({publication:database.publications,message:"publication name was updated"});
});

/*
Route           /publication/book/update
Description     update/add new book
Access          PUBLIC
Parameter       id
Methods         PUT
*/
booky.put("/publication/book/update/:id",(req,res)=>{
  database.publications.forEach((publication)=>{
    if(publication.id==req.params.id){
      publication.books.push(req.body.newBook);
      return;
    }
  });
  database.books.forEach((book)=>{
    if(book.ISBN===req.body.newBook){
      book.publications.push(req.params.id);
      return;
    }
  });
  return res.json({
    books:database.books,
    publications:database.publications,
    message:"new publication was added"})
});

//------------------------------------------------------------DELETE----------------------------------------------

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
  const updatedBookDatabase=database.books.filter((book)=>{
    book.ISBN!==req.params.isbn
  })
  database.books=updatedBookDatabase;
  return res.json({books:database.books});
});




booky.listen(3000,()=>console.log("Hey server is running"));


