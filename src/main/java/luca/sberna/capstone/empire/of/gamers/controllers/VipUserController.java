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

import luca.sberna.capstone.empire.of.gamers.entities.VipUser;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.services.UserService;
import luca.sberna.capstone.empire.of.gamers.services.VipUserService;

@RestController
@RequestMapping("/vipUser")
public class VipUserController {
	@Autowired
	private final VipUserService vipUserService;
	@Autowired
	private final UserService userService;

	@Autowired
	public VipUserController(VipUserService vipUserService, UserService userService) {
		this.vipUserService = vipUserService;
		this.userService = userService;
	}

	@PostMapping("")
	public ResponseEntity<VipUser> createVipUser()
			throws org.springframework.data.crossstore.ChangeSetPersister.NotFoundException {
		VipUser createdVipUser = vipUserService.createVipUser();
		if (createdVipUser != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(createdVipUser);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<VipUser> getVipUserById(@PathVariable UUID id) {
		VipUser vipUser = vipUserService.getVipUserById(id);
		if (vipUser != null) {
			return new ResponseEntity<>(vipUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("")
	public ResponseEntity<Page<VipUser>> getAllVipUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "idVipUser") String sortBy) {
		Page<VipUser> vipUsers = vipUserService.getAllVipUsers(page, size, sortBy);
		return new ResponseEntity<>(vipUsers, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<VipUser> updateVipUser(@PathVariable UUID id, @RequestBody VipUser vipUser) {
		try {
			VipUser updatedVipUser = vipUserService.updateVipUser(id, vipUser);
			return new ResponseEntity<>(updatedVipUser, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVipUser(@PathVariable UUID id) {
		try {
			vipUserService.deleteVipUser(id);
			return ResponseEntity.noContent().build();
		} catch (NotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
