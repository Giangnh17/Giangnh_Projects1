import java.util.Scanner;

public class Bai10 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.printf("Nhap nam: ");
        int n = scanner.nextInt();
        if (n % 400 == 0 || n % 4 == 0 && n % 100 != 0) {
            System.out.println("Day la nam nhuan");
        } else {
            System.out.println("Day khong phai la nam nhuan");
        }
    }
}
