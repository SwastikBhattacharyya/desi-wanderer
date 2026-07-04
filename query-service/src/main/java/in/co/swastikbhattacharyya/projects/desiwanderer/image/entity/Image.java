package in.co.swastikbhattacharyya.projects.desiwanderer.image.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.domain.ImageDomain;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
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

@Entity
@Table(name = "images")
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Image implements ImageDomain {

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

  @Column(name = "last_processed_lsn", nullable = false)
  private Long lastProcessedLsn;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", nullable = false)
  @ToString.Exclude
  private User owner;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
  @Builder.Default
  @ToString.Exclude
  private Set<Post> posts = new HashSet<>();

  @Column(name = "created_at", nullable = false, updatable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  private Instant updatedAt;
}
