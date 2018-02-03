package es.carloscasalar.nwp.score;

import es.carloscasalar.nwp.domain.Watch;
import es.carloscasalar.nwp.domain.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class WatchDifficultyWeightComparatorTest {

    private CharacterFactory characterFactory;
    private WatchDifficultyWeightComparator comparator;

    @Before
    public void init() {
        characterFactory = new CharacterFactory();
        comparator = new WatchDifficultyWeightComparator();
    }

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void comparisons_between_empty_watches_should_not_fail() {
        Watch watchA = new Watch();
        Watch watchB = new Watch();

        comparator.compare(watchA, watchB);

        watchA.setWatchfulCharacters(Collections.emptyList());
        comparator.compare(watchA, watchB);

        watchB.setWatchfulCharacters(Collections.emptyList());
        comparator.compare(watchA, watchB);

        watchA.setWatchfulCharacters(Collections.singletonList(characterFactory.getHuman("Human A")));
        comparator.compare(watchA, watchB);
    }

    @Test
    public void a_watch_with_one_watchful_character_should_be_lighter_than_one_with_two_characters() {
        Watch watchWithOneWatchfulCharacter = Watch.builder()
                .watchfulCharacter(characterFactory.getDwarf("Character A"))
                .build();
        Watch watchWithTwoWatchfulCharacters = Watch.builder()
                .watchfulCharacter(characterFactory.getHuman("Character B"))
                .watchfulCharacter(characterFactory.getDwarf("Character A"))
                .build();

        assertEquals(
                "Compare a watch with 1 character against a 2 character watch",
                -1,
                comparator.compare(
                        watchWithOneWatchfulCharacter,
                        watchWithTwoWatchfulCharacters
                ));
    }

    @Test
    public void a_watch_with_two_watchful_character_should_be_heavier_than_one_with_two_characters() {
        Watch watchWithOneWatchfulCharacter = Watch.builder()
                .watchfulCharacter(characterFactory.getDwarf("Character A"))
                .build();
        Watch watchWithTwoWatchfulCharacters = Watch.builder()
                .watchfulCharacter(characterFactory.getHuman("Character B"))
                .watchfulCharacter(characterFactory.getDwarf("Character A"))
                .build();

        assertEquals(
                "Compare a watch with 2 character against a 1 character watch",
                1,
                comparator.compare(
                        watchWithTwoWatchfulCharacters,
                        watchWithOneWatchfulCharacter
                ));
    }

    @Test
    public void two_watch_with_the_same_number_of_character_weigh_the_same() {
        Watch twoWatchfulCharactersWatch = Watch.builder()
                .watchfulCharacter(characterFactory.getElf("Character A"))
                .watchfulCharacter(characterFactory.getElf("Character B"))
                .build();
        Watch anotherWatchfulCharactersWatch = Watch.builder()
                .watchfulCharacter(characterFactory.getElf("Character C"))
                .watchfulCharacter(characterFactory.getElf("Character D"))
                .build();

        assertEquals(
                "Compare two watch with the same number of characters",
                0,
                comparator.compare(
                        twoWatchfulCharactersWatch,
                        anotherWatchfulCharactersWatch
                ));
    }

    @Test
    public void if_number_of_characters_is_the_same_the_one_with_same_sleep_time_characters_should_be_lighter() {
        Watch twoHumansWatch = Watch.builder()
                .watchfulCharacter(characterFactory.getHuman("Human A"))
                .watchfulCharacter(characterFactory.getHuman("Human B"))
                .build();
        Watch elfHumanWatch = Watch.builder()
                .watchfulCharacter(characterFactory.getHuman("Human C"))
                .watchfulCharacter(characterFactory.getElf("Elf A"))
                .build();

        assertEquals(
                "Compare watch with two same sleeping time character against another with different sleeping time",
                -1,
                comparator.compare(
                        twoHumansWatch,
                        elfHumanWatch
                ));
    }

    @Test
    public void watches_with_greater_differences_between_sleep_times_should_weigh_more() {
        Watch maxFourDifferenceSleepTime = Watch.builder()
                .watchfulCharacter(characterFactory.getAlteredHuman("Human D", 8))
                .watchfulCharacter(characterFactory.getAlteredHuman("Human E", 6))
                .watchfulCharacter(characterFactory.getAlteredHuman("Human F", 6))
                .build();
        Watch maxSixDifferenceSleepTime = Watch.builder()
                .watchfulCharacter(characterFactory.getAlteredHuman("Human A", 8))
                .watchfulCharacter(characterFactory.getAlteredHuman("Human B", 4))
                .watchfulCharacter(characterFactory.getAlteredHuman("Human C", 2))
                .build();

        assertEquals(
                "Compare watch with 2 hours of max difference against another with 6 hours of max difference",
                -1,
                comparator.compare(
                        maxFourDifferenceSleepTime,
                        maxSixDifferenceSleepTime
                ));
    }
}
