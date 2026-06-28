ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY posts_read_policy
ON posts
FOR SELECT
USING (
  has_authority('SCOPE_posts:read:any')
  OR has_authority('SCOPE_posts:cdc')
  OR (
    has_authority('SCOPE_posts:read')
    AND (
      (is_published = TRUE AND is_approved = TRUE)
      OR author_id = current_subject_id()
    )
  )
);

CREATE POLICY posts_insert_policy
ON posts
FOR INSERT
WITH CHECK (
  has_authority('SCOPE_posts:cdc')
);

CREATE POLICY posts_update_policy
ON posts
FOR UPDATE
USING (
  has_authority('SCOPE_posts:cdc')
)
WITH CHECK (
  has_authority('SCOPE_posts:cdc')
);

CREATE POLICY posts_delete_policy
ON posts
FOR DELETE
USING (
  has_authority('SCOPE_posts:cdc')
);
