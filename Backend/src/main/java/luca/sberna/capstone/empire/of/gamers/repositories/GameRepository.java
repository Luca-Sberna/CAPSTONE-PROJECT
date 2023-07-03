package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {
	Page<Game> findByRatings(Integer ratings, Pageable pageable);
}
