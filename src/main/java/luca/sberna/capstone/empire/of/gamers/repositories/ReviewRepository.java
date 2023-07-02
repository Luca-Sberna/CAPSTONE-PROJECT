package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.Game;
import luca.sberna.capstone.empire.of.gamers.entities.Review;
import luca.sberna.capstone.empire.of.gamers.entities.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
	Page<Review> findByUser(User user, Pageable pageable);

	Page<Review> findByGame(Game game, Pageable pageable);
}