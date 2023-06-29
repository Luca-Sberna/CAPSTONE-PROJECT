package luca.sberna.capstone.empire.of.gamers.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "UsersProfile")
@Data
@NoArgsConstructor
public class UserProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@OneToOne(fetch = FetchType.LAZY)
	@JsonManagedReference
	@JoinColumn(name = "user_id")
	private User user;

	private String name;
	private String surname;
	private String nationality;
	private byte[] ImgProfile;
	private byte[] ImgBackground;

}
