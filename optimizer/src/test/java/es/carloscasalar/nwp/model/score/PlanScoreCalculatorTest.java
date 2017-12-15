package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Character;
import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.Watch;
import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.optaplanner.core.api.score.Score;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class PlanScoreCalculatorTest {

    private PlanScoreCalculator planScoreCalculator;
    private CharacterFactory characterFactory;

    private Set<Character> partyOfFourElves;

    private Character legolas;
    private Character silvara;
    private Character laurana;
    private Character gilthanas;


    @Before
    public void init() {
        planScoreCalculator = new PlanScoreCalculator();

        characterFactory = new CharacterFactory();

        legolas = characterFactory.getElf("Legolas");
        silvara = characterFactory.getElf("Silvara");
        laurana = characterFactory.getElf("Laurana");
        gilthanas = characterFactory.getElf("Gilthanas");

        partyOfFourElves = new HashSet<>();
        partyOfFourElves.add(legolas);
        partyOfFourElves.add(silvara);
        partyOfFourElves.add(laurana);
        partyOfFourElves.add(gilthanas);
    }

    @Test
    public void a_plan_where_all_characters_do_watch_in_pairs_and_has_no_lazy_characters_should_be_perfect() {
        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(legolas)
                .watchfulCharacter(silvara)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .build();

        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setMaxNumberOfWatches(4);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3, watch4));

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("score should be 0", "0", score.toShortString());
    }

    @Test
    public void a_plan_where_all_characters_do_watch_with_no_lazy_characters_but_one_of_them_do_watch_alone_should_be_feasible_but_not_perfect() {
        Watch soloFirstWatch = Watch.builder()
                .order(1)
                .watchfulCharacter(legolas)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .build();

        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setMaxNumberOfWatches(4);
        plan.setWatches(Arrays.asList(soloFirstWatch, watch2, watch3, watch4));

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1medium", score.toShortString());
    }

    @Test
    public void a_plan_where_all_characters_do_watch_with_no_lazy_characters_but_three_of_them_do_watch_together_should_be_almost_perfect() {
        Watch overLoadedWatch = Watch.builder()
                .order(1)
                .watchfulCharacter(silvara)
                .watchfulCharacter(legolas)
                .watchfulCharacter(gilthanas)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .build();

        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setMaxNumberOfWatches(4);
        plan.setWatches(Arrays.asList(overLoadedWatch, watch2, watch3, watch4));

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1soft", score.toShortString());
    }

    @Test
    public void a_plan_where_all_characters_do_watch_in_pairs_and_has_one_lazy_characters_should_not_be_feasible() {
        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(laurana)
                .build();

        List<Watch> watchesWithLazyLegolas = Arrays.asList(watch1, watch2, watch3, watch4);
        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setMaxNumberOfWatches(4);
        plan.setWatches(watchesWithLazyLegolas);

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1hard", score.toShortString());
    }

    @Test
    public void a_plan_with_an_empty_Watch_not_be_feasible() {
        Watch emptyWatch = Watch.builder()
                .order(1)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .build();

        List<Watch> watchesWithLazyLegolas = Arrays.asList(emptyWatch, watch2, watch3, watch4);
        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setMaxNumberOfWatches(4);
        plan.setWatches(watchesWithLazyLegolas);

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1hard", score.toShortString());
    }
}
