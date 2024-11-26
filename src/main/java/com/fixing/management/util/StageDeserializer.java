package com.fixing.management.util;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fixing.management.entity.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.json.JsonParser;

import java.io.IOException;

@Slf4j
public class StageDeserializer extends JsonDeserializer<Report.Stage> {
    @Override
    public Report.Stage deserialize(com.fasterxml.jackson.core.JsonParser parser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String value = parser.getText().toUpperCase(); // Chuyển thành chữ IN HOA
        switch (value) {
            case "IN_PROGRESS":
                return Report.Stage.IN_PROGRESS;
            case "RESOLVED":
                return Report.Stage.RESOLVED;
            default:
                return Report.Stage.OPEN;
        }
    }
}
