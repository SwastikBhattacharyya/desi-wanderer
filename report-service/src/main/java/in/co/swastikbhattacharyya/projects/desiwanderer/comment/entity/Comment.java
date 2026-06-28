package in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain.CommentDomain;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "comments")
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Comment implements CommentDomain {

  @Column(name = "id")
  @Id
  @EqualsAndHashCode.Include
  private UUID id;

  @Column(name = "content", length = 512, nullable = false)
  @ToString.Exclude
  private String content;

  @Column(name = "is_approved", nullable = false)
  @Builder.Default
  private Boolean isApproved = true;

  @Column(name = "last_processed_lsn", nullable = false)
  private Long lastProcessedLsn;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id", nullable = false)
  @ToString.Exclude
  private Post post;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id", nullable = false)
  @ToString.Exclude
  private User author;

  @OneToOne(mappedBy = "comment", fetch = FetchType.LAZY)
  @ToString.Exclude
  private CommentReport report;
}
