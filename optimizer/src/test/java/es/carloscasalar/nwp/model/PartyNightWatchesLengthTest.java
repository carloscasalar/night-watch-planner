package es.carloscasalar.nwp.model;

import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class PartyNightWatchesLengthTest {

    private static final CharacterFactory characterFactory = new CharacterFactory();
    private Character kitiara;
    private Character tanis;
    private Character laurana;
    private Character sturm;

    @Before
    public void init() {
        kitiara = characterFactory.getHuman("Kitiara uth Matar");
        sturm = characterFactory.getHuman("Sturm Brightblade");
        tanis = characterFactory.getHalfElf("Tanis Half-Elven");
        laurana = characterFactory.getElf("Laurana");
    }

    @Test
    public void in_a_two_watches_plan_with_two_eight_sleeping_characters_listener_should_set_al_watch_length_to_eight_hours() {
        Watch kitiarasWatch = Watch.builder()
                .order(1)
                .watchfulCharacter(kitiara)
                .build();

        Watch tanissWatch = Watch.builder()
                .order(2)
                .watchfulCharacter(tanis)
                .build();

        PartyNightWatch partyNightWatch = new PartyNightWatch(characterFactory.partyWith(kitiara, tanis), Arrays.asList(kitiarasWatch, tanissWatch));
        partyNightWatch.adjust();

        assertEquals("Kitiara's watch should last all time Tanis is sleeping (360 minutes)", tanis.getRequiredSleepTime(), partyNightWatch.getWatches().get(0).getLength());
        assertEquals("Tanis's watch should last all time Kitiara is sleeping (480 minutes)", kitiara.getRequiredSleepTime(), partyNightWatch.getWatches().get(1).getLength());

    }

    @Test
    public void a_13_hours_configuration() {

        /*
        Watch / Required sleeping times (hours) ->  Kitiara   Tanis    Laurana   Expected resulting watch length (max)
        Laurana                                       8/3      6/2        -        6/2  = 180 min
        Laurana - Tanis                               8/3       -         -        8/3  = 160 min
        Tanis   - Kitiara                              -        -         4         4   = 240 min
        Laurana                                       8/3      6/2        -        6/2  = 180 min
        --------------------------------------------------------------------------------------------------------------
        TOTAL REQUIRED SLEEPING TIME(REAL SLEEPING)  8(8,6)    6(6)       4(4)    TOTAL PLAN LENGTH = 760 min ~ 12,6 h
         */

        Watch firstWatch = Watch.builder()
                .order(1)
                .watchfulCharacter(laurana)
                .build();

        Watch secondWatch = Watch.builder()
                .order(2)
                .watchfulCharacter(laurana)
                .watchfulCharacter(tanis)
                .build();

        Watch thirdWatch = Watch.builder()
                .order(3)
                .watchfulCharacter(tanis)
                .build();

        Watch fourthWatch = Watch.builder()
                .order(4)
                .watchfulCharacter(laurana)
                .watchfulCharacter(kitiara)
                .build();

        PartyNightWatch partyNightWatch = new PartyNightWatch(characterFactory.partyWith(laurana, tanis, kitiara), Arrays.asList(firstWatch, secondWatch, thirdWatch, fourthWatch));
        partyNightWatch.adjust();

        List<Watch> adjustedWatches = partyNightWatch.getWatches();

        assertEquals("First watch should last 180 mins", Integer.valueOf(180), adjustedWatches.get(0).getLength());
        assertEquals("Second watch should last 160 mins", Integer.valueOf(160), adjustedWatches.get(1).getLength());
        assertEquals("Third watch should last 240 mins", Integer.valueOf(240), adjustedWatches.get(2).getLength());
        assertEquals("Fourth watch should last 180 mins", Integer.valueOf(180), adjustedWatches.get(3).getLength());

    }

    @Test
    public void in_a_two_watches_plan_the_min_length_of_a_watch_in_witch_a_character_is_sleeping_should_be_her_full_sleep_time() {
        PartyNightWatch partyNightWatch = new PartyNightWatch(
                characterFactory.partyWith(kitiara, sturm),
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

        partyNightWatch.adjust();

        Watch expectedWatchWhereSturmIsSleeping = Watch.builder()
                .order(1)
                .watchfulCharacter(kitiara)
                .length(sturm.getRequiredSleepTime())
                .build();

        assertEquals("Sturm should sleep 8 hours (480 minutes) while Kitiara watches",
                expectedWatchWhereSturmIsSleeping, partyNightWatch.getWatches().get(0));

        Watch expectedWatchWhereKitiaraIsSleeping = Watch.builder()
                .order(2)
                .watchfulCharacter(sturm)
                .length(kitiara.getRequiredSleepTime())
                .build();

        assertEquals("Kitiara should sleep 8 hours (480 minutes) while Sturm watches",
                expectedWatchWhereKitiaraIsSleeping, partyNightWatch.getWatches().get(1));
    }

    @Test
    public void in_a_plan_with_four_shifts_where_a_character_sleep_one_the_other_three_shift_should_last_the_third_part_of_her_sleep_time() {
        PartyNightWatch partyNightWatch = new PartyNightWatch(
                characterFactory.partyWith(kitiara, sturm),
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

        partyNightWatch.adjust();

        Watch expectedWatchWhereSturmIsSleeping = Watch.builder()
                .order(1)
                .watchfulCharacter(kitiara)
                .length(sturm.getRequiredSleepTime())
                .build();

        assertEquals("Sturm should sleep 8 hours (480 minutes) in the only shift where he is sleeping",
                expectedWatchWhereSturmIsSleeping, partyNightWatch.getWatches().get(0));

        Watch expectedJoinedWatchWhereKitiaraIsSleeping = Watch.builder()
                .order(2)
                .watchfulCharacter(sturm)
                .length(kitiara.getRequiredSleepTime())
                .build();

        assertEquals("Each turn in witch Kitiara is sleeping should last for 8/3 hours (480/3 = 160 minutes) and should join in one single shift",
                expectedJoinedWatchWhereKitiaraIsSleeping, partyNightWatch.getWatches().get(1));

    }

    @Test
    public void minimum_sleeping_time_should_be_rounded_down() {
        Character elf1 = characterFactory.getElf("Elf one");
        Character elf2 = characterFactory.getElf("Elf two");
        Character elf3 = characterFactory.getElf("Elf three");
        Character characterThatSleeps400minutes = characterFactory.getAlteredHuman("Altered human", 400);

        PartyNightWatch partyNightWatch = new PartyNightWatch(
                characterFactory.partyWith(characterThatSleeps400minutes, elf1, elf2, elf3),
                Arrays.asList(
                        Watch.builder()
                                .order(1)
                                .watchfulCharacter(characterThatSleeps400minutes)
                                .build(),
                        Watch.builder()
                                .order(2)
                                .watchfulCharacter(elf1)
                                .watchfulCharacter(elf2)
                                .build(),
                        Watch.builder()
                                .order(3)
                                .watchfulCharacter(elf2)
                                .watchfulCharacter(elf3)
                                .build(),
                        Watch.builder()
                                .order(4)
                                .watchfulCharacter(elf3)
                                .watchfulCharacter(elf1)
                                .build()
                )
        );

        partyNightWatch.adjust();

        Watch firstWatchWhereWeirdCharacterIsSleeping = partyNightWatch.getWatches().get(1);
        Watch secondWatchWhereWeirdCharacterIsSleeping = partyNightWatch.getWatches().get(2);
        Watch thirdWatchWhereWeirdCharacterIsSleeping = partyNightWatch.getWatches().get(3);

        assertEquals("Each turn in witch he is sleeping should last for 400/3 minutes rounded up = 133 minutes (1st)",
                Integer.valueOf(133), firstWatchWhereWeirdCharacterIsSleeping.getLength());
        assertEquals("Each turn in witch he is sleeping should last for 400/3 minutes rounded up = 133 minutes (2nd)",
                Integer.valueOf(133), secondWatchWhereWeirdCharacterIsSleeping.getLength());
        assertEquals("Each turn in witch he is sleeping should last for 400/3 minutes rounded up = 133 minutes (3rd)",
                Integer.valueOf(133), thirdWatchWhereWeirdCharacterIsSleeping.getLength());
    }
}