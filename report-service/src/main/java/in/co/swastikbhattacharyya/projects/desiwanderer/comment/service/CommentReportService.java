package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentReportResult;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception.InvalidCommentReportResultException;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.property.CommentReportProperties;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentReportRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.AdvisorParams;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class CommentReportService {

  private final CommentReportRepository commentReportRepository;
  private final CommentReportProperties commentReportProperties;
  private final ChatClient chatClient;

  public CommentReportService(
      CommentReportRepository commentReportRepository,
      CommentReportProperties commentReportProperties,
      ChatClient.Builder chatClientBuilder) {
    this.commentReportRepository = commentReportRepository;
    this.commentReportProperties = commentReportProperties;
    this.chatClient =
        chatClientBuilder.defaultAdvisors(AdvisorParams.ENABLE_NATIVE_STRUCTURED_OUTPUT).build();
  }

  @Transactional
  @InitializePostgresSession(additionalAuthorities = {"SCOPE_comments:cdc", "SCOPE_posts:read:any"})
  public void generateReport(Comment comment) {
    if (comment.getIsApproved()) return;

    this.commentReportRepository
        .findByComment(comment)
        .ifPresent(this.commentReportRepository::delete);

    Post post = comment.getPost();
    String content =
        post.getContent() == null || post.getContent().isEmpty()
            ? "Empty Content"
            : post.getContent();

    PromptTemplate template = new PromptTemplate(this.commentReportProperties.prompt());
    String prompt =
        template.render(
            Map.of(
                "postTitle",
                post.getTitle(),
                "postDescription",
                post.getDescription(),
                "postContent",
                content,
                "comment",
                comment.getContent()));

    CommentReportResult payload =
        this.chatClient.prompt().system(prompt).call().entity(CommentReportResult.class);
    if (payload == null) throw new InvalidCommentReportResultException();

    String reason = payload.disapprovalReason().isEmpty() ? null : payload.disapprovalReason();

    CommentReport report =
        this.commentReportRepository.save(
            CommentReport.builder()
                .isApproved(payload.isApproved())
                .disapprovalReason(reason)
                .comment(comment)
                .build());
    comment.setReport(report);
    log.info("Comment Report created: report={}", report);
  }
}
