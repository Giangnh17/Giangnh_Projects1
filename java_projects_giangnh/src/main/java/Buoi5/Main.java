package Buoi5;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n;
        Scanner scanner = new Scanner(System.in);
        List<Student> studentList = new ArrayList<>();
        Student student = new Student(101, "Minh Hieu", 7.8);
        studentList.add(0, student);
        do {
            System.out.println("Vui long chọn:");
            System.out.println("1. Thêm sinh viên");
            System.out.println("2. Hiển thị thông tin sinh viên");
            System.out.println("3. Xóa sinh viên theo ID");
            System.out.println("4. Update điểm theo ID");
            System.out.println("5. Thoát chương trình");
            n = scanner.nextInt();
            scanner.nextLine();
            switch (n) {

                //Nhập thông tin sinh viên
                case 1:
                    System.out.println("Nhap ID: ");
                    int id = scanner.nextInt();
                    scanner.nextLine();
                    System.out.println("Nhap ten:");
                    String name = scanner.nextLine();
                    System.out.println("Nhap diem:");
                    double score = scanner.nextDouble();
                    scanner.nextLine();
                    studentList.add(new Student(id, name, score));
                    System.out.println("Đã thêm sinh viên!");
                    break;

                //Hiển thị thông tin sinh viên
                case 2:
                    System.out.println("Thông tin sinh viên:");
                    for (Student s : studentList) System.out.println(s);
                    break;

                //Xóa sinh viên theo ID
                case 3:
                    System.out.println("Nhập ID sinh viên cần xóa:");
                    int deleteID = scanner.nextInt();
                    boolean foundID = false;
                    for (int i = 0; i < studentList.size(); i++) {
                        if (deleteID == studentList.get(i).getId()) {
                            studentList.remove(i);
                            foundID = true;
                            System.out.println("Đã xóa sinh viên!");
                        }
                    } 
                    if (!foundID) {System.out.println("Không tìm thấy sinh viên này!");}
                    break;

                //Update điểm theo ID
                case 4:
                    System.out.println("Nhập ID sinh viên cần sửa:");
                    int updateID = scanner.nextInt();
                    boolean findUpdate = false;
                    for (Student s : studentList) {
                        if (updateID == s.getId()) {
                            System.out.println("Nhập điểm mới:");
                            s.setScore(scanner.nextDouble());
                            findUpdate = true;
                            System.out.println("Cập nhật điểm thành công!");
                        }
                    }
                    if (!findUpdate) {System.out.println("Không tìm thấy sinh viên này!");}
                    break;

                //Thoát chương trình
                case 5: System.exit(0);
                break;
            }
        } while (n != 5);
    }
}
