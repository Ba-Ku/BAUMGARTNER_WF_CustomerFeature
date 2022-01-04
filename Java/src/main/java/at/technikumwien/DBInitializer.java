package at.technikumwien;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;

@Component
public class DBInitializer {
    @Autowired
    private CustomerRepository customerRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void handleApplicationReady() {
        customerRepository.saveAll(List.of(
                new Customer("Hans", "Hornstein", LocalDate.of(1970, 10, 01),true),
                new Customer("Max", "Mustermann", LocalDate.of(2001, 07, 07),true),
                new Customer("Vannessa", "Meyers", LocalDate.of(1990, 11, 18),false),
                new Customer("Romana", "Orlov", LocalDate.of(1982, 01, 22),true)
        ));
    }
}