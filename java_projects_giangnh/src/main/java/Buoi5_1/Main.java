package Buoi5_1;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int id, yearPublish, numPublish, monthPublish;
        String name, author;
        Scanner scanner = new Scanner(System.in);
        Book book1 = new Book(1,"Hoang tu be", "A", 2004);
        Magazine magazine1 = new Magazine(2, "Hoa hoc tro", 2020, 8);
        List<Document> documents = new ArrayList<Document>();
        documents.add(book1);
        documents.add(magazine1);

        do {
            System.out.println("--- MENU CHÍNH ---");
            System.out.println("1. Thêm sách");
            System.out.println("2. Thêm tạp chí");
            System.out.println("3. Xóa tài liệu theo ID");
            System.out.println("4. Tìm kiếm tài liệu theo tên");
            System.out.println("5. Hiển thị tất cả tài liệu");
            System.out.println("0. Thoát chương trình");
            System.out.print("Vui lòng chọn: ");

            int i = scanner.nextInt();
            scanner.nextLine();
            switch (i) {
                case 1:
                    System.out.printf("Nhập ID: ");
                    id = scanner.nextInt();
                    scanner.nextLine();
                    System.out.printf("Nhập tên sách: ");
                    name = scanner.nextLine();
                    System.out.printf("Nhập tên tác giả: ");
                    author = scanner.nextLine();
                    System.out.printf("Nhập năm phát hành: ");
                    yearPublish = scanner.nextInt();
                    scanner.nextLine();

                    documents.add(new Book(id, name, author, yearPublish));
                    System.out.println("Đã thêm sách thành công!");
                    break;

                case 2:
                    System.out.printf("Nhập ID: ");
                    id = scanner.nextInt();
                    scanner.nextLine();
                    System.out.printf("Nhập tên tạp chí: ");
                    name = scanner.nextLine();
                    System.out.printf("Nhập số phát hành: ");
                    numPublish = scanner.nextInt();
                    scanner.nextLine();
                    System.out.printf("Nhập tháng phát hành: ");
                    monthPublish = scanner.nextInt();
                    scanner.nextLine();

                    documents.add(new Magazine(id, name, numPublish, monthPublish));
                    System.out.printf("Đã thêm tạp chí thành công!");
                    break;

                case 3:
                    System.out.print("Nhập ID tài liệu cần xóa: ");
                    int deleteID = scanner.nextInt();
                    scanner.nextLine();
                    int index = -1;
                    boolean foundID = false;
                    for (Document document : documents) {
                        if (deleteID == document.getId()) {
                            index = documents.indexOf(document);
                            foundID = true;
                            System.out.println("Đã xóa thành công!");
                        }
                    }
                    documents.remove(index);
                    if (!foundID) {
                        System.out.println("Không tìm thấy ID!");
                    }
                    break;

                case 4:
                    System.out.print("Nhập tên tài liệu cần tìm kiếm: ");
                    String findName = scanner.nextLine();
                    boolean foundName = false;
                    for (Document document : documents) {
                        if (document.getName().trim().equals(findName.trim())) {
                            System.out.println(document);
                            foundName = true;
                        }
                    }
                    if (!foundName) System.out.println("Không có tài liệu cần tìm!");
                    break;

                case 5:
                    System.out.println("Danh sách tài liệu:");
                    for (Document document : documents) {
                        System.out.println(document);
                    }
                    break;

                case 0:
                    System.out.println("Thoát chương trình.");
                    System.exit(0);
                    break;

                default:
                    System.out.println("Nhập không hợp lệ, vui lòng nhập lại!");
                    break;
            }
        } while (true);

    }
}
