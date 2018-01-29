package es.carloscasalar.nwp.model;

import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class PartyNightWatchesLengthTest {

    private Character kitiara;
    private Character tanis;
    private Character laurana;
    private static final CharacterFactory characterFactory = new CharacterFactory();

    @Before
    public void init() {
        kitiara = characterFactory.getHuman("Kitiara uth Matar");
        tanis = characterFactory.getHalfElf("Tanis");
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
}