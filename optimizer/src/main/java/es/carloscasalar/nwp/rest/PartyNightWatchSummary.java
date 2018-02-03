package es.carloscasalar.nwp.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import es.carloscasalar.nwp.domain.Plan;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;

import java.util.List;
import java.util.stream.Collectors;


public class PartyNightWatchSummary {
    @JsonProperty
    private final List<WatchSummary> watchesSummary;
    @JsonProperty
    private final HardMediumSoftLongScore score;

    public PartyNightWatchSummary(final Plan plan) {
        this.watchesSummary = plan.compactedPartyNightWatch()
                .getWatches()
                .stream()
                .map(WatchSummary::new)
                .collect(Collectors.toList());

        this.score = plan.getScore();
    }
}
