package in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain.CommentDomain;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Types;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "comments")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Comment implements CommentDomain {

  @Column(name = "id")
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @EqualsAndHashCode.Include
  private UUID id;

  @Column(name = "content", length = 512, nullable = false)
  @ToString.Exclude
  private String content;

  @Column(name = "is_approved", nullable = false)
  @Builder.Default
  private Boolean isApproved = true;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id", nullable = false)
  @ToString.Exclude
  private Post post;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id", nullable = false)
  @ToString.Exclude
  private User author;

  @Column(name = "created_at", nullable = false, updatable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  @CreatedDate
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  @LastModifiedDate
  private Instant updatedAt;
}
