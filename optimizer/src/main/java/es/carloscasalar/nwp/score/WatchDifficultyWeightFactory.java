package es.carloscasalar.nwp.score;

import es.carloscasalar.nwp.domain.Character;
import es.carloscasalar.nwp.domain.Plan;
import es.carloscasalar.nwp.domain.Watch;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory;

import java.util.Collections;
import java.util.List;

public class WatchDifficultyWeightFactory implements SelectionSorterWeightFactory<Plan, Watch> {

    @Override
    public Comparable createSorterWeight(Plan plan, Watch watch) {
        return new CompareToBuilder()
                .append(0, hasAlreadyWatchfulCharacters(plan.getWatches(), watch.getWatchfulCharacters()))
                .append(hasNewCharacters(plan.getWatches(), watch.getWatchfulCharacters()), 0)
                .toComparison();
    }

    private long hasNewCharacters(List<Watch> watches, List<Character> watchfulCharacters) {
        return watchfulCharacters.stream()
                .anyMatch(character ->
                        watches.stream().allMatch(watch ->
                                watch.getWatchfulCharacters().contains(character))
                )?1:0;
    }

    private long hasAlreadyWatchfulCharacters(List<Watch> watches, List<Character> watchfulCharacters) {
        long numberOfWatchesContainingSameCharacters = watches
                .stream()
                .filter(watch -> !Collections.disjoint(watch.getWatchfulCharacters(), watchfulCharacters))
                .count();
        return numberOfWatchesContainingSameCharacters;
    }

}
