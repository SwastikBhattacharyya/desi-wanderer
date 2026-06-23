package in.co.swastikbhattacharyya.projects.desiwanderer.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperation;
import in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto.CdcOperationEvent;
import java.util.UUID;

public record UserEventValue(
    @JsonProperty("id") UUID id,
    @JsonProperty("email") String email,
    @JsonProperty("first_name") String firstName,
    @JsonProperty("last_name") String lastName,
    @JsonProperty("username") String username,
    @JsonProperty("__op") CdcOperation operation,
    @JsonProperty("__lsn") Long lsn)
    implements CdcOperationEvent {}
