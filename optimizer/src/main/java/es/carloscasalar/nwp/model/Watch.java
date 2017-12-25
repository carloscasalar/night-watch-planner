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
import java.util.ArrayList;
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
    private static final int OVERLOADED_SIZE = 2;

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

    public Watch copy() {
        return Watch.builder()
                .order(order)
                .watchfulCharacters(new ArrayList<>(watchfulCharacters))
                .length(length)
                .build();
    }

    public void applySleepTime(RestState restState) {
        wakeUpRestedCharacters(restState);
        sendMostRestedCharactersToSleep(restState);

        restState.applySleepingTime(this);
    }

    private void wakeUpRestedCharacters(RestState restState) {
        restState.getRestedCharacters().forEach(character -> {
            if (!watchfulCharacters.contains(character)) {
                addWatchfulCharacter(character);
            }
        });
    }

    private void sendMostRestedCharactersToSleep(RestState restState) {
        if (isOverloaded()) {
            List<Character> unnecessaryCharacters = restState.getMostRestedCharacters()
                    .stream()
                    .filter(character -> watchfulCharacters.contains(character))
                    .limit(overloadCount())
                    .collect(Collectors.toList());
            removeWatchfulCharacter(unnecessaryCharacters);
        }
    }

    private int overloadCount() {
        return watchfulCharacters.size() - OVERLOADED_SIZE;
    }


    private boolean isOverloaded() {
        return watchfulCharacters.size() > OVERLOADED_SIZE;
    }

    private void removeWatchfulCharacter(List<Character> unnecessaryCharacters) {
        watchfulCharacters = watchfulCharacters.stream()
                .filter(character -> !unnecessaryCharacters.contains(character))
                .collect(Collectors.toList());
    }

    private void addWatchfulCharacter(Character character) {
        watchfulCharacters = new ArrayList<>(watchfulCharacters);
        watchfulCharacters.add(character);
    }
}
