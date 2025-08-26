package Buoi3;

public class Main {
    public static void main(String[] args) {
        Book b1 = new Book("Hoàng hôn xa", "Ngọc Diệp", 50000);
        Book b2 = new Book("Romance", "Rowling", 126000);
        Book b3 = new Book("Minh Ti", "Jet2", 36000);

        b1.showInfo();
        b2.showInfo();
        b3.showInfo();
    }
}
