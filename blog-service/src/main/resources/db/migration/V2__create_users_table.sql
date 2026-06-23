CREATE TABLE users
(
  id                 UUID                     NOT NULL,
  last_processed_lsn BIGINT                   NOT NULL,
  CONSTRAINT pk_users PRIMARY KEY (id)
);
