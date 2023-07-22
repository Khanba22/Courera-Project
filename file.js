import React from 'react'
async function searchByAuthor(author){
    await fetch("http://localhost:8000/findbyauthor",{method:"GET"}).then((result)=>{
        return result;
    })
}
async function searchByTitle(title){
    await fetch("http://localhost:8000/findbytitle",{method:"GET"}).then((result)=>{
        return result;
    })
}

function file() {

    const data = getAllBooks("http://localhost:8000/availablebooks", { method: "GET" })
    return (
        <div>

        </div>
    )
}

export default file
