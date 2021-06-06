import React from 'react';
import { Card, Jumbotron, Container, Button} from "react-bootstrap";
import { useState, useEffect } from 'react';

function Save () {

  const [results,setResults] = useState([])

  const getSavedbooks = () => {
    fetch("/booklist").then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setResults(data)
    })
  }

  useEffect(() => {
    getSavedbooks()
  }, [])

  const deletebooks = (id) => {
    fetch("/deletebook", {
      method: "DELETE",
      body: JSON.stringify({id})
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setResults(data)
    })
  }

    return (
        <div>
        <Jumbotron fluid>
  <Container>
    <h1>Google Books</h1>
    <p>
      Find and save Books.
    </p>
  </Container>
</Jumbotron>
{
  results.map(result => {
    return (
<Card style={{ width:'80rem' }}>
  <Card.Img variant="top" src= { result.imageLink }/>
  <Card.Body>
    <Card.Title>{ result.title }</Card.Title>
    <Card.Text> {result.authors }</Card.Text>
    <Card.Text> {result.description }</Card.Text>
    <Card.Link target="_blank" href={result.previewLink}>More Information</Card.Link>
    <br></br>
    <Button variant="primary" 
    //onClick={function(){deletebooks(result._id)}}
    >Delete</Button>
  </Card.Body>
</Card>
    )
  })
}   
</div>
        )
};
 export default Save