package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Character;
import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
import es.carloscasalar.nwp.model.Watch;
import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class WatchDifficultyWeightFactoryTest {

    private Plan plan;
    private Character legolas;
    private Character gimli;
    private Character boromir;
    private Character aragorn;

    private WatchDifficultyWeightFactory watchDifficultyWeightFactory;

    @Before
    public void init() {
        CharacterFactory characterFactory = new CharacterFactory();

        watchDifficultyWeightFactory = new WatchDifficultyWeightFactory();

        legolas = characterFactory.getElf("Legolas");
        gimli = characterFactory.getDwarf("Gimli");
        boromir = characterFactory.getHuman("Boromir");
        aragorn = characterFactory.getHuman("Aragorn");

        Set<Character> characters = new HashSet<>();
        characters.addAll(Arrays.asList(legolas, gimli, boromir, aragorn));

        PlanRequest planRequest = PlanRequest
                .builder()
                .maxWatches(8)
                .party(characters)
                .build();

        plan = Plan.builder()
                .planRequest(planRequest)
                .build();
    }

    @Ignore
    @Test
    public void if_a_character_is_lazy_new_watch_with_him_should_be_stronger() {
        Watch watchWithLegolas = Watch.builder()
                .watchfulCharacter(legolas)
                .build();

        Watch watchWithGimli = Watch.builder()
                .watchfulCharacter(gimli)
                .build();

        plan.setWatches(Collections.singletonList(watchWithLegolas));

        assertEquals("new watch with a new watchful character should be stronger", 1, watchDifficultyWeightFactory.createSorterWeight(plan, watchWithGimli));
    }

    @Ignore
    @Test
    public void if_a_character_is_already_doing_a_watch_a_new_watch_with_him_should_be_weaker() {
        Watch watchWithLegolas = Watch.builder()
                .watchfulCharacter(legolas)
                .build();

        Watch anotherWatchWithLegolas = Watch.builder()
                .watchfulCharacter(legolas)
                .build();

        plan.setWatches(Collections.singletonList(watchWithLegolas));

        assertEquals("new watch with an already watchful character should be weaker", -1, watchDifficultyWeightFactory.createSorterWeight(plan, anotherWatchWithLegolas));
    }
}
