package Buoi3_2_Quan_li_class;

import java.util.Scanner;

public class HocSinh {
    int tuoi;
    String tenHS, maHS;
    double diemToan, diemLy, diemHoa;

    public HocSinh() {
        this.maHS = "";
        this.tuoi = 0;
        this.tenHS = "";
        this.diemToan = 0;
        this.diemLy = 0;
        this.diemHoa = 0;
    }

    Scanner scanner = new Scanner(System.in);
    public void nhapThongTin(Scanner scanner) {
        System.out.println("Nhap ma hoc sinh: ");
        maHS = scanner.nextLine();
        System.out.println("Nhap ten hoc sinh: ");
        tenHS = scanner.nextLine();
        System.out.println("Nhap tuoi hoc sinh: ");
        tuoi = scanner.nextInt();
        System.out.println("Nhap diem Toan:");
        diemToan = scanner.nextDouble();
        System.out.println("Nhap diem Ly:");
        diemLy = scanner.nextDouble();
        System.out.println("Nhap diem Hoa:");
        diemHoa = scanner.nextDouble();
    }

    public void hienThiThongTin() {
        System.out.println("Ma hoc sinh la: " + maHS);
        System.out.println("Ten hoc sinh la: " + tenHS);
        System.out.println("Tuoi hoc sinh la: " + tuoi);
    }

    public void tinhDiemTrungBinh() {
        double dtb = (diemHoa + diemLy + diemToan) / 3;
        System.out.println("Diem trung binh la: " + dtb);
    }

    public void xepLoai() {
        double dtb = (diemHoa + diemLy + diemToan) / 3;
        if (dtb >= 8) {
            System.out.println("Xep loai Gioi");
        } else if (dtb >= 6.5) {
            System.out.println("Xep loai Kha");
        } else if (dtb >= 5) {
            System.out.println("Xep loai TB");
        } else {
            System.out.println("Xep loai Yeu");
        }
    }
}
