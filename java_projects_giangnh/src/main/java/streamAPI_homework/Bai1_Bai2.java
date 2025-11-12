package streamAPI_homework;

import java.util.ArrayList;
import java.util.List;

public class Bai1_Bai2 {
    public static void main(String[] args) {
        List<Integer> integerList = new ArrayList<>();
        integerList.add(1);
        integerList.add(2);
        integerList.add(3);
        integerList.add(4);
        integerList.add(5);
        integerList.add(6);
        System.out.println("Danh sach so: ");
        integerList.forEach(System.out::println);

        //Bài 1: Lọc danh sách số chẵn
        List<Integer> evenList = integerList.stream().filter(n -> n % 2 == 0).toList();
        evenList.forEach(System.out::println);

        //Bài 2: Danh sách bình phương các số lẻ
        List<Integer> squaredList = integerList.stream().filter(n -> n % 2 != 0).map(n -> n * n).toList();
        squaredList.forEach(System.out::println);
    }
}
