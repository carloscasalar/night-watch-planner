package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Character;

import java.util.Comparator;
import java.util.List;

public class CharacterListStrengthComparatorBySize implements Comparator<List<Character>> {
    @Override
    public int compare(List<Character> o1, List<Character> o2) {
        return sizeOf(o1).compareTo(sizeOf(o2));
    }

    private Integer sizeOf(List<Character> characters) {
        if (characters == null) {
            return 0;
        }

        return characters.size();
    }
}
