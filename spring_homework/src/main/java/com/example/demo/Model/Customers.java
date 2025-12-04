package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)    //về nhà tìm hiểu
@Entity
@Table(name = "Customers")
@Builder        //tạo object với trường bất kỳ, kh giới hạn tham số
@Data
public class Customers {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    @Column(name = "ID", nullable = false)
    private Long customerId;

    @OneToMany(mappedBy = "customers")


    @Column(name = "Name")
    private String customerName;

    @Column(name = "City")
    private String customerCity;

    @Column(name = "Email")
    private String customerEmail;




}
