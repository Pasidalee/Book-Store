import axios from 'axios';

const BOOKS_BASE_URL='http://localhost:8080/books';

class BookService{
    getAllBooks(){
        return axios.get(BOOKS_BASE_URL);
    }

    saveBook(formData){
        return axios.post(BOOKS_BASE_URL,formData);
    }
    getBookbyId(bookId){
        return axios.get(BOOKS_BASE_URL+'/'+bookId);
    }

    updateBook(bookId,formData){
        return axios.put(BOOKS_BASE_URL+'/'+bookId,formData);
    }

    deleteBook(bookId){
        return axios.delete(BOOKS_BASE_URL+'/'+bookId);
    }

    getFile(bookId){
        return axios.get(BOOKS_BASE_URL+'/invoice/'+bookId);
    }
}

export default new BookService();