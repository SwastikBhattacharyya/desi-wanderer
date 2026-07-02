package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportResult;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.InvalidPostReportPayloadException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.property.PostReportProperties;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostReportRepository;
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
public class PostReportCreateService {

  private final PostReportRepository postReportRepository;
  private final PostReportProperties postReportProperties;
  private final PostQueryService postQueryService;
  private final ChatClient chatClient;

  public PostReportCreateService(
      PostReportRepository postReportRepository,
      PostReportProperties postReportProperties,
      PostQueryService postQueryService,
      ChatClient.Builder chatClientBuilder) {
    this.postReportRepository = postReportRepository;
    this.postReportProperties = postReportProperties;
    this.postQueryService = postQueryService;
    this.chatClient =
        chatClientBuilder.defaultAdvisors(AdvisorParams.ENABLE_NATIVE_STRUCTURED_OUTPUT).build();
  }

  @Transactional
  @InitializePostgresSession
  public PostReport create(PostReportPayload postReportPayload) {
    this.postReportRepository
        .findByPost_Id(postReportPayload.postId().get())
        .ifPresent(this.postReportRepository::delete);

    Post post = this.postQueryService.findById(postReportPayload.postId().get());
    String content =
        post.getContent() == null || post.getContent().isEmpty()
            ? "Empty Content"
            : post.getContent();

    PromptTemplate template = new PromptTemplate(this.postReportProperties.prompt());
    String prompt =
        template.render(
            Map.of(
                "slug",
                post.getSlug(),
                "title",
                post.getTitle(),
                "description",
                post.getDescription(),
                "content",
                content));

    PostReportResult result =
        this.chatClient.prompt().system(prompt).call().entity(PostReportResult.class);
    if (result == null) throw new InvalidPostReportPayloadException();

    PostReport report =
        this.postReportRepository.save(
            PostReport.builder()
                .languageReport(result.languageReport())
                .languageScore(result.languageScore())
                .relevanceReport(result.relevanceReport())
                .relevanceScore(result.relevanceScore())
                .vulgarityReport(result.vulgarityReport())
                .vulgarityScore(result.vulgarityScore())
                .overallReport(result.overallReport())
                .overallScore(result.overallScore())
                .isApproved(result.isApproved())
                .post(post)
                .build());
    post.setReport(report);
    log.info("Post Report created: report={}", report);
    return report;
  }
}
