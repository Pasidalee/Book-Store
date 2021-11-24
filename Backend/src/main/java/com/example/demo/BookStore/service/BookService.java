package com.example.demo.BookStore.service;

import com.example.demo.BookStore.entity.Book;
import com.example.demo.BookStore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
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
   // private final Path root= Paths.get("/fileStorage");

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

//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/download/")
//                .path(fileName)
//                .toUriString();


            Book bookToSave=new Book(name,author,quantity,price,filePath.toString());
            bookRepository.save(bookToSave);


    }

    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    public void updateBook(Long bookId, String name,String author, int quantity,Double price,MultipartFile file) {
        Book bookDb=bookRepository.findById(bookId).orElseThrow(()->new IllegalStateException("Book id with"+bookId+"does not exist"));
        if(name!=null && name.length()>0 && !Objects.equals(bookDb.getName(),name)){
            bookDb.setName(name);
        }
        if(author!=null && author.length()>0 && !Objects.equals(bookDb.getAuthor(),author)){
            bookDb.setAuthor(author);
        }

        if (price!=null && price>0 && Double.compare(bookDb.getPrice(),price) == 0){
            bookDb.setPrice(price);
        }

        if( quantity>0){
            bookDb.setQuantity(quantity);
        }

        bookRepository.save(bookDb);
    }

    public Resource getFile(Long bookId){
        Book bookDb=bookRepository.findById(bookId).orElseThrow(()->new IllegalStateException("Book id with"+bookId+"does not exist"));
        String filepath=bookDb.getInvoice();
        Path path = Paths.get(filepath);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return resource;

//        try {
//
//
//            if (resource.exists() || resource.isReadable()) {
//                return resource;
//            } else {
//                throw new RuntimeException("Could not read the file!");
//            }
//        } catch (MalformedURLException e) {
//            throw new RuntimeException("Error: " + e.getMessage());
//        }


    }


}
