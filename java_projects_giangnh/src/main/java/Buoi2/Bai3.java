import java.util.Scanner;

public class Bai3 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        final double pi = 3.1415;

        System.out.println("Nhap ban kinh hinh tron: ");
        double bankinh = scanner.nextDouble();
        double chuvi = 2 * pi * bankinh;
        double dientich = pi * bankinh * bankinh;
        System.out.println("Chu vi hinh tron la: " + chuvi);
        System.out.println("Dien tich hinh tron la: " + dientich);
    }
}
