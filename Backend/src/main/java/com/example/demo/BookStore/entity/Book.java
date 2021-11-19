package com.example.demo.BookStore.entity;

import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String author;
    private int quantity;
    private Double price;
    private String invoice;

    public Book() {}

    public Book(String name, String author, int quantity,Double price,String invoice) {
        this.name = name;
        this.author = author;
        this.quantity=quantity;
        this.price = price;
        this.invoice=invoice;
    }



    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getInvoice() {
        return invoice;
    }

    public void setInvoice(String invoice) {
        this.invoice = invoice;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", invoice='" + invoice + '\'' +
                '}';
    }
}
