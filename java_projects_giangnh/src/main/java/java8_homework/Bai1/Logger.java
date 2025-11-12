package java8_homework.Bai1;

public interface Logger {
    void log(String message);

    //tạo default method log Error và logInfo
    default void logError(String message) {
        log("[ERROR]" + message);
    }

    default void logInfo(String message) {
        log("[INFO]" + message);
    }

    default void logWarning(String message) {
        log("[WARNING] " + message);
    }
}
