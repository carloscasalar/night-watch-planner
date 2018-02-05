package es.carloscasalar.nwp.rest;

import es.carloscasalar.nwp.domain.PartyNightWatch;
import es.carloscasalar.nwp.domain.Plan;
import lombok.Data;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class PartyNightWatchSummary {

    private final List<WatchSummary> watchesSummary;

    private final Integer totalTime;

    private final HardMediumSoftLongScore score;

    public PartyNightWatchSummary(final Plan plan) {
        PartyNightWatch partyNightWatch = plan.compactedPartyNightWatch();
        this.watchesSummary = partyNightWatch
                .getWatches()
                .stream()
                .map(watch -> new WatchSummary(watch, plan.getCharacters()))
                .collect(Collectors.toList());

        this.totalTime = partyNightWatch.totalTime();
        this.score = plan.getScore();
    }
}
