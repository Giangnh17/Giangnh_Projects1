package Buoi3_2_Quan_li_class;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    HocSinh hocSinh1 = new HocSinh();
        
    hocSinh1.nhapThongTin(scanner);
    hocSinh1.hienThiThongTin();
    hocSinh1.tinhDiemTrungBinh();
    hocSinh1.xepLoai();
    }
}
