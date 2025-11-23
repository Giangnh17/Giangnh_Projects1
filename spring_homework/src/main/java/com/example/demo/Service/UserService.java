package com.example.demo.Service;

import com.example.demo.Model.Products;
import com.example.demo.dto.ProductCreateRequest;
import com.example.demo.dto.ProductUpdateRequest;

import java.util.List;

public interface UserService {

    List<Products> getListProduct();

    Products getById(int id);

    List<Products> searchListProducts(String name);

    Products createProduct(ProductCreateRequest productCreateRequest);

    Products updateProduct(int id, ProductUpdateRequest productUpdateRequest);

    Boolean deleteProduct(int id);
}
