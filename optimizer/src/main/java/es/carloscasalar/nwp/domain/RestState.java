package es.carloscasalar.nwp.domain;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class RestState {

    private final Map<Character, Integer> sleptTime;

    public RestState(final Set<Character> party) {
        sleptTime = party.stream().collect(Collectors.toMap(character -> character, character -> 0));
    }

    public Set<Character> getRestedCharacters() {
        return sleptTime.keySet()
                .stream()
                .filter(character -> sleptTime.get(character) >= character.getRequiredSleepTime())
                .collect(Collectors.toSet());
    }

    public void applySleepingTime(Watch watch) {
        if (watch.getLength() == null) {
            return;
        }
        sleptTime.keySet()
                .stream()
                .filter(watch::isSleeping)
                .forEach(character -> applySleepingTime(character, watch.getLength()));
    }

    private Integer applySleepingTime(Character character, Integer minutes) {
        return sleptTime.put(character, sleptTime.get(character) + minutes);
    }

    public List<Character> getMostRestedCharacters() {
        return sleptTime.keySet()
                .stream()
                .filter(character -> sleptTime.get(character) < character.getRequiredSleepTime())
                .sorted((characterA, characterB) -> sleptTime.get(characterB).compareTo(sleptTime.get(characterA)))
                .collect(Collectors.toList());
    }
}
