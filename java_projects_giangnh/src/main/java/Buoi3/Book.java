package Buoi3;

public class Book {
    String title;
    String author;
    int price;

    public Book(String tt, String au, int pr) {
        this.title = tt;
        this.author = au;
        this.price = pr;
    }

    public void showInfo() {
        System.out.println(title + " " + author + " " + price);
    }
}
