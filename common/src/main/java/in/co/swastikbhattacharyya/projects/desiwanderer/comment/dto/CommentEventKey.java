package in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

public record CommentEventKey(@JsonProperty("id") UUID id) {}
