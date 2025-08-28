package Buoi3_1;

public class Rectangle {
    double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double perimeter() {
        double chuvi = (width + height) * 2;
        return chuvi;
    }

    public double area() {
        double dientich = width * height;
        return dientich;
    }

    public void displayInfo() {
        System.out.println("Chu vi hinh chu nhat: " + perimeter());
        System.out.println("Dien tich hinh chu nhat: " + area());
    }
}
