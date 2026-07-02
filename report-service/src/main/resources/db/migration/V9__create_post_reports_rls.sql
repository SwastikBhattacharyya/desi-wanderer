ALTER TABLE post_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY post_reports_read_policy
ON post_reports
FOR SELECT
USING (
  has_authority('SCOPE_posts:cdc')
  OR has_authority('SCOPE_post_reports:read:any')
  OR (
    has_authority('SCOPE_post_reports:read')
    AND EXISTS (
      SELECT 1
      FROM posts p
      WHERE p.id = post_reports.post_id
      AND p.author_id = current_subject_id()
    )
  )
);

CREATE POLICY post_reports_insert_policy
ON post_reports
FOR INSERT
WITH CHECK (
  has_authority('SCOPE_post_reports:write')
  AND EXISTS (
    SELECT 1
    FROM posts p
    WHERE p.id = post_reports.post_id
    AND p.author_id = current_subject_id()
  )
);

CREATE POLICY post_reports_update_policy
ON post_reports
FOR UPDATE
USING (
  has_authority('SCOPE_posts:cdc')
  OR has_authority('SCOPE_post_reports:write')
    AND EXISTS (
    SELECT 1
    FROM posts p
    WHERE p.id = post_reports.post_id
    AND p.author_id = current_subject_id()
  )
)
WITH CHECK (
  has_authority('SCOPE_posts:cdc')
  OR has_authority('SCOPE_post_reports:write')
    AND EXISTS (
    SELECT 1
    FROM posts p
    WHERE p.id = post_reports.post_id
    AND p.author_id = current_subject_id()
  )
);

CREATE POLICY post_reports_delete_policy
ON post_reports
FOR DELETE
USING (
  has_authority('SCOPE_post_reports:write')
  AND EXISTS (
    SELECT 1
    FROM posts p
    WHERE p.id = post_reports.post_id
    AND p.author_id = current_subject_id()
  )
);
