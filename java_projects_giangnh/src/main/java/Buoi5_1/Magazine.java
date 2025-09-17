package Buoi5_1;

public class Magazine extends Document {
    public Magazine(int id, String name) {
        super(id, name);
    }

    private int numPublish;
    private int monthPublish;

    public Magazine(int id, String name, int numPublish, int monthPublish) {
        super(id, name);
        this.numPublish = numPublish;
        this.monthPublish = monthPublish;
    }

    public int getNumPublish() {
        return numPublish;
    }

    public void setNumPublish(int numPublish) {
        this.numPublish = numPublish;
    }

    public int getMonthPublish() {
        return monthPublish;
    }

    public void setMonthPublish(int monthPublish) {
        this.monthPublish = monthPublish;
    }

    @Override
    public String toString() {
        return "Magazine{" +
                "id='" + super.getId() + '\'' +
                "id='" + super.getName() + '\'' +
                "numPublish=" + numPublish +
                ", monthPublish=" + monthPublish +
                '}';
    }
}
