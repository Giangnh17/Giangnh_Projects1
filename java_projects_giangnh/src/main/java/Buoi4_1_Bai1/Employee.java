package Buoi4_1_Bai1;

class Employee extends Person {
    public Employee(String name, int age) {
        super(name, age);
    }
    private int employeeId;
    private double salary;

    public Employee(String name, int age, int employeeId, double salary) {
        super(name, age);
        this.employeeId = employeeId;
        this.salary = salary;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Ma nhan vien: " + getEmployeeId());
        System.out.println("Luong: " + getSalary());
    }

    public void caculateAnnualSalary() {
        double tongLuong = getSalary() * 12;
        System.out.println(" Luong hang nam: " + tongLuong);
    }

    public void applyRaise(double percent) {
        setSalary(getSalary() + (getSalary() * percent) / 100);
    }

    public boolean isRetirementAge() {
        if (getAge() >= 60) {
            return true;
        } else {return false;}
    }
}

