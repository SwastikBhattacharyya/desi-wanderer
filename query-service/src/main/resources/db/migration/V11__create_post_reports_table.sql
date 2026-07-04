CREATE TABLE post_reports
(
  id                 UUID                     NOT NULL,
  language_report    TEXT                     NOT NULL,
  language_score     REAL                     NOT NULL,
  relevance_report   TEXT                     NOT NULL,
  relevance_score    REAL                     NOT NULL,
  vulgarity_report   TEXT                     NOT NULL,
  vulgarity_score    REAL                     NOT NULL,
  overall_report     TEXT                     NOT NULL,
  overall_score      REAL                     NOT NULL,
  is_approved        BOOLEAN                  NOT NULL,
  is_old             BOOLEAN                  NOT NULL,
  last_processed_lsn BIGINT                   NOT NULL,
  post_id            UUID                     NOT NULL,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT pk_post_reports PRIMARY KEY (id)
);

ALTER TABLE post_reports
  ADD CONSTRAINT fk_post_reports_on_comment FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE;

CREATE INDEX idx_post_reports_post_id
  ON post_reports (post_id);

CREATE INDEX idx_post_reports_post_id_created_at_desc
  ON post_reports (post_id, created_at DESC);

CREATE INDEX idx_post_reports_created_at_desc
  ON post_reports (created_at DESC);
