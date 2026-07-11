package in.co.swastikbhattacharyya.projects.desiwanderer.comment.controller;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentReportModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentReportView;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentReportViewQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.query.dto.PageResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("comment-reports")
@RequiredArgsConstructor
public class CommentReportViewController {

  private final CommentReportViewQueryService commentReportViewQueryService;

  @GetMapping
  public PageResponse<CommentReportModel> findAll(
      @Filter Specification<CommentReportView> specification, @Pagination Pageable pageable) {
    return PageResponse.from(
        this.commentReportViewQueryService
            .findAll(specification, pageable)
            .map(CommentReportModel::from));
  }

  @GetMapping("{id}")
  public CommentReportModel findById(@PathVariable UUID id) {
    return CommentReportModel.from(this.commentReportViewQueryService.findById(id));
  }
}
