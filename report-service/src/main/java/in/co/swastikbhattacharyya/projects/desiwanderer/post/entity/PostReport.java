package in.co.swastikbhattacharyya.projects.desiwanderer.post.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.domain.PostReportDomain;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "post_reports")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class PostReport implements PostReportDomain {

  @Column(name = "id")
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @EqualsAndHashCode.Include
  private UUID id;

  @Column(name = "language_report", columnDefinition = "TEXT", nullable = false)
  private String languageReport;

  @Column(name = "language_score", nullable = false)
  private Float languageScore;

  @Column(name = "relevance_report", columnDefinition = "TEXT", nullable = false)
  private String relevanceReport;

  @Column(name = "relevance_score", nullable = false)
  private Float relevanceScore;

  @Column(name = "vulgarity_report", columnDefinition = "TEXT", nullable = false)
  private String vulgarityReport;

  @Column(name = "vulgarity_score", nullable = false)
  private Float vulgarityScore;

  @Column(name = "overall_report", columnDefinition = "TEXT", nullable = false)
  private String overallReport;

  @Column(name = "overall_score", nullable = false)
  private Float overallScore;

  @Column(name = "is_approved", nullable = false)
  private Boolean isApproved;

  @Column(name = "is_old", nullable = false)
  @Builder.Default
  private Boolean isOld = false;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id", nullable = false)
  @ToString.Exclude
  private Post post;

  @Column(name = "created_at", nullable = false, updatable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  @CreatedDate
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  @JdbcTypeCode(Types.TIMESTAMP_WITH_TIMEZONE)
  @LastModifiedDate
  private Instant updatedAt;
}
