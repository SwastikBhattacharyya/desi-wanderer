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
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.AdvisorParams;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class CommentReportCreateService {

  private final CommentReportRepository commentReportRepository;
  private final CommentReportProperties commentReportProperties;
  private final CommentQueryService commentQueryService;
  private final ChatClient chatClient;

  public CommentReportCreateService(
      CommentReportRepository commentReportRepository,
      CommentReportProperties commentReportProperties,
      CommentQueryService commentQueryService,
      ChatClient.Builder chatClientBuilder) {
    this.commentReportRepository = commentReportRepository;
    this.commentReportProperties = commentReportProperties;
    this.commentQueryService = commentQueryService;
    this.chatClient =
        chatClientBuilder.defaultAdvisors(AdvisorParams.ENABLE_NATIVE_STRUCTURED_OUTPUT).build();
  }

  @Transactional
  @InitializePostgresSession(additionalAuthorities = {"SCOPE_comments:cdc", "SCOPE_posts:read:any"})
  public void create(UUID id) {
    Comment comment = this.commentQueryService.findById(id);

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
