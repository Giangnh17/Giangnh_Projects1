package streamAPI_homework;

import java.util.List;
import java.util.Optional;

public class Bai5 {
    public static void main(String[] args) {
        List<Integer> numberList = List.of(1, 2, 3, 4, 5, 6);

        Optional<Integer> sum = numberList.stream().reduce((a, b) -> a + b);
        System.out.println(sum.get());
    }
}
