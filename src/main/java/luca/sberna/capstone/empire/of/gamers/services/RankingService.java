package luca.sberna.capstone.empire.of.gamers.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.Ranking;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.repositories.RankingRepository;
import luca.sberna.capstone.empire.of.gamers.utils.UserRepositoryUtils;

@Service
public class RankingService {
	@Autowired
	private final RankingRepository rankingRepository;
	@Autowired
	private final UserRepositoryUtils userRepositoryUtils;

	public RankingService(RankingRepository rankingRepository, UserRepositoryUtils userRepositoryUtils) {
		this.rankingRepository = rankingRepository;
		this.userRepositoryUtils = userRepositoryUtils;
	}

	public Ranking createRanking(Ranking ranking) {
		User currentUser = userRepositoryUtils.getCurrentUser();
		ranking.setUser(currentUser);
		return rankingRepository.save(ranking);
	}

	public Page<Ranking> getAllRankings(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return rankingRepository.findAll(pageable);
	}

	public Page<Ranking> getRankingsByUser(User user, int page, int size, String sortBy) {
		Page<Ranking> rankings = rankingRepository.findByUser(user, PageRequest.of(page, size, Sort.by(sortBy)));
		if (rankings.isEmpty()) {
			throw new NotFoundException("No rankings found for the user with ID: " + user.getIdUser());
		}
		return rankings;
	}

	public Ranking getRankingById(UUID id) {
		return rankingRepository.findById(id).orElseThrow(() -> new NotFoundException("ranking not found"));
	}

	public Ranking updateRanking(UUID id, Ranking payload) throws NotFoundException {
		Ranking foundRanking = this.getRankingById(id);

		if (payload.getUser() != null) {
			foundRanking.setUser(payload.getUser());
		}
		if (payload.getScore() != null) {
			foundRanking.setScore(payload.getScore());
		}

		return rankingRepository.save(foundRanking);
	}

	public void deleteRanking(UUID id) throws NotFoundException {
		rankingRepository.deleteById(id);
		;
	}
}
