package es.carloscasalar.nwp.domain.fixtures;

import es.carloscasalar.nwp.domain.Character;
import es.carloscasalar.nwp.domain.Sense;

import java.util.*;

public class CharacterFactory {
    private static final List<Sense> LOW_LIGHT_VISION = Collections.singletonList(Sense.LOW_LIGHT);
    private static final List<Sense> HUMAN_SENSES = Collections.singletonList(Sense.NORMAL);
    private static final List<Sense> DARK_VISION = Collections.singletonList(Sense.DARKVISION);
    private static final Integer FOUR_HOURS = 60 * 4;
    private static final Integer SIX_HOURS = 60 * 6;
    private static final Integer EIGHT_HOURS = 60 * 8;

    public Character getElf(String name) {
        return new Character(name, LOW_LIGHT_VISION, FOUR_HOURS);
    }

    public Character getHalfElf(String name) {
        return new Character(name, LOW_LIGHT_VISION, SIX_HOURS);
    }

    public Character getHuman(String name) {
        return new Character(name, HUMAN_SENSES, EIGHT_HOURS);
    }

    public Character getAlteredHuman(String name, int sleepingMinutes) {
        return new Character(name, HUMAN_SENSES, sleepingMinutes);
    }

    public Character getDwarf(String name) {
        return new Character(name, DARK_VISION, EIGHT_HOURS);
    }

    public Set<Character> partyWith(Character... characters) {
        return new HashSet<>(Arrays.asList(characters));
    }
}
