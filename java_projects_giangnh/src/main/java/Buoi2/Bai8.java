import java.util.Scanner;

public class Bai8 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.printf("Nhap so nguyen n: ");
        int n = scanner.nextInt();
        System.out.printf(" ");
        System.out.printf("Tong cac so tu 1 den " + n + " bang: ");
        int tong = 0;
        for (int i = 0; i <= n; i++) {
            tong += i;
        }
        System.out.printf(String.valueOf(tong));
    }
}
