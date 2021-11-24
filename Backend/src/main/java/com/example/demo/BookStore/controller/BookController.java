package com.example.demo.BookStore.controller;

import com.example.demo.BookStore.service.BookService;
import com.example.demo.BookStore.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "books")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService){
        this.bookService=bookService;
    }

    @GetMapping
    public List<Book> getBooks(){
        return bookService.getBooks();
    }

    @GetMapping(path = "{id}")
    public Book getBook(@PathVariable("id") Long id){return bookService.getBook(id);}

    @GetMapping(path = "invoice/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable("id") Long id){
        Resource file= bookService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addBook(@RequestParam("name") String name,
                        @RequestParam("author") String author,
                        @RequestParam("quantity") int quantity,
                        @RequestParam("price") Double price,
                        @RequestParam("file") MultipartFile file) throws IOException {
        bookService.addBook(name,author,quantity,price,file);
    } //requestParam name is taken from input name from form

    @DeleteMapping(path = "{bookId}")
    public void deleteBook(@PathVariable("bookId") Long bookId){
        bookService.deleteBook(bookId);
    }

    @PutMapping(path = "{bookId}")
    public void updateBook(@PathVariable("bookId") Long bookId,
                           @RequestParam(required=false,name="name") String name,
                           @RequestParam(required=false,name="author") String author,
                           @RequestParam(required=false,name="quantity") int quantity,
                           @RequestParam(required=false,name="price") Double price,
                           @RequestParam(required=false,name="file") MultipartFile file){
        bookService.updateBook(bookId,name,author,quantity,price,file);
    }

}
