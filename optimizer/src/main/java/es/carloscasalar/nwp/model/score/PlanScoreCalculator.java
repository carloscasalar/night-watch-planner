package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.PartyNightWatch;
import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
import org.optaplanner.core.api.score.Score;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator;

public class PlanScoreCalculator implements EasyScoreCalculator<Plan> {
    @Override
    public Score calculateScore(Plan plan) {
        PartyNightWatch partyNightWatch = plan.compactedPartyNightWatch();
        return calculateScore(partyNightWatch, plan.getPlanRequest());
    }

    protected Score calculateScore(PartyNightWatch partyNightWatch, PlanRequest planRequest) {
        long hardScore = hardScore(partyNightWatch, planRequest);
        long mediumScore = mediumScore(partyNightWatch);
        long softScore = softScore(partyNightWatch);
        return HardMediumSoftLongScore.valueOf(hardScore, mediumScore, softScore);
    }

    private long hardScore(PartyNightWatch partyNightWatch, PlanRequest planRequest) {
        long emptyWatches = -partyNightWatch.numberOfWatchesWithoutWatchfulCharacters();
        long lazyCharacters = -partyNightWatch.numberOfLazyCharacters();
        long tooMuchTime = partyNightWatch.totalTime() > planRequest.getMaxTotalTimeSpent() ? -1 : 0;
        return emptyWatches + lazyCharacters + tooMuchTime;
    }

    private long mediumScore(PartyNightWatch partyNightWatch) {
        long soloWatches = -partyNightWatch.numberOfSoloWatches();

        int numOfCharacters = partyNightWatch.partySize();
        int watchesCount = partyNightWatch.numberOfWatches();
        int numberOfWatchesScore = watchesCount > numOfCharacters / 2 ? 0 : (numOfCharacters / 2) - watchesCount;

        return soloWatches + numberOfWatchesScore;
    }

    private long softScore(PartyNightWatch partyNightWatch) {
        long trioWatches = -partyNightWatch.numberOfOverloadedWatches();

        return trioWatches;
    }

}
