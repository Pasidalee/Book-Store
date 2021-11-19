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
        console.log(bookId);
        return axios.get(BOOKS_BASE_URL+'/'+bookId);
    }
}

export default new BookService();