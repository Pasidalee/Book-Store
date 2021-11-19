package com.example.demo.BookStore.service;

import com.example.demo.BookStore.entity.Book;
import com.example.demo.BookStore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class BookService{

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    public List<Book> getBooks(){
        return bookRepository.findAll();
    }

    public Book getBook(Long id) {
        Optional<Book> book=bookRepository.findById(id);
        if(book.isPresent()){
            return book.get();
        }
        throw new RuntimeException("Book is not found for the id "+id);
    }

    public void addBook(String name,String author,int quantity,Double price, MultipartFile file) throws IOException {
        String fileName=file.getOriginalFilename();
        Path filePath=Paths.get("/fileStorage",fileName).toAbsolutePath();

            try{
                byte[] content=file.getBytes();
                System.out.println(filePath);
                Files.write(filePath,content);
            } catch (IOException e){
                e.printStackTrace();
            }


//            String url= ServletUriComponentsBuilder.fromCurrentContextPath()
//                    .path("/download")
//                    .path(fileName)
//                    .toUriString();

            Book bookToSave=new Book(name,author,quantity,price,filePath.toString());
            bookRepository.save(bookToSave);


    }

    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    public void updateBook(Long bookId, Book book) {
        Book bookDb=bookRepository.findById(bookId).orElseThrow(()->new IllegalStateException("Book id with"+bookId+"does not exist"));
        if(book.getName()!=null && book.getName().length()>0 && !Objects.equals(bookDb.getName(),bookDb)){
            bookDb.setName(book.getName());
        }
        if(book.getAuthor()!=null && book.getAuthor().length()>0 && !Objects.equals(bookDb.getAuthor(),book.getAuthor())){
            bookDb.setAuthor(book.getAuthor());
        }

        if (book.getPrice()!=null && book.getPrice()>0 && Double.compare(bookDb.getPrice(),book.getPrice()) == 0){
            bookDb.setPrice(book.getPrice());
        }

        if( book.getQuantity()>0){
            bookDb.setQuantity(book.getQuantity());
        }

        bookRepository.save(bookDb);
    }


}
