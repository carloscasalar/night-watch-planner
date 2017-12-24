package es.carloscasalar.nwp.model;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class RestState {

    private final Map<Character, Integer> sleptTime;

    public RestState(Set<Character> party) {
        sleptTime = party.stream().collect(Collectors.toMap(character -> character, character -> 0));
    }

    public Set<Character> getRestedCharacters() {
        return sleptTime.keySet()
                .stream()
                .filter(character -> sleptTime.get(character) >= character.getRequiredSleepTime())
                .collect(Collectors.toSet());
    }

    public void applySleepingTime(Watch watch) {
        sleptTime.keySet()
                .stream()
                .filter(watch::isSleeping)
                .forEach(character -> applySleepingTime(character, watch.getLength()));
    }

    private Integer applySleepingTime(Character character, Integer minutes) {
        return sleptTime.put(character, sleptTime.get(character) + minutes);
    }
}
