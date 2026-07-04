package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.PostReportNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostReportRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostReportQueryService {

  private final PostReportRepository postReportRepository;

  public PostReport findById(UUID id) {
    return this.postReportRepository
        .findById(id)
        .orElseThrow(() -> new PostReportNotFoundException(id));
  }
}
