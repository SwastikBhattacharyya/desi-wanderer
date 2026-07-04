package in.co.swastikbhattacharyya.projects.desiwanderer.user.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentView;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.ImageView;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostView;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.domain.UserDomain;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Immutable;

@Entity
@Table(name = "v_users")
@Immutable
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserView implements UserDomain {

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

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "author")
  @Builder.Default
  @ToString.Exclude
  private Set<PostView> posts = new HashSet<>();

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "author")
  @Builder.Default
  @ToString.Exclude
  private Set<CommentView> comments = new HashSet<>();

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "owner")
  @Builder.Default
  @ToString.Exclude
  private Set<ImageView> images = new HashSet<>();
}
