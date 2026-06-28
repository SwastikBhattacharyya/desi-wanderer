package in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperation;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperationEvent;
import java.time.Instant;
import java.util.UUID;

public record CommentReportEventValue(
    @JsonProperty("id") UUID id,
    @JsonProperty("is_approved") Boolean isApproved,
    @JsonProperty("disapproval_reason") String disapprovalReason,
    @JsonProperty("comment_id") UUID commentId,
    @JsonProperty("created_at") Instant createdAt,
    @JsonProperty("updated_at") Instant updatedAt,
    @JsonProperty("__op") CdcOperation operation,
    @JsonProperty("__lsn") Long lsn)
    implements CdcOperationEvent {}
