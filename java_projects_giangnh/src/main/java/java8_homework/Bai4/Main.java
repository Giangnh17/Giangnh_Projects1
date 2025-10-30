package java8_homework.Bai4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);

        List<Integer> squaredNumbers = numbers.stream().map(MathUtils::square).collect(Collectors.toList());
        System.out.println("Danh sách bình phương:" + squaredNumbers);
    }
}
