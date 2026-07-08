package in.co.swastikbhattacharyya.projects.desiwanderer.user.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.UserView;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.exception.UserNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.repository.UserViewRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserViewQueryService {

  private final UserViewRepository userViewRepository;

  @Transactional
  @InitializePostgresSession
  public Page<UserView> findAll(Specification<UserView> specification, Pageable pageable) {
    return this.userViewRepository.findAll(specification, pageable);
  }

  @Transactional
  @InitializePostgresSession
  public UserView findById(UUID id) {
    return this.userViewRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }
}
