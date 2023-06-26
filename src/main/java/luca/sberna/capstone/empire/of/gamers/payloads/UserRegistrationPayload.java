package luca.sberna.capstone.empire.of.gamers.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationPayload {
	@Size(min = 3, max = 15, message = "Username must be at most 15 characters long")
	private String username;

	@Email(message = "Invalid email format")
	private String emailUtente;

//	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\bd)(?=.*[@$!%*#?&])[A-Za-z\bd@$!%*#?&]{8,}$", 
//			message = "Password must be at least 8 characters long and contain at least one digit, one letter, and one special character")
	@Size(min = 8, message = "Password must be at least 8 characters long")
	private String password;
}
