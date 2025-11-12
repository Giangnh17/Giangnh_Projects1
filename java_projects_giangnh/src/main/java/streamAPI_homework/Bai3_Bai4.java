package streamAPI_homework;

import java.util.ArrayList;
import java.util.List;

public class Bai3_Bai4 {
    public static void main(String[] args) {
        List<String> nameList = new ArrayList<>();
        nameList.add("Hoan");
        nameList.add("An");
        nameList.add("Vy");
        nameList.add("Thom");
        nameList.add("Hong");

        //Bài 3
        long countName = nameList.stream().filter(e -> e.length() > 3).count();
        System.out.println(countName);

        //Bài 4
        List<String> sortedNameList = nameList.stream()
                                    .filter(e -> !e.equals("")) //lọc tên rỗng
                                    .sorted() // sắp xếp theo bảng chữ cái
                                    .toList();
        sortedNameList.forEach(System.out::println);
    }
}
