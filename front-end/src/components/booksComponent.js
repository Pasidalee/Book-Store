import React,{useEffect,useState} from 'react';
import BookService from '../services/bookService';
import { Link } from 'react-router-dom';


function BooksComponent() {
    const [books, setBooks] = useState([]);

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
            <table className="table table-dark table-stripped table-bordered">
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
                                </tr>
                            
                        )}
                </tbody>
            </table>
            
        </div>
    )
}

export default BooksComponent;
