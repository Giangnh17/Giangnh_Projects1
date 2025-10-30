package java8_homework.Bai1;

public class Main {
    public static void main(String[] args) {
        Logger logger = new ConsoleLogger();
        logger.logError("Lỗi rùi nhé");
        logger.logInfo("Thông tin log file");
    }
}
