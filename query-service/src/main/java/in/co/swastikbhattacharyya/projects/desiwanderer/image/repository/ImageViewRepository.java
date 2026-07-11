package in.co.swastikbhattacharyya.projects.desiwanderer.image.repository;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.ImageView;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageViewRepository
    extends JpaRepository<ImageView, UUID>, JpaSpecificationExecutor<ImageView> {}
