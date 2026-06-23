SELECT *
FROM pg_create_logical_replication_slot(
  'debezium_slot',
  'pgoutput'
);
