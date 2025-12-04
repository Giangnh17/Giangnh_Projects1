package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "Products")
public class Products {

    @Id     //Định nghĩa cột khóa chính của entity
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductID", nullable = false)
    private int id;

    @Column(name = "ProductName", nullable = false)
    private String name;

    @Column(name = "UnitPrice", nullable = false)
    private int price;


    private int inStock;

    public Products(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
