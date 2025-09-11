package Buoi4_1_Bai1;

public class Main {
    public static void main(String[] args) {
        Employee employee1 = new Employee("Nam", 50, 102, 258.6);

        employee1.displayInfo();
        employee1.caculateAnnualSalary();
        employee1.applyRaise(10);
        employee1.displayInfo();
        employee1.isRetirementAge();
        if (employee1.isRetirementAge()) {
            System.out.println("Da den tuoi nghi huu");
        } else System.out.println("Chua den tuoi nghi huu");
    }
}
