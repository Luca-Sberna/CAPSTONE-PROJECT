package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.CreditCard;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, UUID> {

}
