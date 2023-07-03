package luca.sberna.capstone.empire.of.gamers.payloads;

import lombok.Data;
import luca.sberna.capstone.empire.of.gamers.utils.GameState;

@Data
public class GameRegistrationPayload {
	private String name;
	private String description;
	private Integer ratings;
	private GameState gameState;

}
