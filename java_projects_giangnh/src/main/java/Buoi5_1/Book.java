package Buoi5_1;

class Book extends Document {
    private String author;
    private int yearPublish;

    public Book(int id, String name, String author, int yearPublish) {
        super(id, name);
        this.author = author;
        this.yearPublish = yearPublish;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getYearPublish() {
        return yearPublish;
    }

    public void setYearPublish(int yearPublish) {
        this.yearPublish = yearPublish;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + super.getId() + '\'' +
                "id='" + super.getName() + '\'' +
                "author='" + author + '\'' +
                ", yearPublish=" + yearPublish +
                '}';
    }
};

