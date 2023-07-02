package luca.sberna.capstone.empire.of.gamers.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import luca.sberna.capstone.empire.of.gamers.entities.Game;
import luca.sberna.capstone.empire.of.gamers.payloads.GameRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.services.GameService;

@RestController
@RequestMapping("/game")
public class GameController {
	private final GameService gameService;

	@Autowired
	public GameController(GameService gameService) {
		this.gameService = gameService;
	}

	@PostMapping("")
	public ResponseEntity<Game> createGame(@RequestBody GameRegistrationPayload payload) {
		Game createdGame = gameService.createGame(payload);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdGame);
	}

	@GetMapping("/{idGame}")
	public ResponseEntity<Game> getGameById(@PathVariable UUID idGame) {
		Game game = gameService.getGameById(idGame);
		return ResponseEntity.ok(game);
	}

	@GetMapping("")
	public ResponseEntity<Page<Game>> getAllGames(Pageable pageable) {
		Page<Game> games = gameService.getAllGames(pageable);
		return ResponseEntity.ok(games);
	}

	@DeleteMapping("/{idGame}")
	public ResponseEntity<Void> deleteGame(@PathVariable UUID idGame) {
		gameService.deleteGame(idGame);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{idGame}")
	public ResponseEntity<Game> updateGame(@PathVariable UUID idGame, @RequestBody GameRegistrationPayload payload) {
		Game updatedGame = gameService.updateGame(idGame, payload);
		return ResponseEntity.ok(updatedGame);
	}

	@GetMapping("/ratings/{ratings}")
	public Page<Game> getGamesByRatings(@PathVariable Integer ratings, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		return gameService.getGamesByRatings(ratings, page, size);
	}
}
