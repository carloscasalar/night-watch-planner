package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Watch;
import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class WatchDifficultyWeightComparatorTest {

    private CharacterFactory characterFactory;

    @Before
    public void init() {
        characterFactory = new CharacterFactory();
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

        WatchDifficultyWeightComparator comparator = new WatchDifficultyWeightComparator();
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

        WatchDifficultyWeightComparator comparator = new WatchDifficultyWeightComparator();
        assertEquals(
                "Compare a watch with 2 character against a 1 character watch",
                1,
                comparator.compare(
                        watchWithTwoWatchfulCharacters,
                        watchWithOneWatchfulCharacter
                ));
    }

    @Test
    public void two_watch_with_the_same_number_of_character_weigh_the_same(){
        Watch twoWatchfulCharactersWatch = Watch.builder()
                .watchfulCharacter(characterFactory.getDwarf("Character A"))
                .watchfulCharacter(characterFactory.getElf("Character B"))
                .build();
        Watch anotherWatchfulCharactersWatch = Watch.builder()
                .watchfulCharacter(characterFactory.getHuman("Character C"))
                .watchfulCharacter(characterFactory.getDwarf("Character D"))
                .build();

        WatchDifficultyWeightComparator comparator = new WatchDifficultyWeightComparator();
        assertEquals(
                "Compare two watch with the same number of characters",
                0,
                comparator.compare(
                        twoWatchfulCharactersWatch,
                        anotherWatchfulCharactersWatch
                ));
    }
}
