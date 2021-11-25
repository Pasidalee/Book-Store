import React,{useEffect,useState} from 'react';
import BookService from '../services/bookService';
import { Link } from 'react-router-dom';
import {Button,Modal} from 'react-bootstrap';
import AddBook from './addBook';
import {useNavigate} from 'react-router-dom';

function UpdateData(props){
    
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <AddBook id={props.id} onHide={props.onHide} books={props.books} setBooks={props.setBooks} />
          </Modal.Body>
          <Modal.Footer><Button onClick={props.onHide} variant="dark">Cancel</Button></Modal.Footer>
        </Modal>
      );
}

function BooksComponent() {
    const [books, setBooks] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [id,setId]=useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBooks();
    },[id])

    function getAllBooks(){
        BookService.getAllBooks().then((response)=>{
            setBooks(response.data)
            console.log(response.data);
        })
        .catch(error=>console.log(error))
    }

    function deleteBook(id){
        BookService.deleteBook(id).then((resp)=>{
            console.log(resp);
            getAllBooks();
            navigate('/books');
        })
        .catch(err=>console.log(err))

    }

    function viewBook(id){
        navigate(`/viewBook/${id}`);
    }



    return (
        <div className="container">
            <h1 className="text-center mt-3">All Books</h1>
            <Link to="/addBook" className="btn btn-secondary mb-2">Add Book</Link>
            <table className="table table-dark table-stripped table-hover">
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
                                    <td onClick={()=>viewBook(book.id)}>{book.name}</td>
                                    <td onClick={()=>viewBook(book.id)}>{book.author}</td>
                                    <td onClick={()=>viewBook(book.id)}>{book.quantity}</td>
                                    <td onClick={()=>viewBook(book.id)}>{book.price}</td>
                                    <td  id="updel" className="bg-white">
                                    <Button variant="outline-dark" size="sm" className="bd" onClick={() => {setId(book.id);console.log(book.id);setModalShow(true)}}>
                                            Update
                                        </Button>
                                        <Button variant="outline-dark" size="sm" className="ms-3 bd" onClick={()=>deleteBook(book.id)}>Delete</Button>
                                    </td>
                                </tr>
                                
                            
                        )}
                </tbody>
            </table>
            <UpdateData
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                books={books}
                setBooks={setBooks}
            />
            
        </div>
    )
}

export default BooksComponent;
