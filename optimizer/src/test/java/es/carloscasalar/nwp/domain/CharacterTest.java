package es.carloscasalar.nwp.domain;

import es.carloscasalar.nwp.domain.fixtures.CharacterFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

@RunWith(MockitoJUnitRunner.class)
public class CharacterTest {

    private final CharacterFactory characterFactory = new CharacterFactory();

    @Test
    public void two_characters_with_same_name_should_be_the_same() {
        Character characterA = characterFactory.getHuman("name");
        Character characterB = characterFactory.getDwarf("name");

        assertEquals(characterA, characterB);
    }

    @Test
    public void two_characters_with_different_name_should_be_not_be_the_same() {
        Character characterA = characterFactory.getHuman("nameA");
        Character characterB = characterFactory.getHuman("nameB");


        assertNotEquals(characterA, characterB);
    }


}
