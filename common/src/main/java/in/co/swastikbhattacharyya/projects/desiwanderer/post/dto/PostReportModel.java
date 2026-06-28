package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.domain.PostReportDomain;
import java.time.Instant;
import java.util.UUID;

public record PostReportModel(
    UUID id,
    String languageReport,
    Float languageScore,
    String relevanceReport,
    Float relevanceScore,
    String vulgarityReport,
    Float vulgarityScore,
    String overallReport,
    Float overallScore,
    Boolean isApproved,
    Boolean isOld,
    UUID postId,
    Instant createdAt,
    Instant updatedAt) {

  public static PostReportModel from(PostReportDomain postReport) {
    return new PostReportModel(
        postReport.getId(),
        postReport.getLanguageReport(),
        postReport.getLanguageScore(),
        postReport.getRelevanceReport(),
        postReport.getRelevanceScore(),
        postReport.getVulgarityReport(),
        postReport.getVulgarityScore(),
        postReport.getOverallReport(),
        postReport.getOverallScore(),
        postReport.getIsApproved(),
        postReport.getIsOld(),
        postReport.getPost().getId(),
        postReport.getCreatedAt(),
        postReport.getUpdatedAt());
  }
}
