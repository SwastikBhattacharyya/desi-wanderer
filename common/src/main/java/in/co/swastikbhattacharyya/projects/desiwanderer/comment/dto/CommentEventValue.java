package in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperation;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperationEvent;
import java.time.Instant;
import java.util.UUID;

public record CommentEventValue(
    @JsonProperty("id") UUID id,
    @JsonProperty("content") String content,
    @JsonProperty("is_approved") Boolean isApproved,
    @JsonProperty("post_id") UUID postId,
    @JsonProperty("author_id") UUID authorId,
    @JsonProperty("created_at") Instant createdAt,
    @JsonProperty("updated_at") Instant updatedAt,
    @JsonProperty("__op") CdcOperation operation,
    @JsonProperty("__lsn") Long lsn)
    implements CdcOperationEvent {}
