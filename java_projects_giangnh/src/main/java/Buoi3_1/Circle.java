package Buoi3_1;

public class Circle {
    double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double perimeter() {
        double chuvi = radius * 2 * Math.PI;
        return chuvi;
    }
    public double area() {
        double dientich = radius * radius * Math.PI;
        return dientich;
    }

    public void displayInfo() {
        System.out.println("Chu vi hinh tron: " + perimeter());
        System.out.println("Dien tich hinh tron: " + area());
    }
}
