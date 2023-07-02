package luca.sberna.capstone.empire.of.gamers.controllers;

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

import luca.sberna.capstone.empire.of.gamers.entities.Game;
import luca.sberna.capstone.empire.of.gamers.entities.Review;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.payloads.ReviewPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.GameRepository;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;
import luca.sberna.capstone.empire.of.gamers.services.ReviewService;
import luca.sberna.capstone.empire.of.gamers.utils.UserRepositoryUtils;

@RestController
@RequestMapping("/review")
public class ReviewController {
	@Autowired
	private UserRepositoryUtils userRepositoryUtils;
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private GameRepository gameRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/{gameId}")
	public ResponseEntity<Review> createReview(@PathVariable UUID gameId, @RequestBody ReviewPayload reviewPayload) {
		User currentUser = userRepositoryUtils.getCurrentUser();

		Game game = gameRepository.findById(gameId)
				.orElseThrow(() -> new NotFoundException("Game not found with ID: " + gameId));

		Review review = reviewService.createReview(currentUser, game, reviewPayload.getRating(),
				reviewPayload.getComment());
		return ResponseEntity.status(HttpStatus.CREATED).body(review);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Review> getReviewById(@PathVariable UUID id) {
		try {
			Review review = reviewService.getReviewById(id);
			return ResponseEntity.ok(review);
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Review> updateReview(@PathVariable UUID id, @RequestBody ReviewPayload request) {
		try {
			Review updatedReview = reviewService.updateReview(id, request);
			return ResponseEntity.ok(updatedReview);
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReview(@PathVariable UUID id) {
		try {
			reviewService.deleteReview(id);
			return ResponseEntity.noContent().build();
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("")
	public ResponseEntity<Page<Review>> getAllReviews(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "idReview") String sortBy) {
		Page<Review> reviews = reviewService.getAllReviews(page, size, sortBy);
		return ResponseEntity.ok(reviews);
	}

	@GetMapping("/user/{idUser}")
	public ResponseEntity<Page<Review>> getReviewsByUser(@PathVariable String idUser,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "idReview") String sortBy) {
		User user = userRepositoryUtils.getCurrentUser();

		try {
			Page<Review> reviews = reviewService.getReviewsByUser(user, page, size, sortBy);
			return ResponseEntity.ok(reviews);
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/game/{idGame}")
	public ResponseEntity<Page<Review>> getReviewsByGame(@PathVariable UUID idGame,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "idReview") String sortBy) {
		// Ottenere il gioco dal tuo repository o servizio
		Game game = gameRepository.findById(idGame)
				.orElseThrow(() -> new NotFoundException("Game not found with ID: " + idGame));

		try {
			Page<Review> reviews = reviewService.getReviewsByGame(game, page, size, sortBy);
			return ResponseEntity.ok(reviews);
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

}
