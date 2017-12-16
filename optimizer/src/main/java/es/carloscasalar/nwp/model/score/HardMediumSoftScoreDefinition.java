package es.carloscasalar.nwp.model.score;

import org.optaplanner.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import org.optaplanner.core.api.score.buildin.hardmediumsoft.HardMediumSoftScoreHolder;
import org.optaplanner.core.config.score.trend.InitializingScoreTrendLevel;
import org.optaplanner.core.impl.score.definition.AbstractFeasibilityScoreDefinition;
import org.optaplanner.core.impl.score.trend.InitializingScoreTrend;

import java.util.Arrays;

public class HardMediumSoftScoreDefinition extends AbstractFeasibilityScoreDefinition<HardMediumSoftScore> {
    public HardMediumSoftScoreDefinition() {
        super(new String[]{"hard score", "medium score", "soft score"});
    }

    public int getLevelsSize() {
        return 3;
    }

    public int getFeasibleLevelsSize() {
        return 1;
    }

    public Class<HardMediumSoftScore> getScoreClass() {
        return HardMediumSoftScore.class;
    }

    @Override
    public HardMediumSoftScore getZeroScore() {
        return HardMediumSoftScore.valueOf(0,0,0);
    }

    public HardMediumSoftScore parseScore(String scoreString) {
        return HardMediumSoftScore.parseScore(scoreString);
    }

    @Override
    public HardMediumSoftScore fromLevelNumbers(int i, Number[] levelNumbers) {
        if (levelNumbers.length != this.getLevelsSize()) {
            throw new IllegalStateException("The levelNumbers (" + Arrays.toString(levelNumbers) + ")\'s length (" + levelNumbers.length + ") must equal the levelSize (" + this.getLevelsSize() + ").");
        } else {
            return HardMediumSoftScore.valueOf(((Integer) levelNumbers[0]).intValue(), ((Integer) levelNumbers[1]).intValue(), ((Integer) levelNumbers[2]).intValue());
        }
    }

    public HardMediumSoftScoreHolder buildScoreHolder(boolean constraintMatchEnabled) {
        return new HardMediumSoftScoreHolder(constraintMatchEnabled);
    }

    public HardMediumSoftScore buildOptimisticBound(InitializingScoreTrend initializingScoreTrend, HardMediumSoftScore score) {
        InitializingScoreTrendLevel[] trendLevels = initializingScoreTrend.getTrendLevels();
        return HardMediumSoftScore.valueOf(trendLevels[0] == InitializingScoreTrendLevel.ONLY_DOWN ? score.getHardScore() : 2147483647, trendLevels[1] == InitializingScoreTrendLevel.ONLY_DOWN ? score.getMediumScore() : 2147483647, trendLevels[2] == InitializingScoreTrendLevel.ONLY_DOWN ? score.getSoftScore() : 2147483647);
    }

    public HardMediumSoftScore buildPessimisticBound(InitializingScoreTrend initializingScoreTrend, HardMediumSoftScore score) {
        InitializingScoreTrendLevel[] trendLevels = initializingScoreTrend.getTrendLevels();
        return HardMediumSoftScore.valueOf(trendLevels[0] == InitializingScoreTrendLevel.ONLY_UP ? score.getHardScore() : -2147483648, trendLevels[1] == InitializingScoreTrendLevel.ONLY_UP ? score.getMediumScore() : -2147483648, trendLevels[2] == InitializingScoreTrendLevel.ONLY_UP ? score.getSoftScore() : -2147483648);
    }
}

