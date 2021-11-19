import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import  {Form,Button} from 'react-bootstrap';
import bookService from '../services/bookService';

function AddBook() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [invoice, setInvoice] = useState();
    const navigate = useNavigate();

    function saveBook(e){
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",name);
        formData.append("author",author);
        formData.append("price",price);
        formData.append("quantity",quantity);
        formData.append("file",invoice)
        console.log(formData);
        bookService.saveBook(formData).then((response)=>{
            console.log(response.data);
            navigate('/books');
        })
        .catch(error=>console.log(error))
    }

    return (
        <div>
            <div className="container">
                <h2 className="text-center">Add new Book</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="bookname">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="name"
                            placeholder="Enter book name" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="authorname">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="author"
                            placeholder="Enter author's name" 
                            value={author}
                            onChange={(e)=>setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price of the Book</Form.Label>
                        <Form.Control 
                            type="text"
                            name="price" 
                            placeholder="Enter the price of the book" 
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>Qunatity Added</Form.Label>
                        <Form.Control 
                            type="text"
                            name="quantity" 
                            placeholder="Quantity added" 
                            value={quantity}
                            onChange={(e)=>setQuantity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="invoice" className="mb-3">
                        <Form.Label>Upload the Invoice</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="file"
                            onChange={(e)=>setInvoice(e.target.files[0])}
                        />
                    </Form.Group>
                    <Button variant="secondary" type="submit" onClick={(e)=>saveBook(e)}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AddBook;

