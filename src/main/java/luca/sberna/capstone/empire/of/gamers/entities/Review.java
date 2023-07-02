package luca.sberna.capstone.empire.of.gamers.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "review")
@NoArgsConstructor
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID idReview;

	@ManyToOne
	@JoinColumn(name = "id_User")
	private User user;

	@ManyToOne
	@JoinColumn(name = "id_Game")
	private Game game;

	private Integer rating;

	private String comment;
}
