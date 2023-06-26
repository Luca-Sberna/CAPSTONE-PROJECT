package luca.sberna.capstone.empire.of.gamers.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Utenti")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({ "password" })
public class User {

}
