package at.technikumwien;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name="t_news")
public class Customer {//News
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 100)
	private String firstName;
	
	@Column(nullable = false, length = 200)
	private String lastName;

	@Column(nullable = false, length = 1000)
	private LocalDate birthdate;

	@Column(nullable = false)
	private boolean isActive;
	
	public Customer(String firstName, String lastName, LocalDate birthdate, boolean isActive) {
		this(null, firstName, lastName, birthdate, isActive);
	}
}