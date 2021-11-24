import {BrowserRouter,Route,Routes} from 'react-router-dom';
import BooksComponent from './components/booksComponent';
import AddBook from './components/addBook';
import ViewBook from './components/viewBook';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<BooksComponent />}/>
            <Route path="books" element={<BooksComponent />}/>
            <Route path="addBook" element={<AddBook/>}/>
            <Route path="updateBook/:id" element={<BooksComponent/>}/>
            <Route path="viewBook/:id" element={<ViewBook/>}/>
          </Routes>
        
      </BrowserRouter>
      <Footer/>
    </div> 
  );
}

export default App;
