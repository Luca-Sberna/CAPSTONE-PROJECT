package luca.sberna.capstone.empire.of.gamers.controllers;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import luca.sberna.capstone.empire.of.gamers.entities.Ranking;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;
import luca.sberna.capstone.empire.of.gamers.services.RankingService;
import luca.sberna.capstone.empire.of.gamers.utils.UserRepositoryUtils;

@RestController
@RequestMapping("/ranking")
public class RankingController {
	@Autowired
	private final RankingService rankingService;
	@Autowired
	private final UserRepositoryUtils userRepositoryUtils;
	@Autowired
	private final UserRepository userRepository;

	public RankingController(RankingService rankingService, UserRepositoryUtils userRepositoryUtils,
			UserRepository userRepository) {
		this.rankingService = rankingService;
		this.userRepositoryUtils = userRepositoryUtils;
		this.userRepository = userRepository;
	}

	@GetMapping("")
	public ResponseEntity<Page<Ranking>> getAllRankings(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		Page<Ranking> rankings = rankingService.getAllRankings(page, size, sortBy);
		return ResponseEntity.ok(rankings);
	}

	@GetMapping("/user/{idUser}")
	public ResponseEntity<Page<Ranking>> getRankingsByUser(@PathVariable UUID idUser,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "score") String sortBy) {
		// Verifica se l'ID dell'utente passato come parametro è corretto
		Optional<User> user = userRepository.findById(idUser);
		if (!user.isPresent()) {
			// L'utente con l'ID specificato non esiste
			return ResponseEntity.notFound().build();
		}

		User currentUser = userRepositoryUtils.getCurrentUser();

		try {
			Page<Ranking> rankings = rankingService.getRankingsByUser(currentUser, page, size, sortBy);
			return ResponseEntity.ok(rankings);
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ranking> getRankingById(@PathVariable UUID id) {
		Ranking ranking = rankingService.getRankingById(id);
		return ResponseEntity.ok(ranking);
	}

	@PostMapping("")
	public ResponseEntity<Ranking> createRanking(@RequestBody Ranking ranking) {
		Ranking createdRanking = rankingService.createRanking(ranking);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdRanking);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Ranking> updateRanking(@PathVariable UUID id, @RequestBody Ranking ranking) {
		try {
			Ranking updatedRanking = rankingService.updateRanking(id, ranking);
			return ResponseEntity.ok(updatedRanking);
		} catch (NotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRanking(@PathVariable UUID id) {
		try {
			rankingService.deleteRanking(id);
			return ResponseEntity.noContent().build();
		} catch (NotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
