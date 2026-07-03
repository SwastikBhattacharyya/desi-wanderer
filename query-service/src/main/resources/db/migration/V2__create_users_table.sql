CREATE TABLE users
(
  id                 UUID                     NOT NULL,
  email              TEXT,
  first_name         TEXT,
  last_name          TEXT,
  username           TEXT,
  last_processed_lsn BIGINT                   NOT NULL,
  CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users
  ADD CONSTRAINT uc_users_username UNIQUE (username);

CREATE INDEX idx_users_email
  ON users (email);

CREATE INDEX idx_users_first_name_last_name
  ON users (LOWER(first_name), LOWER(last_name));
