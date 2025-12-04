package com.example.demo.Controller;

import com.example.demo.Model.Products;
import com.example.demo.Service.UserService;
import com.example.demo.dto.ProductCreateRequest;
import com.example.demo.dto.ProductUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class UserController {
    @Autowired
    private UserService userService;

    //Bài 1: Xem tất cả sản phẩm
    @GetMapping()
    public List<Products> getProducts() {
        return userService.getListProduct();
    }

    //Bài 2: Xem sản phẩm theo ID
    @GetMapping("/{id}")
    public Products getProductById(@PathVariable int id) {
        return userService.getById(id);
    }

    //Bài 3: Tìm kiếm sản phẩm theo tên
    @GetMapping("/search")
    public List<Products> searchProducts(@RequestParam("name") String name) {
        return userService.searchListProducts(name);
    }

    //Bài 4: Thêm sản phẩm mới
    @PostMapping()
    public Products createProduct(@RequestBody ProductCreateRequest productCreateRequest) {
        return userService.createProduct(productCreateRequest);
    }

    //Bài 5: Sửa thông tin sản phẩm
    @PutMapping("/{id}")
    public Products updateProduct(@PathVariable int id, @RequestBody ProductUpdateRequest productUpdateRequest) {
        return userService.updateProduct(id, productUpdateRequest);
    }

    //Bài 6: Xóa sản phẩm
    @DeleteMapping("/{id}")
    public Boolean deleteProduct(@PathVariable int id) {
        return userService.deleteProduct(id);
    }
}
