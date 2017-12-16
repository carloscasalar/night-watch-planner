package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import es.carloscasalar.nwp.model.score.CharacterListStrengthComparatorBySize;
import es.carloscasalar.nwp.model.score.WatchDifficultyWeightComparator;
import lombok.*;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

import javax.validation.constraints.NotNull;
import java.util.List;

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

    public boolean hasWatchfulCharacters(final int numberOfCharacters) {
        return watchfulCharacters == null ? (numberOfCharacters == 0) : (numberOfCharacters == watchfulCharacters.size());
    }

    public boolean hasWatchfulCharacter(final Character character) {
        return watchfulCharacters != null && watchfulCharacters.contains(character);
    }

    public boolean isSleeping(Character character) {
        return !hasWatchfulCharacter(character);
    }
}
