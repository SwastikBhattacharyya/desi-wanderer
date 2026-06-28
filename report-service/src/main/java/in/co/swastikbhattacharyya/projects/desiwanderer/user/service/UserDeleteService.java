package in.co.swastikbhattacharyya.projects.desiwanderer.user.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserDeleteService {

  private final UserRepository userRepository;
  private final UserQueryService userQueryService;

  public void deleteById(UUID id) {
    User user = this.userQueryService.findById(id);
    this.userRepository.delete(user);
    log.info("User deleted: user={}", user);
  }

  public void deleteAll() {
    this.userRepository.deleteAllInBatch();
    log.info("Users truncated");
  }
}
