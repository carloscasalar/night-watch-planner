package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import es.carloscasalar.nwp.model.listener.WatchLengthListener;
import es.carloscasalar.nwp.model.score.CharacterListStrengthComparatorBySize;
import es.carloscasalar.nwp.model.score.WatchDifficultyWeightComparator;
import lombok.*;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.variable.CustomShadowVariable;
import org.optaplanner.core.api.domain.variable.PlanningVariable;
import org.optaplanner.core.api.domain.variable.PlanningVariableReference;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Detail of a watch.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@PlanningEntity(
        // difficultyWeightFactoryClass = WatchDifficultyWeightFactory.class,
        difficultyComparatorClass = WatchDifficultyWeightComparator.class
)
@Builder
public class Watch {
    @NotNull
    private Integer order;

    @JsonProperty("watchfulCharacters")
    @NotNull
    @PlanningVariable(
            nullable = true,
            strengthComparatorClass = CharacterListStrengthComparatorBySize.class,
            valueRangeProviderRefs = {"feasibleSoloWatches", "feasiblePairWatches", "feasibleTrioWatches"}
    )
    @Singular
    private List<Character> watchfulCharacters;

    @CustomShadowVariable(variableListenerClass = WatchLengthListener.class,
            sources = {@PlanningVariableReference(variableName = "watchfulCharacters")})
    private Integer length;

    public boolean hasWatchfulCharacters(final int numberOfCharacters) {
        return watchfulCharacters == null ? (numberOfCharacters == 0) : (numberOfCharacters == watchfulCharacters.size());
    }

    public boolean isSleeping(Character character) {
        return watchfulCharacters == null || !watchfulCharacters.contains(character);
    }

    public List<Character> sleepingCharacters(Set<Character> party) {
        return party.stream()
                .filter(this::isSleeping)
                .collect(Collectors.toList());
    }
}
