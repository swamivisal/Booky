let books=[
    {
    ISBN:"1234book",
    title:"python",
    pubDate:"2021-07-01",
    author:[1,2],
    language:"english",
    numPage:250,
    publications:[1],
    category:["tech","programming","education"]
    },
    {
        ISBN:"12345book",
        title:"c++",
        pubDate:"2021-01-04",
        author:[1],
        language:"french",
        numPage:285,
        publications:[1],
        category:["tech","programming","education","games"]
        }

]  

let authors=[
    {
        id:1,
        name:"visal",
        books:["1234book","12345book"]
    },
    {
        id:2,
        name:"swami",
        books:["1234book"]
    }
];

let publications=[
    {
        id:1,
        name:"falcon",
        books:["1234book","12345book"]
    }
];//

module.exports={books,authors,publications};