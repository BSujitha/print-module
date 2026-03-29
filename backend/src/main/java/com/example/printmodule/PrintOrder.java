package com.example.printmodule;

import jakarta.persistence.*;

@Entity
public class PrintOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private int pages;
    private String type;
    private int copies;
    private double price;

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }

    public void setFileName(String fileName) { this.fileName = fileName; }

    public int getPages() { return pages; }

    public void setPages(int pages) { this.pages = pages; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public int getCopies() { return copies; }

    public void setCopies(int copies) { this.copies = copies; }

    public double getPrice() { return price; }

    public void setPrice(double price) { this.price = price; }
}