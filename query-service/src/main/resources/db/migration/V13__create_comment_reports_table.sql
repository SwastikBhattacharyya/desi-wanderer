CREATE TABLE comment_reports
(
  id                 UUID                     NOT NULL,
  is_approved        BOOLEAN                  NOT NULL,
  disapproval_reason TEXT,
  last_processed_lsn BIGINT                   NOT NULL,
  comment_id         UUID                     NOT NULL,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_comment_reports PRIMARY KEY (id)
);

ALTER TABLE comment_reports
  ADD CONSTRAINT fk_comment_reports_on_comment FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE;

CREATE INDEX idx_comment_reports_comment_id
  ON comment_reports (comment_id);

CREATE INDEX idx_comment_reports_created_at_desc
  ON comment_reports (created_at DESC);
