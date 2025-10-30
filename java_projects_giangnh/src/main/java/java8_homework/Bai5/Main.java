package java8_homework.Bai5;

import java.util.Optional;

public class Main {
    public static void main(String[] args) {

        String nameValue = null;
        Optional<String> name = Optional.ofNullable(nameValue);

        //Cách 1
        System.out.println(name.orElse("N/A"));

        //Cách 2
        if (name.isPresent()) {
            System.out.println(name.get());
        } else System.out.println("N/A");
    }
}
