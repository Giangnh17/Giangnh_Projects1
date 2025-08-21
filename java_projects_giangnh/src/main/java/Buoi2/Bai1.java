import java.util.Scanner;

public class Bai1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Nhap so nguyen thu nhat: ");
        int songuyen1 = scanner.nextInt();
        System.out.println("Nhap so nguyen thu hai: ");
        int songuyen2 = scanner.nextInt();
        int tong = songuyen1 + songuyen2;
        System.out.println("Tong = " + tong);
    }
}
