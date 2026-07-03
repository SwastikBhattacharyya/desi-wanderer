package in.co.swastikbhattacharyya.projects.desiwanderer.user.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.exception.UserNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserQueryService {

  private final UserRepository userRepository;

  public User findById(UUID id) {
    return this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }
}
