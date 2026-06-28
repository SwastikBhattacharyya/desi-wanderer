package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperation;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperationEvent;
import java.time.Instant;
import java.util.UUID;

public record PostEventValue(
    @JsonProperty("id") UUID id,
    @JsonProperty("slug") String slug,
    @JsonProperty("title") String title,
    @JsonProperty("description") String description,
    @JsonProperty("content") String content,
    @JsonProperty("is_published") Boolean isPublished,
    @JsonProperty("is_approved") Boolean isApproved,
    @JsonProperty("image_id") UUID imageId,
    @JsonProperty("author_id") UUID authorId,
    @JsonProperty("report_id") UUID reportId,
    @JsonProperty("created_at") Instant createdAt,
    @JsonProperty("updated_at") Instant updatedAt,
    @JsonProperty("__op") CdcOperation operation,
    @JsonProperty("__lsn") Long lsn)
    implements CdcOperationEvent {}
