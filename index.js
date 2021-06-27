//Import express
const express = require("express");

//Import Database
const database = require("./database");

// Initialization
const booky = express();

//configuration
booky.use(express.json());

//---------------------------------------------------GET-----------------------------------------------------

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route           /isbn1
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/isbn1/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
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
booky.get("/category1/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
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
booky.get("/language1/:lang",(req,res)=>{
    const getSpecificBook = database.books.filter((book) =>
        book.language.includes(req.params.lang)
    );
    if (getSpecificBook.length === 0) {
        return res.json({
          error: `No book found for the language of ${req.params.language}`,
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
booky.get("/author", (req, res) => {
  return res.json({ authors: database.authors });
});

/*
Route------------/author/id1
Description------get specific author
Access-----------PUBLIC
Parameter--------id
Methods----------GET
*/
booky.get("/author/id1/:id",(req,res) =>{
  const getSpecificAuthor=database.authors.filter(
    (author)=>author.id===parseInt(req.params.id)
  );
  if(getSpecificAuthor.length===0){
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
booky.get("/author/isbn1/:isbn", (req, res) => {
  const getSpecificAuthor = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
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
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publications });
});

/*
Route------------/publications/id1
Description------get specific publication
Access-----------PUBLIC
Parameter--------id
Methods----------GET
*/
booky.get("/publications/id1/:id",(req,res) =>{
    const getSpecificPublication=database.publications.filter(
      (publication)=>publication.id===parseInt(req.params.id)
    );
    if(getSpecificPublication.length===0){
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
booky.get("/publications/isbn1/:isbn",(req,res) => {
  const getSpecificPublication=database.publications.filter((publication)=>
    publication.books.includes(req.params.isbn)
  );
  if(getSpecificPublication.length==0){
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

booky.post("/book/new",(req,res)=>{
    const {newBook}=req.body;
    database.books.push(newBook);
    return res.json({books:database.books,message:"book was added"});
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
  database.authors.push(newAuthor);
  return res.json({authors:database.authors});
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
  database.publications.push(newPublication);
  return res.json({publications:database.publications});
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
  return res.json({publication:database.publications});
});

/*
Route           /publication/book/update
Description     update/add new publication
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
    message:"new book was added to publication"})
});

//------------------------------------------------------------DELETE----------------------------------------------



booky.listen(3000,()=>console.log("Hey server is running"));


