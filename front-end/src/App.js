import {BrowserRouter,Route,Routes} from 'react-router-dom';
import BooksComponent from './components/booksComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<BooksComponent />}/>
            <Route path="books" element={<BooksComponent />}/>
          </Routes>
        
      </BrowserRouter>

    </div> 
  );
}

export default App;
