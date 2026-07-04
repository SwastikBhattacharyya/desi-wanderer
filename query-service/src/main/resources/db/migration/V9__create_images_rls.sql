ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY images_read_policy
ON images
FOR SELECT
USING (
  has_authority('SCOPE_images:read:any')
  OR has_authority('SCOPE_images:download')
  OR has_authority('SCOPE_images:cdc')
  OR (
    has_authority('SCOPE_images:read')
    AND owner_id = current_subject_id()
  )
);

CREATE POLICY images_insert_policy
ON images
FOR INSERT
WITH CHECK (
  has_authority('SCOPE_images:cdc')
);

CREATE POLICY images_update_policy
ON images
FOR UPDATE
USING (
  has_authority('SCOPE_images:cdc')
)
WITH CHECK (
  has_authority('SCOPE_images:cdc')
);

CREATE POLICY images_delete_policy
ON images
FOR DELETE
USING (
  has_authority('SCOPE_images:cdc')
);
