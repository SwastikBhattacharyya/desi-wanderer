package in.co.swastikbhattacharyya.projects.desiwanderer.image.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.domain.ImageDomain;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostView;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.UserView;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.sql.Types;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.springframework.data.annotation.Immutable;

@Entity
@Table(name = "images")
@Immutable
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class ImageView implements ImageDomain {

  @Column(name = "id")
  @Id
  private UUID id;

  @Column(name = "file_name", columnDefinition = "TEXT", nullable = false)
  private String fileName;

  @Column(name = "key", unique = true, nullable = false)
  private UUID key;

  @Column(name = "mime_type", columnDefinition = "TEXT", nullable = false)
  private String mimeType;

  @Column(name = "title", columnDefinition = "TEXT", nullable = false)
  private String title;

  @Column(name = "alt_text", columnDefinition = "TEXT", nullable = false)
  private String altText;

  @Column(name = "width", nullable = false)
  private Integer width;

  @Column(name = "height", nullable = false)
  private Integer height;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", nullable = false)
  @ToString.Exclude
  private UserView owner;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
  @Builder.Default
  @ToString.Exclude
  private Set<PostView> posts = new HashSet<>();

  @Column(name = "created_at", nullable = false, updatable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  private Instant updatedAt;
}
