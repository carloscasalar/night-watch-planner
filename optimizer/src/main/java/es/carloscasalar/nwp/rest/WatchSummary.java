package es.carloscasalar.nwp.rest;

import es.carloscasalar.nwp.domain.Character;
import es.carloscasalar.nwp.domain.Watch;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class WatchSummary {

    private final List<String> watchfulCharacters;
    private final List<String> sleepingCharacters;
    private final Integer length;

    public WatchSummary(final Watch watch, final Set<Character> party) {
        this.watchfulCharacters = watch
                .getWatchfulCharacters()
                .stream()
                .map(Character::getName)
                .sorted(String::compareTo)
                .collect(Collectors.toList());

        this.sleepingCharacters = watch.sleepingCharacters(party)
                .stream()
                .map(Character::getName)
                .sorted(String::compareTo)
                .collect(Collectors.toList());

        this.length = watch.getLength();
    }
}
