package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Night watch plan
 */
@AllArgsConstructor
@Data
public class Plan {
    @JsonProperty("watches")
    @NotNull
    @Valid
    private List<Watch> watches;

    @JsonProperty("watchSummary")
    @NotNull
    @Valid
    private List<CharacterWatchSummary> watchSummary;
}

