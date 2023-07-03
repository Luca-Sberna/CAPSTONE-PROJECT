package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.entities.VipUser;

@Repository
public interface VipUserRepository extends JpaRepository<VipUser, UUID> {
	Page<VipUser> findByUser(User user, Pageable pageable);

}
