package es.carloscasalar.nwp.model;

import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(MockitoJUnitRunner.class)
public class PlanCompactTest {
    private static final Integer TWO_HOURS = 60 * 2;
    private static final Integer FOUR_HOURS = 60 * 4;
    private static final Integer EIGHT_HOURS = 60 * 8;
    private static final Integer SIX_HOURS = 60 * 6;

    private CharacterFactory characterFactory;

    @Before
    public void init() {
        characterFactory = new CharacterFactory();
    }

    @Test
    public void plan_where_all_characters_sleep_exactly_their_required_sleep_time_should_stay_the_same() {
        Watch watchOfOneCharacter = Watch.builder()
                .order(1)
                .watchfulCharacter(characterFactory.getAlteredHuman("Character A", EIGHT_HOURS))
                .length(FOUR_HOURS)
                .build();

        Watch watchOfTwoCharacters = Watch.builder()
                .order(2)
                .watchfulCharacter(characterFactory.getAlteredHuman("Character B", EIGHT_HOURS))
                .watchfulCharacter(characterFactory.getAlteredHuman("Character C", EIGHT_HOURS))
                .length(FOUR_HOURS)
                .build();

        Watch watchOfThreeCharacters = Watch.builder()
                .order(3)
                .watchfulCharacter(characterFactory.getAlteredHuman("Character D", EIGHT_HOURS))
                .watchfulCharacter(characterFactory.getAlteredHuman("Character E", EIGHT_HOURS))
                .watchfulCharacter(characterFactory.getAlteredHuman("Character F", EIGHT_HOURS))
                .length(FOUR_HOURS)
                .build();

        List<Watch> originalWatches = Arrays.asList(watchOfOneCharacter, watchOfTwoCharacters, watchOfThreeCharacters);
        Set<Character> party = new HashSet<>();
        originalWatches.forEach(watch -> party.addAll(watch.getWatchfulCharacters()));

        Plan plan = new Plan();
        plan.setCharacters(party);
        plan.setWatches(new ArrayList<>(originalWatches));

        assertEquals(originalWatches, plan.compactedWatches());
    }

    @Test
    public void should_wake_up_character_that_sleep_too_much_from_watches_where_the_does_not_need_to_sleep_any_more() {
        Character chAsl4h = characterFactory.getAlteredHuman("Character A req sleep 4h", FOUR_HOURS);
        Character chBsl6h = characterFactory.getAlteredHuman("Character B req sleep 6h", SIX_HOURS);
        Character chCsl6h = characterFactory.getAlteredHuman("Character C req sleep 6h", SIX_HOURS);
        Character chDsl6h = characterFactory.getAlteredHuman("Character D req sleep 6h", SIX_HOURS);

        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(chAsl4h)
                .length(TWO_HOURS)
                .build();
        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(chBsl6h)
                .length(TWO_HOURS)
                .build();
        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(chCsl6h)
                .length(TWO_HOURS)
                .build();
        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(chDsl6h)
                .length(TWO_HOURS)
                .build();

        Set<Character> party = new HashSet<>(Arrays.asList(chAsl4h, chBsl6h, chCsl6h, chDsl6h));

        Plan plan = new Plan();
        plan.setCharacters(party);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3, watch4));

        Watch watch4AfterCompact = plan.compactedWatches().stream().filter(watch -> watch.getOrder() == 4).findFirst().orElse(watch4);

        assertTrue("Character A should awake in watch 4 because she has already sleep her four hours",
                watch4AfterCompact.getWatchfulCharacters().contains(chAsl4h));
    }

    @Test
    public void a_watch_with_only_a_no_rested_should_be_filled_character_filled_with_a_rested_character() {
        Character chA = characterFactory.getAlteredHuman("Character A req sleep 2h", TWO_HOURS);
        Character chB = characterFactory.getAlteredHuman("Character B req sleep 4h", FOUR_HOURS);
        Character chC = characterFactory.getAlteredHuman("Character C req sleep 2h", TWO_HOURS);

        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(chA)
                .length(TWO_HOURS)
                .build();
        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(chB)
                .length(TWO_HOURS)
                .build();
        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(chC)
                .length(TWO_HOURS)
                .build();

        Set<Character> party = new HashSet<>(Arrays.asList(chA, chB, chC));

        Plan plan = new Plan();
        plan.setCharacters(party);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3));

        Watch watch2AfterCompact = plan.compactedWatches().stream().filter(watch -> watch.getOrder() == 2).findFirst().orElse(watch2);
        assertEquals("In  second shift Characters B (2h remain to sleep) and Character C (already rested) should do the shift together",
                Arrays.asList(chB, chC),
                watch2AfterCompact.getWatchfulCharacters());
    }

    @Test
    public void after_wake_up_character_if_shift_is_overloaded_should_send_to_sleep_almost_rested_characters() {
        Character chA = characterFactory.getAlteredHuman("Character A req sleep 2h", TWO_HOURS);
        Character chB = characterFactory.getAlteredHuman("Character B req sleep 8h", EIGHT_HOURS);
        Character chC = characterFactory.getAlteredHuman("Character C req sleep 6h", SIX_HOURS);
        Character chD = characterFactory.getAlteredHuman("Character D req sleep 8h", EIGHT_HOURS);
        Character chE = characterFactory.getAlteredHuman("Character C req sleep 6h", SIX_HOURS);

        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(chA)
                .length(TWO_HOURS)
                .build();
        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(chB)
                .length(TWO_HOURS)
                .build();
        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(chC)
                .watchfulCharacter(chD)
                .length(TWO_HOURS)
                .build();
        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(chE)
                .length(FOUR_HOURS)
                .build();

        Set<Character> party = new HashSet<>(Arrays.asList(chA, chB, chC, chD));

        Plan plan = new Plan();
        plan.setCharacters(party);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3, watch4));

        Watch watch4AfterCompact = plan.compactedWatches().stream().filter(watch -> watch.getOrder() == 4).findFirst().orElse(watch4);

        assertEquals("In watch 3, 'A' should be awake (because he is rested) and 'C' should go to sleep because he has less hours to sleep",
                Arrays.asList(chC, chA),
                watch4AfterCompact.getWatchfulCharacters());
    }

    @Test
    public void watch_should_be_removed_if_all_character_are_awake() {
        Character chA = characterFactory.getAlteredHuman("Character A req sleep 4h", FOUR_HOURS);
        Character chB = characterFactory.getAlteredHuman("Character B req sleep 4h", FOUR_HOURS);

        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(chA)
                .length(FOUR_HOURS)
                .build();
        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(chB)
                .length(FOUR_HOURS)
                .build();
        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(chA)
                .length(TWO_HOURS)
                .build();

        Set<Character> party = new HashSet<>(Arrays.asList(chA, chB));

        Plan plan = new Plan();
        plan.setCharacters(party);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3));

        List<Watch> compacted = plan.compactedWatches();

        assertEquals("Compacted pan should have only two watches because in the third all characters are awake", 2, compacted.size());
    }

    @Test
    public void consecutive_same_characters_watches_should_join_into_a_single_watch_lasting_the_total() {
        Character chA = characterFactory.getAlteredHuman("Character A req sleep 8h", EIGHT_HOURS);
        Character chB = characterFactory.getAlteredHuman("Character B req sleep 4h", FOUR_HOURS);
        Character chC = characterFactory.getAlteredHuman("Character C req sleep 4h", FOUR_HOURS);

        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(chA)
                .length(FOUR_HOURS)
                .build();
        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(chB)
                .watchfulCharacter(chC)
                .length(TWO_HOURS)
                .build();
        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(chB)
                .watchfulCharacter(chC)
                .length(SIX_HOURS)
                .build();

        Set<Character> party = new HashSet<>(Arrays.asList(chA, chB));

        Plan plan = new Plan();
        plan.setCharacters(party);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3));

        List<Watch> compacted = plan.compactedWatches();

        assertEquals("Compacted pan should have only two watches because the last two ones should be joined", 2, compacted.size());
        assertEquals("Last watch should last the sum of the joined ones", EIGHT_HOURS, compacted.get(1).getLength());
    }
}
