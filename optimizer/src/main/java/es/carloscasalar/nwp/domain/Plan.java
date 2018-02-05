package es.carloscasalar.nwp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Night watch plan
 */
@Data
@PlanningSolution
@NoArgsConstructor
public class Plan {

    private static final int ONE_HOUR = 60;

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

    @Builder()
    public Plan(final PlanRequest planRequest) {
        this.planRequest = planRequest;
        this.characters = planRequest.getParty();
        this.feasibleSoloWatches = feasibleSoloWatches(planRequest.getParty());
        this.feasiblePairWatches = feasiblePairWatches(planRequest.getParty());
        this.feasibleTrioWatches = feasibleTrioWatches(planRequest.getParty(), this.feasiblePairWatches);
        this.watches = initWatches(this.characters);

    }

    private Set<List<Character>> feasibleSoloWatches(Set<Character> party) {
        return party.stream()
                .map(character -> new ArrayList<>(Collections.singletonList(character)))
                .collect(Collectors.toSet());
    }

    private Set<List<Character>> feasiblePairWatches(Set<Character> party) {
        Set<List<Character>> feasiblePairs = new HashSet<>();

        party.forEach(characterA -> party.stream()
                .filter(c -> !c.equals(characterA))
                .forEach(characterB -> {
                    List<Character> feasiblePair = Arrays.asList(characterA, characterB);
                    feasiblePair.sort(Comparator.comparing(Character::getName));
                    feasiblePairs.add(feasiblePair);
                }));

        return feasiblePairs;
    }

    private Set<List<Character>> feasibleTrioWatches(Set<Character> party, Set<List<Character>> feasiblePairs) {
        Set<List<Character>> feasibleSet = new HashSet<>();

        party.forEach(characterA -> feasiblePairs.stream()
                .filter(feasiblePair -> !feasiblePair.contains(characterA))
                .forEach(feasiblePair -> {
                    List<Character> feasibleTrio = new ArrayList<>(feasiblePair);
                    feasibleTrio.add(characterA);
                    feasibleTrio.sort(Comparator.comparing(Character::getName));
                    feasibleSet.add(feasibleTrio);
                }));

        return feasibleSet;
    }

    private List<Watch> initWatches(final Set<Character> party) {
        List<Character> partyOrderedBySleepTime = party.stream()
                .filter(Character::needsToSleep)
                .sorted(Comparator.comparing(Character::getRequiredSleepTime))
                .collect(Collectors.toList());

        Character lessSleeperCharacter = partyOrderedBySleepTime.get(0);
        Character mostSleepTimeCharacter = partyOrderedBySleepTime.get(partyOrderedBySleepTime.size() - 1);

        List<Watch> watches = new ArrayList<>();
        watches.addAll(generateWatches(mostSleepTimeCharacter, lessSleeperCharacter.getRequiredSleepTime()));
        watches.addAll(generateWatches(lessSleeperCharacter, mostSleepTimeCharacter.getRequiredSleepTime()));

        return watches;
    }

    private List<Watch> generateWatches(Character watchfulCharacter, Integer hoursOfWatch) {
        int numberOfWatchesToGenerate = Math.max(1, hoursOfWatch / ONE_HOUR);
        return Stream
                .generate(() ->
                        Watch.builder()
                                .watchfulCharacter(watchfulCharacter)
                                .length(ONE_HOUR)
                                .build())
                .limit(numberOfWatchesToGenerate)
                .collect(Collectors.toList());
    }

    @JsonProperty("compacted")
    public PartyNightWatch compactedPartyNightWatch() {
        return new PartyNightWatch(characters, watches).adjust();
    }

}