package es.carloscasalar.nwp.model;

import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.HashSet;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class PlanSleepTimeTest {

    private Character kitiara;
    private Character sturm;
    private Character characterThatSleeps400minutes;

    @Before
    public void init() {
        CharacterFactory characterFactory = new CharacterFactory();

        kitiara = characterFactory.getHuman("Kitiara uth Matar");
        sturm = characterFactory.getHuman("Sturm Brightblade");
        characterThatSleeps400minutes = characterFactory.getAlteredHuman("Altered human", 400);

    }

    @Test
    public void in_a_two_watches_plan_the_min_length_of_a_watch_in_witch_a_character_is_sleeping_should_be_her_full_sleep_time() {
        Plan plan = new Plan();

        plan.setCharacters(new HashSet<>());
        plan.getCharacters().add(kitiara);
        plan.getCharacters().add(sturm);

        plan.setWatches(
                Arrays.asList(
                        Watch.builder()
                                .order(1)
                                .watchfulCharacter(kitiara)
                                .build(),
                        Watch.builder()
                                .order(2)
                                .watchfulCharacter(sturm)
                                .build()
                )
        );

        Integer minLengthForWatchesWhereSturmIsSleeping = plan.minLengthNightwatchWithSleeping(sturm);
        assertEquals("Sturm should sleep 8 hours (480 minutes)",
                sturm.getRequiredSleepTime(), minLengthForWatchesWhereSturmIsSleeping);

        Integer minLengthForWatchesWhereKitiaraIsSleeping = plan.minLengthNightwatchWithSleeping(kitiara);
        assertEquals("Kitiara should sleep 8 hours (480 minutes)",
                kitiara.getRequiredSleepTime(), minLengthForWatchesWhereKitiaraIsSleeping);
    }

    @Test
    public void in_a_plan_with_four_shifts_where_a_character_sleep_one_the_other_three_shift_should_last_the_third_part_of_her_sleep_time() {
        Plan plan = new Plan();

        plan.setCharacters(new HashSet<>());
        plan.getCharacters().add(kitiara);
        plan.getCharacters().add(sturm);

        plan.setWatches(
                Arrays.asList(
                        Watch.builder()
                                .order(1)
                                .watchfulCharacter(kitiara)
                                .build(),
                        Watch.builder()
                                .order(2)
                                .watchfulCharacter(sturm)
                                .build(),
                        Watch.builder()
                                .order(3)
                                .watchfulCharacter(sturm)
                                .build(),
                        Watch.builder()
                                .order(4)
                                .watchfulCharacter(sturm)
                                .build()
                )
        );

        Integer minLengthForWatchesWhereSturmIsSleeping = plan.minLengthNightwatchWithSleeping(sturm);
        assertEquals("Sturm should sleep 8 hours (480 minutes) in the only shift where he is sleeping",
                sturm.getRequiredSleepTime(), minLengthForWatchesWhereSturmIsSleeping);

        Integer minLengthForWatchesWhereKitiaraIsSleeping = plan.minLengthNightwatchWithSleeping(kitiara);
        assertEquals("Each turn in witch Kitiara is sleeping should last for 8/3 hours (480/3 = 160 minutes)",
                Integer.valueOf(160), minLengthForWatchesWhereKitiaraIsSleeping);
    }

    @Test
    public void minimum_sleeping_time_should_be_rounded_down() {
        Plan plan = new Plan();

        plan.setCharacters(new HashSet<>());
        plan.getCharacters().add(characterThatSleeps400minutes);
        plan.getCharacters().add(sturm);

        plan.setWatches(
                Arrays.asList(
                        Watch.builder()
                                .order(1)
                                .watchfulCharacter(characterThatSleeps400minutes)
                                .build(),
                        Watch.builder()
                                .order(2)
                                .watchfulCharacter(sturm)
                                .build(),
                        Watch.builder()
                                .order(3)
                                .watchfulCharacter(sturm)
                                .build(),
                        Watch.builder()
                                .order(4)
                                .watchfulCharacter(sturm)
                                .build()
                )
        );

        Integer minLengthForWatchesWhereAlteredIsSleeping = plan.minLengthNightwatchWithSleeping(characterThatSleeps400minutes);
        assertEquals("Each turn in witch he is sleeping should last for 400/3 minutes rounded up = 133 minutes",
                Integer.valueOf(133), minLengthForWatchesWhereAlteredIsSleeping);
    }
}
