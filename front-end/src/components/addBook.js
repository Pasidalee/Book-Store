import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import  {Form,Button} from 'react-bootstrap';
import bookService from '../services/bookService';

function AddBook(props) {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [invoice, setInvoice] = useState();
    const navigate = useNavigate();
    const [id,setId]=useState(props.id);

    useEffect(() => {
        bookService.getBookbyId(id).then((response)=>{
            console.log(response)
            setName(response.data.name);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setQuantity(response.data.quantity);
            setInvoice(response.data.file);
        }).catch(err=>console.log(err))
    },[])

    function saveBookorUpdate(e){
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",name);
        formData.append("author",author);
        formData.append("price",price);
        formData.append("quantity",quantity);
        formData.append("file",invoice)
        console.log(formData);
        if(id){
            props.onHide();
            bookService.updateBook(id,formData).then((response)=>{
                console.log(response.data);
                navigate('/books');
                bookService.getBookbyId(id).then((resp)=>{
                    let oldBookData = JSON.parse(JSON.stringify(props.books))
                    for(var i=0; i < oldBookData.length; i++){
                        if(oldBookData[i].id === id){
                            oldBookData[i] = resp.data;
                            break;
                        }
                    }
                    props.setBooks(oldBookData);
                })
            })
            .catch(error=>console.log(error))

        }else{
            bookService.saveBook(formData).then((response)=>{
            console.log(response.data);
            navigate('/books');
            })
            .catch(error=>console.log(error))
        }
        
    }

    const title=()=>{
        if(id){
            return <h2 className="text-center">Update Book</h2>
        }
        else {
            return <h2 className="text-center mt-5">Add new Book</h2>
        }
    }

    const submitorUpdate=()=>{
        if(id){
            return <Button variant="dark" type="submit" onClick={(e)=>saveBookorUpdate(e)}>Update</Button>
        }
        else {
            return <Button variant="dark" type="submit" onClick={(e)=>saveBookorUpdate(e)}>Submit</Button>
        }
    }

    return (
        <div>
            <div className="container">
                { title() }              
                
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
                    {submitorUpdate()}
                </Form>
            </div>
        </div>
    )
}

export default AddBook;

