package es.carloscasalar.nwp.model;

import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class PlanInitializationTest {

    private static final int SIX_HOURS = 6 * 60;
    private static final int TWO_HOURS = 2 * 60;

    private CharacterFactory characterFactory;

    @Before
    public void init() {
        characterFactory = new CharacterFactory();
    }

    @Test
    public void plan_with_8h_sleeping_character_and_6h_sleeping_should_be_initialized_with_14_watches() {
        Set<Character> party = new HashSet<>();
        party.add(characterFactory.getHuman("8h sleeping character"));
        party.add(characterFactory.getAlteredHuman("6h sleeping character", 6));
        PlanRequest planRequest = PlanRequest.builder()
                .party(party)
                .build();

        Plan plan = Plan.builder()
                .planRequest(planRequest)
                .build();

        assertEquals("Number of watches for plan", 14, plan.getWatches().size());
    }

    @Test
    public void plan_with_character_sleeping_8_8_6_6_4_and_2_hours_should_be_initialized_with_8_plus_2_watches() {
        Set<Character> party = new HashSet<>();
        party.add(characterFactory.getHuman("8h sleeping character"));
        party.add(characterFactory.getHuman("Another 8h sleeping character"));
        party.add(characterFactory.getAlteredHuman("6h sleeping character", SIX_HOURS));
        party.add(characterFactory.getAlteredHuman("Another 6h sleeping character", SIX_HOURS));
        party.add(characterFactory.getAlteredHuman("2h sleeping character", TWO_HOURS));
        PlanRequest planRequest = PlanRequest.builder()
                .party(party)
                .build();

        Plan plan = Plan.builder()
                .planRequest(planRequest)
                .build();

        assertEquals("Number of watches for plan", 10, plan.getWatches().size());
    }
}
