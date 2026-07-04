CREATE TABLE images
(
  id                 UUID                     NOT NULL,
  file_name          TEXT                     NOT NULL,
  key                UUID                     NOT NULL,
  mime_type          TEXT                     NOT NULL,
  title              TEXT                     NOT NULL,
  alt_text           TEXT                     NOT NULL,
  width              INTEGER                  NOT NULL,
  height             INTEGER                  NOT NULL,
  last_processed_lsn BIGINT                   NOT NULL,
  owner_id           UUID                     NOT NULL,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_images PRIMARY KEY (id)
);

ALTER TABLE images
  ADD CONSTRAINT fk_images_on_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE;

CREATE INDEX idx_images_owner_created_at
  ON images(owner_id, created_at DESC);

CREATE INDEX idx_images_file_name
  ON images(file_name);
