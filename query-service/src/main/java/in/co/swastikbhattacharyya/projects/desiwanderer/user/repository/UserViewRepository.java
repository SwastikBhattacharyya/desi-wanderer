package in.co.swastikbhattacharyya.projects.desiwanderer.user.repository;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.UserView;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserViewRepository
    extends JpaRepository<UserView, UUID>, JpaSpecificationExecutor<UserView> {}
