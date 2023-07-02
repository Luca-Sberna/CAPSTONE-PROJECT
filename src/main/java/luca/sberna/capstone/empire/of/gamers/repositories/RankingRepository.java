package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.Ranking;
import luca.sberna.capstone.empire.of.gamers.entities.User;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, UUID> {
	Page<Ranking> findByUser(User user, Pageable pageable);

}
