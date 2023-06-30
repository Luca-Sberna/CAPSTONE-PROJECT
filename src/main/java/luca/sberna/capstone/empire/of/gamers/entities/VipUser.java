package luca.sberna.capstone.empire.of.gamers.entities;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VipUsers")
@Data
@NoArgsConstructor
public class VipUser {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID idVipUser;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;

	public VipUser(User user, Date startDate, Date endDate) {
		this.user = user;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
