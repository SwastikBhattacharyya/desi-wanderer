ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY comments_read_policy
ON comments
FOR SELECT
USING (
  has_authority('SCOPE_comments:read:any')
  OR has_authority('SCOPE_comments:cdc')
  OR has_authority('SCOPE_comment_reports:cdc')
  OR (
    has_authority('SCOPE_comments:read')
    AND (
      is_approved = TRUE
      OR author_id = current_subject_id()
      OR EXISTS (
        SELECT 1
        FROM posts p
        WHERE p.id = comments.post_id AND p.author_id = current_subject_id()
      )
    )
  )
);

CREATE POLICY comments_insert_policy
ON comments
FOR INSERT
WITH CHECK (
  has_authority('SCOPE_comments:cdc')
);

CREATE POLICY comments_update_policy
ON comments
FOR UPDATE
USING (
  has_authority('SCOPE_comments:cdc')
)
WITH CHECK (
  has_authority('SCOPE_comments:cdc')
);

CREATE POLICY comments_delete_policy
ON comments
FOR DELETE
USING (
  has_authority('SCOPE_comments:cdc')
);
