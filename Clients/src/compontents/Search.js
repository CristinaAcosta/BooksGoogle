import React from 'react';
import { useState } from 'react';
import { Card, Jumbotron, Form, Container, Button} from "react-bootstrap";

function Search () {

  //store user search
  const[ searchText, setSearchText ] = useState()
  const [searchResults,setSearchResults] = useState([])

  function fetchBooks() {
    let googleBooksUrl=`https://www.googleapis.com/books/v1/volumes?q=intitle:${ searchText }&key=AIzaSyBI4CXl01DvCVPKMBD3-nwHEHiUyhJNIKM`
    fetch (googleBooksUrl).then( response => {
      return response.json()
    }) 
    .then(data => {
      console.log(data.items)
      setSearchResults(data.items)
    })
  }

  function saveBook(book){
    let backendUrl = "/save-book"
    const requestBook = {
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors, 
    description: book.volumeInfo.description,
    imageLinks: [book.volumeInfo.imageLinks.thumbnail], 
    link: book.volumeInfo.previewLink
    }
    console.log(requestBook, book)

     fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
       method: "POST",
       body:JSON.stringify(requestBook)
     })
   }
          
    return (
        <div>
        <Jumbotron fluid>
  <Container>
    <h1>Google Books</h1>
    <p>
      Find and save books. 
    </p>
  </Container>
</Jumbotron>
<Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Book Title</Form.Label>
    <Form.Control onChange={function(e){
      setSearchText(e.target.value)
    }} type="textarea" placeholder="Enter Text Here" />
    <Button onClick={fetchBooks} variant="outline-primary">Submit</Button>{' '}
  </Form.Group> 
  </Form>
{
  searchResults.map(result => {
    let imageLink = ""
    if (result.imageLinks) {
      imageLink = result.volumeInfo.imageLinks.thumbnail
    }
        return (
<Card style={{ width:'80rem' }}>
  <Card.Img variant="top" src= { imageLink }/>
  <Card.Body>
    <Card.Title>{ result.volumeInfo.title }</Card.Title>
    <Card.Text> {result.volumeInfo.authors }</Card.Text>
    <Card.Text> {result.volumeInfo.description }</Card.Text>
    <Card.Link target="_blank" href={result.volumeInfo.previewLink}>More Information</Card.Link>
    <br></br>
    <Button variant="primary" onClick={()=> {
      saveBook(result)}}>Save{result.selflink}</Button>
  </Card.Body>
</Card>
    )
  })
}
</div>
        )
};
 export default Search

 //this is a comment