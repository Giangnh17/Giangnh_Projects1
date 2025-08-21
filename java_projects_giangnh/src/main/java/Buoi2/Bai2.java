import java.util.Scanner;

public class Bai2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Nhap chieu dai: ");
        double chieudai = scanner.nextDouble();
        System.out.println("Nhap chieu rong: ");
        double chieurong = scanner.nextDouble();
        double dienTich = chieudai * chieurong;
        System.out.println("Dien tich hinh chu nhat la: " + dienTich);
    }
}
