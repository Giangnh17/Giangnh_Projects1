import java.util.Scanner;

public class Bai5 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Hãy nhập số nguyên thứ nhất: ");
        int a = scanner.nextInt();
        System.out.println("Hãy nhập số nguyên thứ hai: ");
        int b = scanner.nextInt();
        System.out.println("Hãy nhập số nguyên thứ ba: ");
        int c = scanner.nextInt();
        if (a>b && a>c) {
            System.out.println("Số nguyên lớn nhất là: " + a);
        } else if (b>a && b>c) {
            System.out.println("Số nguyên lớn nhất là: " + b);
        } else {
            System.out.println("Số nguyên lớn nhất là: " + c);
        }
    }
}
