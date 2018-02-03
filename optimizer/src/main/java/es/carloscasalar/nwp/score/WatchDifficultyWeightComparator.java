package es.carloscasalar.nwp.score;

import es.carloscasalar.nwp.domain.Character;
import es.carloscasalar.nwp.domain.Watch;
import org.apache.commons.lang3.builder.CompareToBuilder;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class WatchDifficultyWeightComparator implements Comparator<Watch> {

    @Override
    public int compare(Watch watchA, Watch watchB) {
        return new CompareToBuilder()
                .append(sizeOfWatchfulCharacters(watchA), sizeOfWatchfulCharacters(watchB))
                .append(sleepingTimesWeight(watchA), sleepingTimesWeight(watchB))
                .build();
    }

    private int sleepingTimesWeight(Watch watch) {
        List<Integer> sleepTimes = watch.getWatchfulCharacters() == null ? Collections.emptyList() : watch.getWatchfulCharacters().stream()
                .map(Character::getRequiredSleepTime)
                .collect(Collectors.toList());

        if(sleepTimes.isEmpty()){
            return 0;
        }

        sleepTimes.sort(Integer::compareTo);

        int minSleepTime = sleepTimes.get(0);
        int maxSleepTime = sleepTimes.get(sleepTimes.size() - 1);

        return minSleepTime == maxSleepTime ? 0 : (maxSleepTime-minSleepTime);
    }

    private Integer sizeOfWatchfulCharacters(Watch watch) {
        if (watch.getWatchfulCharacters() == null) {
            return 0;
        }

        return watch.getWatchfulCharacters().size();
    }
}
