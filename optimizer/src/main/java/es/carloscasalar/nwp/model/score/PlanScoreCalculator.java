package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Plan;
import org.optaplanner.core.api.score.Score;
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore;
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator;

public class PlanScoreCalculator implements EasyScoreCalculator<Plan> {
    @Override
    public Score calculateScore(Plan plan) {
        long hardScore = hardScore(plan);
        long mediumScore = mediumScore(plan);
        long softScore = softScore(plan);
        return HardMediumSoftLongScore.valueOf(hardScore, mediumScore, softScore);
    }

    private long hardScore(Plan plan) {
        long emptyWatches = -plan.getWatches().stream().filter(watch -> watch.hasWatchfulCharacters(0)).count();
        long lazyCharacters = -plan.getCharacters()
                .stream()
                .filter(character ->
                        plan.getWatches()
                                .stream()
                                .filter(watch -> watch.isSleeping(character))
                                .count() == plan.getWatches().size())
                .count();
        long tooMuchTime = plan.totalTime() > plan.getPlanRequest().getMaxTotalTimeSpent() ? -1 : 0;
        return emptyWatches + lazyCharacters + tooMuchTime;
    }

    private long mediumScore(Plan plan) {
        long soloWatches = -plan.getWatches().stream().filter(watch -> watch.hasWatchfulCharacters(1)).count();

        int numOfCharacters = plan.getCharacters().size();
        int watchesCount = plan.getWatches().size();
        int numberOfWatchesScore = watchesCount > numOfCharacters / 2 ? 0 : (numOfCharacters / 2) - watchesCount;

        return soloWatches + numberOfWatchesScore;
    }

    private long softScore(Plan plan) {
        long trioWatches = -plan.getWatches().stream().filter(watch -> watch.hasWatchfulCharacters(3)).count();

        return trioWatches;
    }

}
