package luca.sberna.capstone.empire.of.gamers.payloads;

import lombok.Data;

@Data
public class GameRegistrationPayload {
	private String name;
	private String description;
	private Integer ratings;
	private String infoToPlay;
	private String commands;
	private String image;
}
