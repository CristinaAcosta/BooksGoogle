const mongoose = require ('mongoose');
const { Schema } =mongoose;
const express = require ('express')
const app = express()


app.use(express.static('client/build'))
app.use(express.json())
const bookSchema = new Schema({
    title: String,
    authors:[{type: String}],
    description: String, 
    imageLinks: [{type: String}], 
    link: String,
})

const BookModel = mongoose.model('Book', bookSchema)

async function initializeDatabase(){
    await mongoose.connect('mongodb+srv://cacost5695:Password@cluster0.mrew3.mongodb.net/cristina-booksapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
}

app.post('/save-book', async(req, res) => {
    saveBook(req, res)
})

app.get('/booklist', async (req, res) =>{
    BookModel.find({}, function (error,docs){
        res.send(docs)
    })
})

app.delete('/deletebook', async (req, res) =>{
   const{id} = req.body
   BookModel.find({_id:id}).remove().exec()
})


const saveBook = async(req, res) => {
    const {authors, title, description, imageLinks, link} = req.body
    console.log(req.body)
    const book = new BookModel()
    book.title = title
    book.authors = authors 
    book.description = description
    book.imageLinks = imageLinks
    book.link = link

    //save book into database
    await book 
    .save()
    .then(() => {
        //res.send(book)
    })
    .catch(err => {
        console.log(err)
        //res.send({ })
    })

}


const port = 3001
app.listen(port, async () => {
    await initializeDatabase()

    console.log(`is listening on:${port}`)
})
