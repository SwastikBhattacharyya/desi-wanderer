CREATE OR REPLACE FUNCTION has_authority(permission text)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
SELECT COALESCE(
  current_setting('app.authorities', true)::jsonb
    ? permission,
  FALSE
);
$$;

CREATE OR REPLACE FUNCTION current_subject_id()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
SELECT NULLIF(
  current_setting('app.authentication.subject_id', true),
  ''
)::uuid;
$$;
