ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY comment_reports_read_policy
ON comment_reports
FOR SELECT
USING (
  has_authority('SCOPE_comment_reports:read:any')
  OR has_authority('SCOPE_comment_reports:cdc')
  OR (
    has_authority('SCOPE_comment_reports:read')
    AND EXISTS (
      SELECT 1
      FROM comments c
      JOIN posts p
        ON p.id = c.post_id
      WHERE c.id = comment_reports.comment_id
      AND (
        c.author_id = current_subject_id()
        OR p.author_id = current_subject_id()
      )
    )
  )
);

CREATE POLICY comment_reports_insert_policy
ON comment_reports
FOR INSERT
WITH CHECK (
  has_authority('SCOPE_comment_reports:cdc')
);

CREATE POLICY comment_reports_update_policy
ON comment_reports
FOR UPDATE
USING (
  has_authority('SCOPE_comment_reports:cdc')
)
WITH CHECK (
  has_authority('SCOPE_comment_reports:cdc')
);

CREATE POLICY comment_reports_delete_policy
ON comment_reports
FOR DELETE
USING (
  has_authority('SCOPE_comment_reports:cdc')
);
