package luca.sberna.capstone.empire.of.gamers.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.Game;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.payloads.GameRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.GameRepository;

@Service
public class GameService {
	private final GameRepository gameRepository;

	@Autowired
	public GameService(GameRepository gameRepository) {
		this.gameRepository = gameRepository;
	}

	public Game createGame(GameRegistrationPayload payload) {
		Game game = new Game(payload.getName(), payload.getDescription(), payload.getRatings(), payload.getInfoToPlay(),
				payload.getCommands(), payload.getImage());
		return gameRepository.save(game);
	}

	public Game getGameById(UUID gameId) {
		Optional<Game> gameOptional = gameRepository.findById(gameId);
		if (gameOptional.isPresent()) {
			return gameOptional.get();
		}
		throw new NotFoundException("Game not found");
	}

	public Page<Game> getAllGames(Pageable pageable) {
		return gameRepository.findAll(pageable);
	}

	public void deleteGame(UUID gameId) {
		if (gameRepository.existsById(gameId)) {
			gameRepository.deleteById(gameId);
		} else {
			throw new NotFoundException("Game not found");
		}
	}

	public Game updateGame(UUID gameId, GameRegistrationPayload payload) {
		Optional<Game> gameOptional = gameRepository.findById(gameId);
		if (gameOptional.isPresent()) {
			Game game = gameOptional.get();
			game.setName(payload.getName());
			game.setDescription(payload.getDescription());
			game.setRatings(payload.getRatings());
			game.setInfoToPlay(payload.getInfoToPlay());
			game.setCommands(payload.getCommands());
			game.setImage(payload.getImage());
			// Puoi aggiornare altre proprietà del gioco se necessario
			return gameRepository.save(game);
		}
		throw new NotFoundException("Game not found");
	}

	public Page<Game> getGamesByRatings(int ratings, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return gameRepository.findByRatings(ratings, pageable);
	}
}
