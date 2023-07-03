package luca.sberna.capstone.empire.of.gamers.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.entities.UserProfile;
import luca.sberna.capstone.empire.of.gamers.repositories.UserProfileRepository;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;
import luca.sberna.capstone.empire.of.gamers.utils.UserRepositoryUtils;

@Service
public class UserProfileService {
	@Autowired
	private final UserProfileRepository userProfileRepo;

	@Autowired
	private UserRepositoryUtils userRepositoryUtils;

	@Autowired
	public UserProfileService(UserProfileRepository userProfileRepo, UserRepositoryUtils userRepositoryUtils,
			UserRepository userRepository) {
		this.userProfileRepo = userProfileRepo;
		this.userRepositoryUtils = userRepositoryUtils;
	}

	public UserProfile createUserProfile(UserProfile userProfile) {
		UserProfile newProfile = new UserProfile();
		newProfile.setName(userProfile.getName());
		newProfile.setSurname(userProfile.getSurname());
		newProfile.setNationality(userProfile.getNationality());
		newProfile.setImgBackground(userProfile.getImgBackground());
		newProfile.setImgProfile(userProfile.getImgProfile());

		// Imposta l'utente corrente associato al profilo
		User currentUser = userRepositoryUtils.getCurrentUser();
		newProfile.setUser(currentUser);

		return userProfileRepo.save(newProfile);
	}

	public UserProfile getUserProfileById(UUID idProfile) {
		return userProfileRepo.findById(idProfile).orElse(null);
	}

	public UserProfile updateUserProfile(UUID idProfile, UserProfile userProfile) {
		UserProfile existingUserProfile = userProfileRepo.findById(idProfile)
				.orElseThrow(() -> new RuntimeException("UserProfile not found with ID: " + idProfile));

		existingUserProfile.setName(userProfile.getName());
		existingUserProfile.setSurname(userProfile.getSurname());
		existingUserProfile.setNationality(userProfile.getNationality());
		existingUserProfile.setImgBackground(userProfile.getImgBackground());
		existingUserProfile.setImgProfile(userProfile.getImgProfile());

		// Aggiorna altre proprietà come necessario

		return userProfileRepo.save(existingUserProfile);
	}

	public void deleteUserProfile(UUID idProfile) {
		userProfileRepo.deleteById(idProfile);
	}

	public UserProfile updateUserProfileImage(UUID idUser, String profileImage) {
		UserProfile userProfile = userProfileRepo.findById(idUser)
				.orElseThrow(() -> new RuntimeException("UserProfile not found with ID: " + idUser));
		userProfile.setImgProfile(profileImage);
		return userProfileRepo.save(userProfile);
	}

	public UserProfile updateUserProfileBackground(UUID idUser, String background) {
		UserProfile userProfile = userProfileRepo.findById(idUser)
				.orElseThrow(() -> new RuntimeException("UserProfile not found with ID: " + idUser));
		userProfile.setImgBackground(background);
		return userProfileRepo.save(userProfile);
	}

	public Page<UserProfile> getAllUserProfiles(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return userProfileRepo.findAll(pageable);
	}

	public Page<UserProfile> getUserProfileByUser(User user, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return userProfileRepo.findByUser(user, pageable);
	}
}
