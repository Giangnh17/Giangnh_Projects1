package Buoi3_1;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Nhap chieu rong: ");
        double width = scanner.nextDouble();
        System.out.println("Nhap chieu dai: ");
        double height = scanner.nextDouble();
        System.out.println("Nhap ban kinh: ");
        double radius = scanner.nextDouble();

        Rectangle hcn = new Rectangle(width, height);
        hcn.width = width;
        hcn.height = height;

        Circle htron = new Circle(radius);
        htron.radius = radius;

        hcn.displayInfo();
        htron.displayInfo();

        double tongCV = hcn.perimeter() + htron.perimeter();
        System.out.println("Tong chu vi hai hinh la: " + tongCV);
        double tongDT = hcn.area() + htron.area();
        System.out.println("Tong dien tich hai hinh la: " + tongDT);
    }
}
