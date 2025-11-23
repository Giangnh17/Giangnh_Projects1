package com.example.demo.Service;

import com.example.demo.Model.Products;
import com.example.demo.dto.ProductCreateRequest;
import com.example.demo.dto.ProductUpdateRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private List<Products> mockProducts = new ArrayList<>(
            List.of(
                    new Products(1, "Shirt", 1000),
                    new Products(2, "Pants", 500),
                    new Products(3, "Dress", 800),
                    new Products(4, "Shoes", 550)
            )
    );


    @Override
    public List<Products> getListProduct() {
        return mockProducts;
    }

    @Override
    public Products getById(int id) {
        return mockProducts.stream()
                .filter(u -> u.getId() == id)
                .findFirst().get();
    }

    @Override
    public List<Products> searchListProducts(String name) {
        return mockProducts.stream()
                .filter(u -> u.getName().contains(name))
                .toList();
    }

    @Override
    public Products createProduct(ProductCreateRequest productCreateRequest) {
        Products product = new Products(
                (mockProducts.size() + 1),
                productCreateRequest.getName(),
                productCreateRequest.getPrice()
        );
        mockProducts.add(product);
        return product;
    }

    @Override
    public Products updateProduct(int id, ProductUpdateRequest productUpdateRequest) {
        for (Products product : mockProducts) {
            if (product.getId() == id) {
                product.setName(productUpdateRequest.getName());
                product.setPrice(productUpdateRequest.getPrice());
            }
        }

        Products product = mockProducts.stream()
                .filter(u -> u.getId() == id)
                .findFirst().get();
        return product;
    }

    @Override
    public Boolean deleteProduct(int id) {
        Products productDelete = mockProducts.stream()
                .filter(u -> u.getId() == id)
                .findFirst()
                .orElseGet(null);
        if (productDelete != null) {
            mockProducts.remove(productDelete);
            return true;
        } else {
            return false;
        }
    }
}