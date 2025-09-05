package Buoi4;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int id;
        String name;
        double score;

        Scanner scanner = new Scanner(System.in);

        Student student1 = new Student(302, "Thuy Anh", 9.5);
        student1.displayInfo();

        student1.setScore(6.8);
        student1.displayInfo();

        student1.reset();
        student1.displayInfo();
    }
}
