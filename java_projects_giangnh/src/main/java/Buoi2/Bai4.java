import java.util.Scanner;

public class Bai4 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Nhap so nguyen: ");
        int songuyen = scanner.nextInt();
        if (songuyen % 2 == 0) {
            System.out.println("Đây là số chẵn");
        } else {
            System.out.println("Đây là số lẻ");
        }
    }
}
