CREATE TABLE comments
(
  id                 UUID                     NOT NULL,
  content            TEXT                     NOT NULL,
  is_approved        BOOLEAN                  NOT NULL,
  last_processed_lsn BIGINT                   NOT NULL,
  post_id            UUID                     NOT NULL,
  author_id          UUID                     NOT NULL,
  CONSTRAINT pk_comments PRIMARY KEY (id)
);

ALTER TABLE comments
  ADD CONSTRAINT fk_comments_on_author FOREIGN KEY (author_id) REFERENCES users (id);

ALTER TABLE comments
  ADD CONSTRAINT fk_comments_on_post FOREIGN KEY (post_id) REFERENCES posts (id);
