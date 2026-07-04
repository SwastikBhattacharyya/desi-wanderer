package in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain.CommentReportDomain;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

@Entity
@Table(name = "comment_reports")
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class CommentReport implements CommentReportDomain {

  @Column(name = "id")
  @Id
  @EqualsAndHashCode.Include
  private UUID id;

  @Column(name = "is_approved", nullable = false)
  private Boolean isApproved;

  @Column(name = "disapproval_reason", columnDefinition = "TEXT")
  private String disapprovalReason;

  @Column(name = "last_processed_lsn", nullable = false)
  private Long lastProcessedLsn;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "comment_id", nullable = false)
  @ToString.Exclude
  private Comment comment;

  @Column(name = "created_at", nullable = false, updatable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  private Instant updatedAt;
}
