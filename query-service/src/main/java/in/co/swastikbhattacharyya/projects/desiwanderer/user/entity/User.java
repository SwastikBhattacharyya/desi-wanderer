package in.co.swastikbhattacharyya.projects.desiwanderer.user.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.domain.UserDomain;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDomain {

  @Column(name = "id")
  @Id
  @EqualsAndHashCode.Include
  private UUID id;

  @Column(name = "email", columnDefinition = "TEXT")
  private String email;

  @Column(name = "first_name", columnDefinition = "TEXT")
  private String firstName;

  @Column(name = "last_name", columnDefinition = "TEXT")
  private String lastName;

  @Column(name = "username", columnDefinition = "TEXT")
  private String username;

  @Column(name = "last_processed_lsn", nullable = false)
  private Long lastProcessedLsn;
}
