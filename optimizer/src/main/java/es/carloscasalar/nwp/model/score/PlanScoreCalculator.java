package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.PartyNightWatch;
import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
import org.optaplanner.core.api.score.Score;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator;

public class PlanScoreCalculator implements EasyScoreCalculator<Plan> {

    private static final int OVER_SLEEP_MINUTE_PENALTY = 10;
    private static final int TO_MUCH_PENALTY = 30;

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
        int timeScore = -totalTimeScore(partyNightWatch.totalTime(), planRequest.getMaxTotalTimeSpent());
        return emptyWatches + lazyCharacters + timeScore;
    }

    private long mediumScore(PartyNightWatch partyNightWatch) {
        long soloWatches = -partyNightWatch.numberOfSoloWatches();
        int overSleepScore = -overSleepScore(partyNightWatch.totalOverSleepTime());

        return soloWatches + overSleepScore;
    }

    private int totalTimeScore(Integer partyNightLength, Integer maxTotalTimeSpent) {
        if(maxTotalTimeSpent>=partyNightLength){
            return 0;
        }
        int difference = partyNightLength - maxTotalTimeSpent;
        return difference / TO_MUCH_PENALTY;
    }

    private long softScore(PartyNightWatch partyNightWatch) {
        return -partyNightWatch.numberOfOverloadedWatches();
    }

    private int overSleepScore(int totalOverSleepMinutes) {
        return totalOverSleepMinutes / OVER_SLEEP_MINUTE_PENALTY;
    }
}
