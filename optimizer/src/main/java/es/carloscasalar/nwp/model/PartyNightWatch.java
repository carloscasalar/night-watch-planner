package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.*;
import java.util.stream.Collectors;

@ToString
@EqualsAndHashCode
public class PartyNightWatch {
    private final Set<Character> party;

    @JsonProperty
    private final List<Watch> watches;

    public PartyNightWatch(final Set<Character> party, final List<Watch> watches) {
        this.party = new HashSet<>(party);
        this.watches = watches.stream().map(Watch::copy).collect(Collectors.toList());
    }

    @JsonProperty("totalTime")
    public Integer totalTime() {
        return watches.stream()
                .filter(watch -> watch.getLength() != null)
                .mapToInt(Watch::getLength)
                .sum();
    }

    @JsonIgnore
    public int numberOfWatches() {
        return watches.size();
    }

    public int partySize() {
        return party.size();
    }

    public Watch getWatch(int numberOfWatch) {
        if (numberOfWatch <= 0 || numberOfWatch > watches.size()) {
            throw new WatchNotFoundException(numberOfWatch);
        }

        return watches.get(numberOfWatch - 1);
    }

    public long numberOfWatchesWithoutWatchfulCharacters() {
        return watches.stream().filter(watch -> watch.hasWatchfulCharacters(0)).count();
    }

    public long numberOfLazyCharacters() {
        return party
                .stream()
                .filter(character ->
                        watches
                                .stream()
                                .filter(watch -> watch.isSleeping(character))
                                .count() == watches.size())
                .count();
    }

    public long numberOfSoloWatches() {
        return watches.stream().filter(watch -> watch.isSoloWatch()).count();
    }

    public long numberOfOverloadedWatches() {
        return watches.stream().filter(watch -> watch.isOverloaded()).count();
    }

    public PartyNightWatch adjust() {
        fillWatchLengths();
        awakeRestedCharacters();
        deleteWatchesWithNoSleepingCharacters();
        joinWatchesWithSameWatchfulCharacters();
        return this;
    }

    private void fillWatchLengths() {
        watches.forEach(watch -> watch.setLength(requiredTimeForCharactersSleepingIn(watch)));
    }

    private void awakeRestedCharacters() {
        RestState restState = new RestState(party);
        watches.forEach(watch -> watch.applySleepTime(restState));
    }

    private void deleteWatchesWithNoSleepingCharacters() {
        List<Watch> trimmedWatches = watches.stream()
                .filter(watch -> watch.hasSleepingCharacters(party))
                .collect(Collectors.toList());
        replaceWatches(trimmedWatches);
    }


    private void joinWatchesWithSameWatchfulCharacters() {
        List<Watch> joined = new ArrayList<>();

        watches.forEach(watch -> {
            Optional<Watch> watchWithSameWatchfulCharacters = watchWithSameWatchfulCharacters(joined, watch);
            if (watchWithSameWatchfulCharacters.isPresent()) {
                watchWithSameWatchfulCharacters.get().addLength(watch.getLength());
            } else {
                joined.add(watch);
            }
        });

        replaceWatches(joined);
    }

    private void replaceWatches(List<Watch> trimmedWatches) {
        watches.clear();
        watches.addAll(trimmedWatches);
    }

    private Optional<Watch> watchWithSameWatchfulCharacters(List<Watch> watches, Watch watch) {
        return watches.stream()
                .filter(w -> w.hasSameWatchfulCharacters(watch))
                .findFirst();
    }

    private Integer numberOfWatchesWhereIsSleeping(Character character) {
        return (int) watches.stream()
                .filter(watch -> watch.isSleeping(character))
                .count();
    }

    private Integer minLengthNightwatchWithSleeping(Character character) {
        return character.getRequiredSleepTime() / numberOfWatchesWhereIsSleeping(character);
    }

    private Integer requiredTimeForCharactersSleepingIn(Watch watch) {
        Optional<Integer> requiredLengthForWatch = watch.sleepingCharacters(party)
                .stream()
                .map(this::minLengthNightwatchWithSleeping)
                .max(Integer::compareTo);
        return requiredLengthForWatch.orElse(0);

    }
}
