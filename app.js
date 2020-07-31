const express=require('express')
const path=require('path')
const request = require('request');

const app=express()
const port=process.env.PORT || 3000

// const publicDirPath=path.join(__dirname,'../')

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/search',(req,res) => {
    res.render('search')
})

app.get('/results',(req,res) => {
    let query=req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=3f628733c47d72021c74d9886184075f&query='+query, (error, response, body) => {
        if(error){
            console.log(error)
        }
            let data=JSON.parse(body)
            res.render('movies',{
                data:data,
                searchQuery:query
            })
    });

})


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})