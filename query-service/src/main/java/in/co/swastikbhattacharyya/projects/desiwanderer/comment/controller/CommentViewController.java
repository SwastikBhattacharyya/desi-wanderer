package in.co.swastikbhattacharyya.projects.desiwanderer.comment.controller;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentView;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentViewQueryService;
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
@RequestMapping("comments")
@RequiredArgsConstructor
public class CommentViewController {

  private final CommentViewQueryService commentViewQueryService;

  @GetMapping
  public PageResponse<CommentModel> findAll(
      @Filter Specification<CommentView> specification, @Pagination Pageable pageable) {
    return PageResponse.from(
        this.commentViewQueryService.findAll(specification, pageable).map(CommentModel::from));
  }

  @GetMapping("{id}")
  public CommentModel findById(@PathVariable UUID id) {
    return CommentModel.from(this.commentViewQueryService.findById(id));
  }
}
