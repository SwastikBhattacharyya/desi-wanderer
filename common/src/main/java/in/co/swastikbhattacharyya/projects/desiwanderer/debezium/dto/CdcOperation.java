package in.co.swastikbhattacharyya.projects.desiwanderer.debezium.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.Getter;

@Getter
public enum CdcOperation {
  READ("r"),
  CREATE("c"),
  UPDATE("u"),
  DELETE("d"),
  TRUNCATE("t");

  private static final Map<String, CdcOperation> CODE_MAP =
      Stream.of(values()).collect(Collectors.toMap(CdcOperation::getCode, Function.identity()));

  @JsonValue private final String code;

  CdcOperation(String code) {
    this.code = code;
  }

  @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
  public static CdcOperation fromCode(String code) {
    CdcOperation operation = CdcOperation.CODE_MAP.get(code);
    if (operation == null)
      throw new IllegalArgumentException("Unknown CDC operation code: " + code);
    return operation;
  }
}
