package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

public record PostReportResult(
    String languageReport,
    float languageScore,
    String relevanceReport,
    float relevanceScore,
    String vulgarityReport,
    float vulgarityScore,
    String overallReport,
    float overallScore,
    boolean isApproved) {}
