ALTER TABLE public.user_entity
  REPLICA IDENTITY FULL;

CREATE PUBLICATION debezium_pub
  FOR TABLE public.user_entity WHERE (
    realm_id = 'e3b2a47d-4bf2-41b9-a640-d7c1e4cdcb40'
    AND service_account_client_link IS NULL
  );

SELECT *
FROM pg_create_logical_replication_slot(
  'debezium_slot',
  'pgoutput'
);
