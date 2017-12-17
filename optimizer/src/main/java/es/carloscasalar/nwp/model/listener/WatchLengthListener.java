package es.carloscasalar.nwp.model.listener;

import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.Watch;
import org.optaplanner.core.impl.domain.variable.listener.VariableListener;
import org.optaplanner.core.impl.score.director.ScoreDirector;

public class WatchLengthListener implements VariableListener<Watch> {
    @Override
    public void beforeEntityAdded(ScoreDirector scoreDirector, Watch watch) {

    }

    @Override
    public void afterEntityAdded(ScoreDirector scoreDirector, Watch watch) {
        fillWatchLengths(scoreDirector);
    }

    @Override
    public void beforeVariableChanged(ScoreDirector scoreDirector, Watch watch) {

    }

    @Override
    public void afterVariableChanged(ScoreDirector scoreDirector, Watch watch) {
        fillWatchLengths(scoreDirector);
    }

    @Override
    public void beforeEntityRemoved(ScoreDirector scoreDirector, Watch watch) {

    }

    @Override
    public void afterEntityRemoved(ScoreDirector scoreDirector, Watch watch) {
        fillWatchLengths(scoreDirector);
    }

    @Override
    public boolean requiresUniqueEntityEvents() {
        return true;
    }

    protected void fillWatchLengths(ScoreDirector<Plan> scoreDirector) {
        Plan plan = scoreDirector.getWorkingSolution();

        plan.getWatches()
                .stream()
                .parallel()
                .forEach(watch -> watch.setLength(plan.requiredTimeForCharactersSleepingIn(watch)));
    }
}
