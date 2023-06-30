package luca.sberna.capstone.empire.of.gamers.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import luca.sberna.capstone.empire.of.gamers.utils.GameState;

@Entity
@Data
@Table(name = "games")
@NoArgsConstructor
public class Game {
	@Id
	@GeneratedValue
	private UUID idGame;
	private String name;
	private String description;
	private Integer ratings;
	@Enumerated(EnumType.STRING)
	private GameState gameState;

	public Game(String name, String description, Integer ratings, GameState gameState) {
		super();
		this.name = name;
		this.description = description;
		this.ratings = ratings;
		this.gameState = gameState;
	}

}
