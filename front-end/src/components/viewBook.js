import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import bookService from '../services/bookService';
import {Card,Button, Table} from 'react-bootstrap';


function ViewBook() {
    const [book, setBook] = useState();
    const [file, setFile] = useState();
    let {id}=useParams();

    useEffect(() => {
        bookService.getBookbyId(id).then((resp)=>{
            console.log(resp.data);
            setBook(resp.data);
        })
        .catch(err=>console.log(err))
    }, [id])

    function viewFile(id){
        bookService.getFile(id).then((resp)=>{
            resp.blob();        
        })
        .then((blob)=>{
             const url = window.URL.createObjectURL(
            new Blob([blob]),
    );
        })
        .catch((err)=>console.log(err))
    }


    return (
        <div>
            <h1 className="text-center mt-5">Book Details</h1>
            <table className="table no-border table-dark table-striped aa">
                <tbody>
                    <tr>
                        <td className="tb">Title</td>
                        <td>{book?book.name:null}</td>
                    </tr>
                    <tr>
                        <td className="tb">Author</td>
                        <td>{book?book.author:null}</td>
                    </tr>
                    <tr>
                        <td className="tb">Price</td>
                        <td>{book?book.price:null}</td>
                    </tr>
                    <tr>
                        <td className="tb">Quantity</td>
                        <td>{book?book.quantity:null}</td>
                    </tr> 
                    <tr>
                        <td className="tb">Invoice</td>
                        <td><Button variant="secondary" size="sm"><a href={`http://localhost:8080/books/invoice/${id}`} className="vwbk">Download Invoice</a></Button></td>
                    </tr>  

                </tbody>

            </table>
    
            
   
        </div>
    )
}

export default ViewBook;
