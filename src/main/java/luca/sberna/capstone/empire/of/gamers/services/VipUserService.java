package luca.sberna.capstone.empire.of.gamers.services;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.entities.VipUser;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;
import luca.sberna.capstone.empire.of.gamers.repositories.VipUserRepository;
import luca.sberna.capstone.empire.of.gamers.utils.UserRepositoryUtils;

@Service
public class VipUserService {
	@Autowired
	private final VipUserRepository vipUserRepository;
	@Autowired
	private final UserRepository userRepo;
	@Autowired
	private UserRepositoryUtils userRepositoryUtils;

	@Autowired
	public VipUserService(VipUserRepository vipUserRepository, UserService userService, UserRepository userRepo) {
		this.vipUserRepository = vipUserRepository;
		this.userRepo = userRepo;
	}

	public VipUser createVipUser() throws org.springframework.data.crossstore.ChangeSetPersister.NotFoundException {
		Date startDate = new Date(); // Data di inizio impostata sulla data corrente
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startDate);
		calendar.add(Calendar.MONTH, 1); // Aggiungi un mese alla data di inizio
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 999);
		Date endDate = calendar.getTime(); // Data di fine impostata sull'ultimo millisecondo dell'ultimo giorno del
											// mese corrente

		User currentUser = userRepositoryUtils.getCurrentUser();
		VipUser vipUser = new VipUser();
		vipUser.setUser(currentUser);
		vipUser.setStartDate(startDate);
		vipUser.setEndDate(endDate);

		return vipUserRepository.save(vipUser);
	}

	public Page<VipUser> getAllVipUsers(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

		return vipUserRepository.findAll(pageable);
	}

	public VipUser getVipUserById(UUID id) {
		return vipUserRepository.findById(id).orElseThrow(() -> new NotFoundException("Vip User not found"));
	}

	public VipUser updateVipUser(UUID id, VipUser payload) throws NotFoundException {
		VipUser foundVipUser = this.getVipUserById(id);

		if (payload.getUser() != null) {
			foundVipUser.setUser(payload.getUser());
		}
		if (payload.getStartDate() != null) {
			foundVipUser.setStartDate(payload.getStartDate());
		}
		if (payload.getEndDate() != null) {
			foundVipUser.setEndDate(payload.getEndDate());
		}

		return vipUserRepository.save(foundVipUser);
	}

	public void deleteVipUser(UUID id) throws NotFoundException {
		vipUserRepository.deleteById(id);
		;
	}
}
