package com.example.demo.dto;

public class ProductUpdateRequest {
    private String name;
    private int price;

    public ProductUpdateRequest() {
    }

    public ProductUpdateRequest(String name, int price) {
        this.name = name;
        this.price = price;
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

    @Override
    public String toString() {
        return "ProductUpdateRequest{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
