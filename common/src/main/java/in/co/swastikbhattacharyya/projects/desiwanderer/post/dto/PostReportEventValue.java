package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperation;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperationEvent;
import java.time.Instant;
import java.util.UUID;

public record PostReportEventValue(
    @JsonProperty("id") UUID id,
    @JsonProperty("language_report") String languageReport,
    @JsonProperty("language_score") Float languageScore,
    @JsonProperty("relevance_report") String relevanceReport,
    @JsonProperty("relevance_score") Float relevanceScore,
    @JsonProperty("vulgarity_report") String vulgarityReport,
    @JsonProperty("vulgarity_score") Float vulgarityScore,
    @JsonProperty("overall_report") String overallReport,
    @JsonProperty("overall_score") Float overallScore,
    @JsonProperty("is_approved") Boolean isApproved,
    @JsonProperty("is_old") Boolean isOld,
    @JsonProperty("post_id") UUID postId,
    @JsonProperty("created_at") Instant createdAt,
    @JsonProperty("updated_at") Instant updatedAt,
    @JsonProperty("__op") CdcOperation operation,
    @JsonProperty("__lsn") Long lsn)
    implements CdcOperationEvent {}
