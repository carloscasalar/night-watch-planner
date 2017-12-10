package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Singular;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Details of a watch.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@PlanningEntity
@Builder
public class Watch {
    @NotNull
    private Integer order;

    @JsonProperty("watchfulCharacters")
    @NotNull
    @PlanningVariable(valueRangeProviderRefs = {"feasibleSoloWatches", "feasiblePairWatches", "feasibleTrioWatches"})
    @Singular
    private List<Character> watchfulCharacters;
}
