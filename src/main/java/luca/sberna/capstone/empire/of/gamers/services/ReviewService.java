package luca.sberna.capstone.empire.of.gamers.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.Game;
import luca.sberna.capstone.empire.of.gamers.entities.Review;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.payloads.ReviewPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.ReviewRepository;

@Service
public class ReviewService {
	private final ReviewRepository reviewRepository;

	@Autowired
	public ReviewService(ReviewRepository reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	public Review createReview(User user, Game game, int rating, String comment) {
		Review review = new Review();
		review.setUser(user);
		review.setGame(game);
		review.setRating(rating);
		review.setComment(comment);
		return reviewRepository.save(review);
	}

	public Page<Review> getAllReviews(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return reviewRepository.findAll(pageable);
	}

	public Review getReviewById(UUID id) {
		return reviewRepository.findById(id).orElseThrow(() -> new NotFoundException("ranking not found"));
	}

	public Review updateReview(UUID id, ReviewPayload request) throws NotFoundException {
		Review foundReview = getReviewById(id);

		if (request.getRating() != null) {
			foundReview.setRating(request.getRating());
		}

		if (request.getComment() != null) {
			foundReview.setComment(request.getComment());
		}

		return reviewRepository.save(foundReview);
	}

	public void deleteReview(UUID id) throws NotFoundException {
		reviewRepository.deleteById(id);
		;
	}

	public Page<Review> getReviewsByUser(User user, int page, int size, String sortBy) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		Page<Review> reviews = reviewRepository.findByUser(user, pageable);
		if (reviews.isEmpty()) {
			throw new NotFoundException("No reviews found for the user with ID: " + user.getIdUser());
		}
		return reviews;
	}

	public Page<Review> getReviewsByGame(Game game, int page, int size, String sortBy) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		Page<Review> reviews = reviewRepository.findByGame(game, pageable);

		if (reviews.isEmpty()) {
			throw new NotFoundException("No reviews found for the game with ID: " + game.getIdGame());
		}
		return reviews;
	}

}
