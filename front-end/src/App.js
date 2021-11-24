import {BrowserRouter,Route,Routes} from 'react-router-dom';
import BooksComponent from './components/booksComponent';
import AddBook from './components/addBook';
import ViewBook from './components/viewBook';
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
            <Route path="viewBook/:id" element={<ViewBook/>}/>
          </Routes>
        
      </BrowserRouter>

    </div> 
  );
}

export default App;
