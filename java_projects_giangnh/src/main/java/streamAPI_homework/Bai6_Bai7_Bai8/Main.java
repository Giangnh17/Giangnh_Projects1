package streamAPI_homework.Bai6_Bai7_Bai8;

import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Nam", 17));
        personList.add(new Person("Hoa", 18));
        personList.add(new Person("Hoanh", 22));
        personList.add(new Person("Linh", 27));

    //Bài 6
        //Lọc những người có tuổi >= 20
        List<Person> above20List = personList.stream().filter(e -> e.getAge() >= 20).toList();
        System.out.println("Danh sách những người có tuổi >= 20 là:");
        above20List.forEach(System.out::println);

        //Lấy danh sách tên người đó
        List<String> nameList = above20List.stream().map(e -> e.getName()).toList();
        System.out.println("Danh sách tên:");
        nameList.forEach(e -> System.out.println(e));

        //Sắp xếp theo tuổi giảm dần
        List<Person> sortedList = personList.stream()
                                .sorted(Comparator.comparing(Person::getAge)
                                .reversed())
                                .toList();
        System.out.println("Danh sách theo tuổi giảm dần:");
        sortedList.forEach(System.out::println);

    //Bài 7
        //Check if <18
        personList.stream()
                .anyMatch(e -> e.getAge() < 18);

        //Check if all >15
        personList.stream()
                .allMatch(e -> e.getAge() > 15);

    //Bài 8
        String sumName = personList.stream()
                .map(e -> e.getName())
                .collect(Collectors.joining(", "));
        System.out.println("Cộng chuỗi tên: " + sumName);
    }
}
