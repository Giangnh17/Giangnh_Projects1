package java8_homework.Bai2;

public class Main {
    public static void main(String[] args) {
        // Cộng
        MathOperation add = (a, b) -> a + b;

        // Trừ
        MathOperation subtract = (a, b) -> a - b;

        // Nhân
        MathOperation multiply = (a, b) -> a * b;

        // Chia (có kiểm tra chia cho 0)
        MathOperation divide = (a, b) -> {
            if (b == 0) {
                System.out.println("Không thể chia cho 0!");
                return 0;
            }
            return a / b;
        };

        // Test các phép tính
        int x = 6, y = 3;

        System.out.println("Cộng: " + add.operate(x, y));
        System.out.println("Trừ: " + subtract.operate(x, y));
        System.out.println("Nhân: " + multiply.operate(x, y));
        System.out.println("Chia: " + divide.operate(x, y));
    }
}
