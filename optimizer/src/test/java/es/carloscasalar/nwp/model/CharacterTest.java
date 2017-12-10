package es.carloscasalar.nwp.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

@RunWith(MockitoJUnitRunner.class)
public class CharacterTest {

    private static final List<Sense> EMPTY_SENSES = new ArrayList<>();
    private static final List<Sense> LOW_LIGHT_VISION = Collections.singletonList(Sense.LOW_LIGHT);
    private static final Integer FOUR_HOURS = 60 * 4;
    private static final Integer EIGHT_HOURS = 60 * 8;

    @Test
    public void two_characters_with_same_name_should_be_the_same() {
        Character characterA = new Character("name", EMPTY_SENSES, FOUR_HOURS);
        Character characterB = new Character("name", LOW_LIGHT_VISION, EIGHT_HOURS);

        assertEquals(characterA, characterB);
    }

    @Test
    public void two_characters_with_different_name_should_be_not_be_the_same() {
        Character characterA = new Character("nameA", EMPTY_SENSES, FOUR_HOURS);
        Character characterB = new Character("nameB", EMPTY_SENSES, FOUR_HOURS);


        assertNotEquals(characterA, characterB);
    }


}
