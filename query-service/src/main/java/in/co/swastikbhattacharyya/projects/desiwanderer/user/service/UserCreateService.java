package in.co.swastikbhattacharyya.projects.desiwanderer.user.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.dto.UserEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserCreateService {

  private final UserRepository userRepository;

  public void create(UserEventValue event) {
    User user =
        this.userRepository.save(
            User.builder()
                .id(event.id())
                .email(event.email())
                .firstName(event.firstName())
                .lastName(event.lastName())
                .username(event.username())
                .lastProcessedLsn(event.lsn())
                .build());
    log.info("User created: user={}", user);
  }
}
