import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import bookService from '../services/bookService';
import {Button,Modal} from 'react-bootstrap';
import {Page, Document,pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function ViewInvoice(props){
    const [numPages, setNumPages] = useState(null);

    function fileType(){
        
        if(props.fType=='pdf'){
            return(
            <Document
                    file={`http://localhost:8080/books/invoice/${props.id}`}
                    onLoadSuccess={({ numPages })=>setNumPages(numPages)}
                    className="dc"
                >
                {Array.apply(null, Array(numPages))
                .map((x, i)=>i+1)
                .map(page => <Page pageNumber={page}/>)}
                </Document>
            )
        }
        else {
           return <img src={`http://localhost:8080/books/invoice/${props.id}`} className="dc" />
        }
    }
  
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Body>
                {fileType()}                
            </Modal.Body>
            <Modal.Footer><Button variant="dark"><a href={`http://localhost:8080/books/invoice/${props.id}`} className="vwbk">Download</a></Button><Button onClick={props.onHide} variant="dark">Cancel</Button></Modal.Footer>
        </Modal>
      );
}


function ViewBook() {
    const [book, setBook] = useState();
    const [image, setImage] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [fType,setFType]= useState('');
    let {id}=useParams();

    useEffect(() => {
        bookService.getBookbyId(id).then((resp)=>{
            console.log(resp.data);
            setBook(resp.data);
        })
        .catch(err=>console.log(err))
    }, [])

    function fileType(){
        let fType=book.invoice.split('.')[1];
        console.log(fType);
        setFType(fType);
    }


    return (
        <div className="bv">
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
                        <td><Button variant="secondary" size="sm" onClick={()=>{setModalShow(true);fileType();}}>View Invoice</Button></td>
                    </tr>  

                </tbody>

            </table>
            <ViewInvoice
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                fType={fType}
            />   
            
   
        </div>
    )
}

export default ViewBook;
