package Buoi4;

public class Main {
    public static void main(String[] args) {

        Student student1 = new Student(302, "Thuy Anh", 9.5);
        student1.displayInfo();

        student1.setScore(6.8);
        student1.displayInfo();

        student1.reset();
        student1.displayInfo();
    }
}
