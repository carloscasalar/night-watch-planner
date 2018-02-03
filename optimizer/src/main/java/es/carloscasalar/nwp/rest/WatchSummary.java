package es.carloscasalar.nwp.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import es.carloscasalar.nwp.domain.Character;
import es.carloscasalar.nwp.domain.Watch;

import java.util.List;
import java.util.stream.Collectors;

public class WatchSummary {
    @JsonProperty
    private final List<String> watchfulCharacters;

    @JsonProperty
    private final Integer length;

    public WatchSummary(final Watch watch) {
        this.watchfulCharacters = watch
                .getWatchfulCharacters()
                .stream()
                .map(Character::getName)
                .collect(Collectors.toList());
        this.length = watch.getLength();
    }
}
