//Import express
const express = require("express");

//Import Database
const database = require("./database");

// Initialization
const booky = express();

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

booky.listen(3000,()=>console.log("Hey server is running"));


