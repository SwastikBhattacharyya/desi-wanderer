CREATE TABLE comments
(
  id                 UUID                     NOT NULL,
  content            TEXT                     NOT NULL,
  is_approved        BOOLEAN                  NOT NULL,
  last_processed_lsn BIGINT                   NOT NULL,
  post_id            UUID                     NOT NULL,
  author_id          UUID                     NOT NULL,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_comments PRIMARY KEY (id)
);

ALTER TABLE comments
  ADD CONSTRAINT fk_comments_on_author FOREIGN KEY (author_id) REFERENCES users (id);

ALTER TABLE comments
  ADD CONSTRAINT fk_comments_on_post FOREIGN KEY (post_id) REFERENCES posts (id);

CREATE INDEX idx_comments_post_created_at
  ON comments (post_id, created_at DESC);

CREATE INDEX idx_comments_author_created_at
  ON comments (author_id, created_at DESC);

CREATE INDEX idx_comments_post_approved_created_at
  ON comments (post_id, is_approved, created_at DESC);
