package luca.sberna.capstone.empire.of.gamers.entities;

import java.math.BigInteger;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import luca.sberna.capstone.empire.of.gamers.converters.CVVConverter;

@Entity
@Data
@Table(name = "CreditCards")
@NoArgsConstructor
@JsonIgnoreProperties({ "cvv" })
public class CreditCard {
	@Id
	@GeneratedValue
	private UUID id;

	private BigInteger cardNumber;

	private Date expirationDate;

	@Convert(converter = CVVConverter.class)
	private Integer cvv;

	private String name;

	private String surname;

	public CreditCard(BigInteger cardNumber, Date expirationDate, Integer cvv, String name, String surname) {
		super();
		this.cardNumber = cardNumber;
		this.expirationDate = expirationDate;
		this.cvv = cvv;
		this.name = name;
		this.surname = surname;
	}

}
