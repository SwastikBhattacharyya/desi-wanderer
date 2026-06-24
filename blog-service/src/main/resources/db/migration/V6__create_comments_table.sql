CREATE TABLE comments
(
  id          UUID                     NOT NULL,
  content     TEXT                     NOT NULL,
  is_approved BOOLEAN                  NOT NULL,
  post_id     UUID                     NOT NULL,
  author_id   UUID                     NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at  TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_comments PRIMARY KEY (id)
);

ALTER TABLE comments
  ADD CONSTRAINT fk_comments_on_author FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE comments
  ADD CONSTRAINT fk_comments_on_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE;

ALTER TABLE comments
  REPLICA IDENTITY FULL;

ALTER PUBLICATION debezium_pub
  ADD TABLE comments;
