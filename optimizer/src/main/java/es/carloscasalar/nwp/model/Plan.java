package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Night watch plan
 */
@Data
@PlanningSolution
@NoArgsConstructor
public class Plan {

    @PlanningScore
    private HardMediumSoftLongScore score;

    @JsonIgnore
    @ProblemFactCollectionProperty
    private Set<Character> characters;

    @JsonIgnore
    @ValueRangeProvider(id = "feasibleSoloWatches")
    private Set<List<Character>> feasibleSoloWatches;

    @JsonIgnore
    @ValueRangeProvider(id = "feasiblePairWatches")
    private Set<List<Character>> feasiblePairWatches;

    @JsonIgnore
    @ValueRangeProvider(id = "feasibleTrioWatches")
    private Set<List<Character>> feasibleTrioWatches;

    @JsonIgnore
    private PlanRequest planRequest;

    @JsonIgnore
    @NotNull
    @Valid
    @PlanningEntityCollectionProperty
    @Getter
    @Setter
    private List<Watch> watches;

    @JsonProperty("watchSummary")
    @NotNull
    @Valid
    private Set<CharacterWatchSummary> watchSummary;

    @Builder()
    public Plan(final PlanRequest planRequest) {
        this.planRequest = planRequest;
        this.characters = planRequest.getParty();
        this.feasibleSoloWatches = populateFeasibleSoloWatches(planRequest.getParty());
        this.feasiblePairWatches = populateFeasiblePairWatches(planRequest.getParty());
        this.feasibleTrioWatches = populateFeasibleTrioWatches(planRequest.getParty(), this.feasiblePairWatches);
        this.watches = populateWatches(this.characters);

    }

    private Set<List<Character>> populateFeasibleSoloWatches(Set<Character> party) {
        return party.stream()
                .map(character -> new ArrayList<>(Collections.singletonList(character)))
                .collect(Collectors.toSet());
    }

    private Set<List<Character>> populateFeasiblePairWatches(Set<Character> party) {
        Set<List<Character>> feasiblePairs = new HashSet<>();

        party.forEach(characterA -> {
            party.stream()
                    .filter(c -> !c.equals(characterA))
                    .forEach(characterB -> {
                        List<Character> feasiblePair = Arrays.asList(characterA, characterB);
                        feasiblePair.sort(Comparator.comparing(Character::getName));
                        feasiblePairs.add(feasiblePair);
                    });
        });

        return feasiblePairs;
    }

    private Set<List<Character>> populateFeasibleTrioWatches(Set<Character> party, Set<List<Character>> feasiblePairs) {
        Set<List<Character>> feasibleSet = new HashSet<>();

        party.forEach(characterA -> {
            feasiblePairs.stream()
                    .filter(feasiblePair -> !feasiblePair.contains(characterA))
                    .forEach(feasiblePair -> {
                        List<Character> feasibleTrio = new ArrayList<>(feasiblePair);
                        feasibleTrio.add(characterA);
                        feasibleTrio.sort(Comparator.comparing(Character::getName));
                        feasibleSet.add(feasibleTrio);
                    });
        });

        return feasibleSet;
    }

    private List<Watch> populateWatches(final Set<Character> party) {
        final List<Watch> watches = new ArrayList<>();
        IntStream.range(0, numberOfWatchesToGenerate(party)).forEach(watchOrder ->
                watches.add(
                        Watch.builder()
                                .order(watchOrder + 1)
                                .build()
                )
        );
        return watches;
    }

    private int numberOfWatchesToGenerate(Set<Character> party) {
        List<Integer> sleepTimes = party.stream()
                .map(Character::getRequiredSleepTime)
                .sorted(Integer::compareTo)
                .collect(Collectors.toList());

        int minRequiredSleepingHours = sleepTimes.get(0) / 60;
        int maxRequiredSleepingHours = sleepTimes.get(sleepTimes.size() - 1) / 60;

        return minRequiredSleepingHours + maxRequiredSleepingHours;
    }

    public Integer minLengthNightwatchWithSleeping(Character character) {
        return character.getRequiredSleepTime() / numberOfWatchesWhereIsSleeping(character);
    }

    private Integer numberOfWatchesWhereIsSleeping(Character character) {
        return (int) watches.stream()
                .filter(watch -> watch.isSleeping(character))
                .count();
    }

    public Integer requiredTimeForCharactersSleepingIn(Watch watch) {
        Optional<Integer> requiredLengthForWatch = watch.sleepingCharacters(characters)
                .stream()
                .map(this::minLengthNightwatchWithSleeping)
                .max(Integer::compareTo);
        return requiredLengthForWatch.orElse(0);

    }

    @JsonProperty("totalTime")
    public Integer totalTime() {
        return watches.stream()
                .filter(watch -> watch.getLength() != null)
                .mapToInt(Watch::getLength)
                .sum();
    }

    @JsonProperty("watches")
    public List<Watch> compactedWatches() {
        List<Watch> watches = awakeRestedCharacters();

        watches = deleteWatchesWithNoSleepingCharacters(watches);

        watches = joinWatchesWithSameWatchfulCharacters(watches);

        return watches;
    }

    private List<Watch> awakeRestedCharacters() {
        List<Watch> watches = this.watches.stream()
                .map(Watch::copy)
                .collect(Collectors.toList());

        RestState restState = new RestState(characters);

        watches.forEach(watch -> watch.applySleepTime(restState));
        return watches;
    }

    private List<Watch> deleteWatchesWithNoSleepingCharacters(List<Watch> watches) {
        return watches.stream()
                .filter(watch -> watch.hasSleepingCharacters(characters))
                .collect(Collectors.toList());
    }

    private List<Watch> joinWatchesWithSameWatchfulCharacters(List<Watch> watches) {
        List<Watch> joined = new ArrayList<>();

        watches.stream().forEach(watch -> {
            Optional<Watch> watchWithSameWatchfulCharacters = watchWithSameWatchfulCharacters(joined, watch);
            if (watchWithSameWatchfulCharacters.isPresent()) {
                watchWithSameWatchfulCharacters.get().addLength(watch.getLength());
            } else {
                joined.add(watch);
            }
        });

        return joined;
    }

    private Optional<Watch> watchWithSameWatchfulCharacters(List<Watch> watches, Watch watch) {
        return watches.stream()
                .filter(w -> w.hasSameWatchfulCharacters(watch))
                .findFirst();
    }
}
