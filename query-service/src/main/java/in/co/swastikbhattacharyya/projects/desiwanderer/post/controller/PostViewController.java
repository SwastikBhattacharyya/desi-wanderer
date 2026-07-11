package in.co.swastikbhattacharyya.projects.desiwanderer.post.controller;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostView;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostViewQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.query.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
public class PostViewController {

  private final PostViewQueryService postViewQueryService;

  @GetMapping
  public PageResponse<PostModel> findAll(
      @Filter Specification<PostView> specification, @Pagination Pageable pageable) {
    return PageResponse.from(
        this.postViewQueryService.findAll(specification, pageable).map(PostModel::from));
  }

  @GetMapping("{key}")
  public PostModel findById(@PathVariable String key) {
    return PostModel.from(this.postViewQueryService.findByKey(key));
  }
}
