package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Watch;

import java.util.Comparator;

public class WatchDifficultyWeightComparator implements Comparator<Watch> {

    @Override
    public int compare(Watch o1, Watch o2) {
        return sizeOfWatchfulCharacters(o1).compareTo(sizeOfWatchfulCharacters(o2));
    }

    private Integer sizeOfWatchfulCharacters(Watch watch) {
        if(watch.getWatchfulCharacters() == null){
            return 0;
        }

        return watch.getWatchfulCharacters().size();
    }
}
