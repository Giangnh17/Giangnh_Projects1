//package com.example.demo.Model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import org.hibernate.annotations.SQLDelete;
//import org.hibernate.annotations.SQLRestriction;
//
//import java.util.List;
//
//@EqualsAndHashCode(callSuper = true)    //về nhà tìm hiểu
//@Entity
//@Table(name = "Customers")
//@Builder        //tạo object với trường bất kỳ, kh giới hạn tham số
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@SQLDelete(sql = "UPDATE Customers SET is_delete = 1, deleted_at = CURRENT_TIMESTAMP")
//@SQLRestriction("is_delete = false")       //chỉ lấy ra giá trị false khi select *
//public class Customers {
//
//    @Id
//    @GeneratedValue (strategy = GenerationType.AUTO)
//    @Column(name = "ID", nullable = false)
//    private Long customerId;
//
//    @OneToMany(mappedBy = "customers")
//    private List<Customers> customers;
//
//    @Column(name = "Name")
//    private String customerName;
//
//    @Column(name = "City")
//    private String customerCity;
//
//    @Column(name = "Email")
//    private String customerEmail;
//
//
//
//
//}
