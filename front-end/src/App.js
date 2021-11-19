import {BrowserRouter,Route,Routes} from 'react-router-dom';
import BooksComponent from './components/booksComponent';
import AddBook from './components/addBook';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<BooksComponent />}/>
            <Route path="books" element={<BooksComponent />}/>
            <Route path="addBook" element={<AddBook/>}/>
          </Routes>
        
      </BrowserRouter>

    </div> 
  );
}

export default App;
