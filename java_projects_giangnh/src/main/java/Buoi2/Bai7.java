import java.util.Scanner;

public class Bai7 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhap so nguyen: ");
        int n = scanner.nextInt();
        System.out.println(" ");
        System.out.println("Bang cuu chuong voi " + n + ":");
        for (int i = 1;i <= 10; i++) {
            int tich = n * i;
            System.out.println(n + "x" + i + "= " + tich);
        }
    }
}
