package in.co.swastikbhattacharyya.projects.desiwanderer.post.controller;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReportView;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostReportViewQueryService;
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
@RequestMapping("post-reports")
@RequiredArgsConstructor
public class PostReportViewController {

  private final PostReportViewQueryService postReportViewQueryService;

  @GetMapping
  public PageResponse<PostReportModel> findAll(
      @Filter Specification<PostReportView> specification, @Pagination Pageable pageable) {
    return PageResponse.from(
        this.postReportViewQueryService
            .findAll(specification, pageable)
            .map(PostReportModel::from));
  }

  @GetMapping("{id}")
  public PostReportModel findById(@PathVariable UUID id) {
    return PostReportModel.from(this.postReportViewQueryService.findById(id));
  }
}
