const app = require("express")()
const books = [
    {
        author:"",
        name:"",
        
    }
]


app.get("/availablebooks",(req,res)=>{
    res.send(books);
})

app.listen(()=>{
    console.log("listening");
})