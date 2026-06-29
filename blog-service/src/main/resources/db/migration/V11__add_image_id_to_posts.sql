ALTER TABLE posts
  ADD COLUMN image_id UUID;

ALTER TABLE posts
  ADD CONSTRAINT fk_posts_on_image FOREIGN KEY (image_id) REFERENCES images (id) ON DELETE SET NULL;
