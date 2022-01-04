package at.technikumwien;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.java.Log;

@RestController
@RequestMapping("/resources/customers")//news
@CrossOrigin
@Log
public class CustomersResource {
    @Autowired
    private CustomerRepository customerRepository;//NewsRepository newsRepository

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Customer customer) {//News news
        log.info("create() >> customer=" + customer);//news
        
        customer.setId(null);   // better safe than sorry
        customer = customerRepository.save(customer);//news
        
        var location = WebMvcLinkBuilder.linkTo(
		    WebMvcLinkBuilder.methodOn(getClass()).retrieve(customer.getId())//news
		).toUri();
		
        return ResponseEntity.created(location).build();
	}
    
    @GetMapping("/{id}")
    public Customer retrieve(@PathVariable long id) {//News
        log.info("retrieve() >> id=" + id);
        
        return customerRepository.findById(id)
            .orElseThrow(
                () -> new EmptyResultDataAccessException("can't find news with id " + id, 1)
            );
    }

    @PutMapping("/{id}")
    public void update(
    	@PathVariable long id,
    	@RequestBody Customer customer//News news
    ) {
        log.info("update() >> id=" + id + ", customer=" + customer);//news
        
        customer.setId(id); // better safe than sorry
        customerRepository.save(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        log.info("delete() >> id=" + id);
        
        customerRepository.deleteById(id);   // throws EmptyResultDataAccessException if news could not be found
    }

    @GetMapping
    public List<Customer> retrieveAll() {
        log.info("retrieveAll()");
        
        return customerRepository.findAll();
    }
}