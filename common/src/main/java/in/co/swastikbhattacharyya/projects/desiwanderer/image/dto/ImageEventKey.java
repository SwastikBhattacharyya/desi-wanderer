package in.co.swastikbhattacharyya.projects.desiwanderer.image.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public record ImageEventKey(@JsonProperty("id") UUID id) {}
