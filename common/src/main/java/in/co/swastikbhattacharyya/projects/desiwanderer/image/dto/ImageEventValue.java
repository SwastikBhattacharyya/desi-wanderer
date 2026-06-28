package in.co.swastikbhattacharyya.projects.desiwanderer.image.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperation;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperationEvent;
import java.time.Instant;
import java.util.UUID;

public record ImageEventValue(
    @JsonProperty("id") UUID id,
    @JsonProperty("file_name") String fileName,
    @JsonProperty("key") UUID key,
    @JsonProperty("mime_type") String mimeType,
    @JsonProperty("title") String title,
    @JsonProperty("alt_text") String altText,
    @JsonProperty("width") Integer width,
    @JsonProperty("height") Integer height,
    @JsonProperty("owner_id") UUID ownerId,
    @JsonProperty("created_at") Instant createdAt,
    @JsonProperty("updated_at") Instant updatedAt,
    @JsonProperty("__op") CdcOperation operation,
    @JsonProperty("__lsn") Long lsn)
    implements CdcOperationEvent {}
