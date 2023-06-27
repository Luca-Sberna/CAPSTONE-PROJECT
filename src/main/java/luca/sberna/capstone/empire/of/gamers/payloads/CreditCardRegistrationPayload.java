package luca.sberna.capstone.empire.of.gamers.payloads;

import java.math.BigInteger;
import java.util.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreditCardRegistrationPayload {

	@Size(min = 16, max = 16, message = "Il numero di carta deve essere di 16 cifre")
	private BigInteger cardNumber;

	@NotNull(message = "La data di scadenza deve essere specificata")
	private Date expirationDate;

	@Size(min = 3, max = 3, message = "Il CVV deve essere di 3 cifre")
	private Integer cvv;

	@NotNull(message = "Il nome deve essere specificato")
	private String name;

	@NotNull(message = "Il cognome deve essere specificato")
	private String surname;

}
