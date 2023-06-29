package luca.sberna.capstone.empire.of.gamers.payloads;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfilePayload {
	@Size(max = 16, message = "Il campo nome deve essere lungo al massimo 50 caratteri")
	private String name;
	@Size(max = 16, message = "Il campo cognome deve essere lungo al massimo 50 caratteri")
	private String surname;
	@Size(max = 20, message = "Il campo nazionalità deve essere lungo al massimo 50 caratteri")
	private String nazionalita;

	private MultipartFile profileImage;

	private MultipartFile backgroundImage;
}
