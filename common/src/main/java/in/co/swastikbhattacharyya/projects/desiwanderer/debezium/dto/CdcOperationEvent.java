package in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto;

public interface CdcOperationEvent {

  CdcOperation operation();

  Long lsn();
}
