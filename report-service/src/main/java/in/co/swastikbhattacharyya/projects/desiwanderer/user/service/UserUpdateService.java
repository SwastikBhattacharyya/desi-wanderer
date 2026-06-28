package in.co.swastikbhattacharyya.projects.desiwanderer.user.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.dto.UserEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserUpdateService {

  private final UserQueryService userQueryService;

  @Transactional
  public void update(UUID id, UserEventValue event) {
    User user = this.userQueryService.findById(id);

    if (user.getLastProcessedLsn() > event.lsn()) return;

    user.setLastProcessedLsn(event.lsn());
    log.info("User updated: user={}", user);
  }
}
