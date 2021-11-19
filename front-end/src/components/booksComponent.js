import React,{useEffect,useState} from 'react';
import BookService from '../services/bookService';
import { Link,useParams } from 'react-router-dom';
import {Button,Modal} from 'react-bootstrap';
import AddBook from './addBook';

function UpdateData(props){
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Book Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBook id={props.id}/>
          </Modal.Body>
          <Modal.Footer><Button onClick={props.onHide}>Close</Button></Modal.Footer>
        </Modal>
      );
}

function BooksComponent() {
    const [books, setBooks] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [id,setId]=useState(null);

    useEffect(() => {
        BookService.getAllBooks().then((response)=>{
            setBooks(response.data)
            console.log(response.data);
        })
        .catch(error=>console.log(error))
    },[])



    return (
        <div className="container">
            <h1 className="text-center">List Books</h1>
            <Link to="/addBook" className="btn btn-secondary mb-2">Add Book</Link>
            <table className="table table-dark table-stripped">
                <thead>
                    <tr>
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book=>
                            
                                <tr key={book.id}>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.price}</td>
                                    <td  id="updel" className="bg-white">
                                    <Button variant="outline-secondary" size="sm" className="bd" onClick={() => {setId(book.id);console.log(book.id);setModalShow(true)}}>
                                            Update
                                        </Button>
                                        <Button variant="outline-secondary" size="sm" className="ms-3 bd">Delete</Button>
                                    </td>
                                </tr>
                            
                        )}
                </tbody>
            </table>
            <UpdateData
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
            />
            
        </div>
    )
}

export default BooksComponent;
