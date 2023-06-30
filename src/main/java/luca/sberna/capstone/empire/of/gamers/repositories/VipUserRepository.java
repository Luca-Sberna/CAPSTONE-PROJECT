package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.VipUser;

@Repository
public interface VipUserRepository extends JpaRepository<VipUser, UUID> {
	// Puoi aggiungere metodi personalizzati qui se necessario
}
