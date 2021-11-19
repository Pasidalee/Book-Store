import {BrowserRouter,Route,Routes} from 'react-router-dom';
import BooksComponent from './components/booksComponent';
import AddBook from './components/addBook';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<BooksComponent />}/>
            <Route path="books" element={<BooksComponent />}/>
            <Route path="addBook" element={<AddBook/>}/>
            <Route path="updateBook/:id" element={<BooksComponent/>}/>
          </Routes>
        
      </BrowserRouter>

    </div> 
  );
}

export default App;
