package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import es.carloscasalar.nwp.model.score.CharacterListStrengthComparatorBySize;
import es.carloscasalar.nwp.model.score.WatchDifficultyWeightComparator;
import lombok.*;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @JsonProperty("watchfulCharacters")
    @NotNull
    @PlanningVariable(
            nullable = true,
            strengthComparatorClass = CharacterListStrengthComparatorBySize.class,
            valueRangeProviderRefs = {"feasibleSoloWatches", "feasiblePairWatches", "feasibleTrioWatches"}
    )
    @Singular
    private List<Character> watchfulCharacters;

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

    public boolean hasSleepingCharacters(Set<Character> characters) {
        return !sleepingCharacters(characters).isEmpty();
    }

    public Watch copy() {
        Watch copy = new Watch();
        copy.setLength(length);
        copy.setWatchfulCharacters(new ArrayList<>());

        if (watchfulCharacters != null) {
            copy.getWatchfulCharacters().addAll(watchfulCharacters);
        }

        return copy;
    }

    public Watch applySleepTime(RestState restState) {
        wakeUpRestedCharacters(restState);
        sendMostRestedCharactersToSleep(restState);

        restState.applySleepingTime(this);
        return this;
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


    public boolean isOverloaded() {
        return watchfulCharacters.size() > OVERLOADED_SIZE;
    }

    public boolean isSoloWatch() {
        return watchfulCharacters.size() == 1;
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

    public boolean hasSameWatchfulCharacters(Watch watch) {
        return watchfulCharacters.containsAll(watch.watchfulCharacters) &&
                watch.watchfulCharacters.containsAll(watchfulCharacters);
    }

    public void addLength(Integer length) {
        this.length = Optional.ofNullable(this.length).orElse(0) + Optional.ofNullable(length).orElse(0);
    }

    public boolean hasLength() {
        return length != null;
    }
}
