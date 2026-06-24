package in.co.swastikbhattacharyya.projects.desiwanderer.image.dto;

import java.io.InputStream;

public record ImageContent(InputStream stream, String mimeType) {}
