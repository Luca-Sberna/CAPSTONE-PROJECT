package luca.sberna.capstone.empire.of.gamers.entities;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import luca.sberna.capstone.empire.of.gamers.utils.UserType;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({ "password" })
public class User {
	@Id
	@GeneratedValue
	private UUID idUser;
	private String username;
	private String email;
	private String password;
	private Date birthDate;
	@Enumerated(EnumType.STRING)
	private UserType role;

	public User(String username, String email, String password, Date birthDate, UserType role) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.birthDate = birthDate;
		this.role = UserType.USER;
	}

}
