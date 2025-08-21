import java.util.Scanner;

public class Bai6 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Nhap diem trung binh cua hoc sinh: ");
        double diemTB = scanner.nextDouble();
        System.out.print("Xep loai: ");
        if (diemTB >= 8) {
            System.out.println("Gioi");
                    }
        else if (diemTB >= 6.5) {
            System.out.println("Kha");

                }
        else if (diemTB >= 5) {
            System.out.println("Trung binh");
            }
        else {
            System.out.println("Yeu");
        }
    }
}
