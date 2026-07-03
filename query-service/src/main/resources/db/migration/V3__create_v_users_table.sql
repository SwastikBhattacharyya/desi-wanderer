CREATE OR REPLACE VIEW v_users AS
SELECT
  id,
  first_name,
  last_name,
  last_processed_lsn,

  CASE
    WHEN has_authority('SCOPE_users:read:username')
    THEN username
    ELSE NULL
  END AS username,

  CASE
    WHEN has_authority('SCOPE_users:read:email')
    THEN email
    ELSE NULL
  END AS email

FROM users;
