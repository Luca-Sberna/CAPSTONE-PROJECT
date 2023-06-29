package luca.sberna.capstone.empire.of.gamers.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import luca.sberna.capstone.empire.of.gamers.entities.UserProfile;
import luca.sberna.capstone.empire.of.gamers.services.UserProfileService;

@RestController
@RequestMapping("/userProfile")
public class UserProfileController {

	@Autowired
	private UserProfileService userProfileService;

	@Autowired
	public UserProfileController(UserProfileService userProfileService) {
		this.userProfileService = userProfileService;
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserProfile> getUserProfileById(@PathVariable UUID id) {
		UserProfile userProfile = userProfileService.getUserProfileById(id);
		if (userProfile != null) {
			return ResponseEntity.ok(userProfile);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("")
	public Page<UserProfile> getAllUserProfiles(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return userProfileService.getAllUserProfiles(page, size, sortBy);
	}

	@PostMapping("")
	public ResponseEntity<UserProfile> createUserProfile(@RequestBody UserProfile userProfile) {
		UserProfile createdUserProfile = userProfileService.createUserProfile(userProfile);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUserProfile);
	}

	@PutMapping("/{id}")
	public ResponseEntity<UserProfile> updateUserProfile(@PathVariable UUID id, @RequestBody UserProfile userProfile) {
		UserProfile updatedUserProfile = userProfileService.updateUserProfile(id, userProfile);
		if (updatedUserProfile != null) {
			return ResponseEntity.ok(updatedUserProfile);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUserProfile(@PathVariable UUID id) {
		userProfileService.deleteUserProfile(id);
		return ResponseEntity.noContent().build();
	}
}
