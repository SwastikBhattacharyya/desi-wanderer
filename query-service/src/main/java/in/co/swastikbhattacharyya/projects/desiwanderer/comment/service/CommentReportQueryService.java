package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception.CommentReportNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentReportRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentReportQueryService {

  private final CommentReportRepository commentReportRepository;

  public CommentReport findById(UUID id) {
    return this.commentReportRepository
        .findById(id)
        .orElseThrow(() -> new CommentReportNotFoundException(id));
  }
}
