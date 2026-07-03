CREATE TABLE posts
(
  id                 UUID                     NOT NULL,
  slug               TEXT                     NOT NULL,
  title              TEXT                     NOT NULL,
  description        TEXT                     NOT NULL,
  content            TEXT,
  is_published       BOOLEAN                  NOT NULL,
  is_approved        BOOLEAN                  NOT NULL,
  last_processed_lsn BIGINT                   NOT NULL,
  author_id          UUID                     NOT NULL,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_posts PRIMARY KEY (id)
);

ALTER TABLE posts
  ADD CONSTRAINT uc_posts_slug UNIQUE (slug);

ALTER TABLE posts
  ADD CONSTRAINT fk_posts_on_author FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE;

CREATE INDEX idx_posts_author_created_at
  ON posts (author_id, created_at DESC);

CREATE INDEX idx_posts_published_approved_created_at
  ON posts (is_published, is_approved, created_at DESC);
