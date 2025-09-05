package Buoi4;

public class Student {
    private int id;
    private String name;
    private double score;

    public Student(int id, String name, double score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public void displayInfo() {
        System.out.println("ID HS: " + getId());
        System.out.println("Ten HS: " + getName());
        System.out.println("Diem: " + getScore());
    }

    public void reset() {
        id = 0;
        name = "";
        score = 0;
    }
}
