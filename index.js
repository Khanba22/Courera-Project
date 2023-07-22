const app = require("express")()
const port = 8000;
const fs = require("fs")
let books;
let customers;

let customerdata = fs.readFileSync("customer.json")
customers = JSON.parse(customerdata)
let bookdata = fs.readFileSync("books.json")
books = JSON.parse(bookdata)


app.post("/removereview",(req,res)=>{
    const headers = req.headers;
    const isbn = headers.isbn;
    const reviews = headers.reviews;
    books.forEach(el=>{
        if (el.isbn === isbn) {
            for (let index = 0; index < el.reviews.length; index++) {
                let temparray = []
                if (el.reviews[index] === reviews) {
                    console.log(el.reviews[index] !== reviews)
                    temparray.push(el.reviews[index]);
                    console.log("added" + el.reviews[index])
                }
                el.reviews = temparray
            }
            res.send("review Removed")
        }
    })
})

app.get("/getreviews",(req,res)=>{
    const isbn = req.headers.isbn
    books.forEach(el => {
        if (el.isbn == isbn) {
            res.send(el.reviews)
        }
    });
})

app.post("/review",(req,res)=>{
    const required = req.headers
    books.forEach(el=>{
        if (el.isbn === required.isbn) {
            el.reviews.push(required.reviews)
        }
    })
    fs.writeFileSync("books.json",JSON.stringify(books))
    res.send("Review added successfully On isbn number" + required.isbn)
})

app.get("/availablebooks",(req,res)=>{
    res.send(books);
})

app.get("/findbyisbn",(req,res)=>{
    const bod = req.headers;
    const isbn = bod.isbn;
    console.log(bod)
    books.forEach(element => {
        if (element.isbn === isbn) {
            res.send(element)
        }else{
            console.log("didnt mathc")
        }
    });
})

app.get("/findbyauthor",(req,res)=>{
    const header = req.headers;
    const author = header.author;
    let array = [];
    books.forEach(element => {
        if (element.author === author) {
            array.push(element)
        }
    });
    res.send(array);
})

app.get("/findbytitle",(req,res)=>{
    const header = req.headers;
    const title = header.title;
    books.forEach(element => {
        if (element.title === title) {
            res.send(element)
        }
    });
})

app.post("/signup",(req,res)=>{
    const customerdata = req.headers;
    const customer = {
        username:customerdata.username,
        password:customerdata.password
    }
    customers.push(customer)
    let data = JSON.stringify(customers);
    fs.writeFileSync('customer.json', data);
    res.send("Customer Created Successfully")
})

app.get("/login",(req,res)=>{
    const customerdata = req.headers;
    const username=customerdata.username
    const password=customerdata.password
    customers.forEach(element=>{
        console.log(element.username);
        if (element.username === username && element.password === password) {
            res.send("Login success")
        }else{
            res.send("Login Failed")
        }
    })
})


app.listen(port , ()=>{
    console.log("listening");
})