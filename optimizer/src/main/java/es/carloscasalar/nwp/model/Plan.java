package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.CountableValueRange;
import org.optaplanner.core.api.domain.valuerange.ValueRangeFactory;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
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
    @Getter
    @Setter
    private HardMediumSoftLongScore score;

    @ProblemFactCollectionProperty
    private Set<Character> characters;

    @ValueRangeProvider(id = "feasibleSoloWatches")
    private Set<Set<Character>> feasibleSoloWatches;

    @ValueRangeProvider(id = "feasiblePairWatches")
    private Set<Set<Character>> feasiblePairWatches;

    @ValueRangeProvider(id = "feasibleTrioWatches")
    private Set<Set<Character>> feasibleTrioWatches;

    @JsonProperty("watches")
    @NotNull
    @Valid
    @PlanningEntityCollectionProperty
    @Getter
    @Setter
    private Set<Watch> watches;

    @JsonProperty("watchSummary")
    @NotNull
    @Valid
    private Set<CharacterWatchSummary> watchSummary;

    @Getter
    private Integer minNumberOfWatches;

    @Getter
    private Integer maxNumberOfWatches;

    @Builder()
    public Plan(final PlanRequest planRequest) {
        this.characters = planRequest.getParty();
        this.feasibleSoloWatches = populateFeasibleSoloWatches(planRequest.getParty());
        this.feasiblePairWatches = populateFeasiblePairWatches(planRequest.getParty());
        this.feasibleTrioWatches = populateFeasibleTrioWatches(planRequest.getParty(), this.feasiblePairWatches);
        this.minNumberOfWatches = planRequest.getParty().size() / 2;
        this.maxNumberOfWatches = planRequest.getMaxWatches();
        this.watches = populateWatches(this.maxNumberOfWatches);

    }

    private Set<Set<Character>> populateFeasibleSoloWatches(Set<Character> party) {
        Set<Set<Character>> feasibleSet = party.stream().map(character -> new HashSet<>(Collections.singletonList(character))).collect(Collectors.toSet());

        return feasibleSet;
    }

    private Set<Set<Character>> populateFeasiblePairWatches(Set<Character> party) {
        Set<Set<Character>> feasibleSet = new HashSet<>();

        party.forEach(characterA -> {
            party.stream()
                    .filter(c -> !c.equals(characterA))
                    .forEach(characterB -> {
                        Set<Character> feasiblePair = new HashSet<>(Arrays.asList(characterA, characterB));
                        feasibleSet.add(feasiblePair);
                    });
        });

        return feasibleSet;
    }

    private Set<Set<Character>> populateFeasibleTrioWatches(Set<Character> party, Set<Set<Character>> feasiblePairs) {
        Set<Set<Character>> feasibleSet = new HashSet<>();

        party.forEach(characterA -> {
            feasiblePairs.stream()
                    .filter(feasiblePair -> !feasiblePair.contains(characterA))
                    .forEach(feasiblePair -> {
                        Set<Character> feasibleTrio = new HashSet<>(feasiblePair);
                        feasibleTrio.add(characterA);
                        feasibleSet.add(feasibleTrio);
                    });
        });

        return feasibleSet;
    }

    private Set<Watch> populateWatches(final int numberOfWatches) {
        final Set<Watch> watches = new HashSet<>();
        IntStream.range(1, numberOfWatches + 1).parallel().forEach(watchOrder -> {
            watches.add(
                    Watch.builder()
                            .order(watchOrder)
                            .build()
            );
        });
        return watches;
    }

    @ValueRangeProvider(id = "numOfWatches")
    public CountableValueRange<Integer> getTimeRangeValue() {
        return ValueRangeFactory.createIntValueRange(minNumberOfWatches, maxNumberOfWatches);
    }

}
