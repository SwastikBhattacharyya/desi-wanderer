package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public record PostEventKey(@JsonProperty("id") UUID id) {}
