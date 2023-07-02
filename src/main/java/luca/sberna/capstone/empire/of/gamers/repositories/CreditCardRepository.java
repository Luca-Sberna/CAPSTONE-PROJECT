package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.CreditCard;
import luca.sberna.capstone.empire.of.gamers.entities.User;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, UUID> {
	Page<CreditCard> findByUser(User user, Pageable pageable);
}
