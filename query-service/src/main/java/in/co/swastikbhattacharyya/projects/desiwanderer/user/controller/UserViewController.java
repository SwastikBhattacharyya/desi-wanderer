package in.co.swastikbhattacharyya.projects.desiwanderer.user.controller;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;
import in.co.swastikbhattacharyya.projects.desiwanderer.query.dto.PageResponse;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.dto.UserModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.UserView;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserViewQueryService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserViewController {

  private final UserViewQueryService userViewQueryService;

  @GetMapping
  public PageResponse<UserModel> findAll(
      @Filter Specification<UserView> specification, @Pagination Pageable pageable) {
    return PageResponse.from(
        this.userViewQueryService.findAll(specification, pageable).map(UserModel::from));
  }

  @GetMapping("{id}")
  public UserModel findById(@PathVariable UUID id) {
    return UserModel.from(this.userViewQueryService.findById(id));
  }
}
