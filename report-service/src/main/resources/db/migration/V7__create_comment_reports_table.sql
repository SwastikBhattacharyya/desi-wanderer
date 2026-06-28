CREATE TABLE comment_reports
(
  id                 UUID                     NOT NULL,
  is_approved        BOOLEAN                  NOT NULL,
  disapproval_reason TEXT,
  comment_id         UUID                     NOT NULL,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_comment_reports PRIMARY KEY (id)
);

ALTER TABLE comment_reports
  ADD CONSTRAINT fk_comment_reports_on_comment FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE;

ALTER TABLE comment_reports
  REPLICA IDENTITY FULL;

ALTER PUBLICATION debezium_pub
  ADD TABLE comment_reports;
