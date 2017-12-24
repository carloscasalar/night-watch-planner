package es.carloscasalar.nwp.model.score;

import es.carloscasalar.nwp.model.Character;
import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
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

    private static final Integer TWO_HOURS = 60 * 2;
    private static final Integer FOUR_HOURS = 60 * 4;
    private static final Integer EIGHT_HOURS = 60 * 8;
    private static final Integer SIX_HOURS = 60 * 6;
    private static final Integer TEN_HOURS = 60 * 10;

    private PlanScoreCalculator planScoreCalculator;

    private Set<Character> partyOfFourElves;

    private Character legolas;
    private Character silvara;
    private Character laurana;
    private Character gilthanas;


    @Before
    public void init() {
        planScoreCalculator = new PlanScoreCalculator();

        CharacterFactory characterFactory = new CharacterFactory();

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
                .length(TWO_HOURS)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .length(TWO_HOURS)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .length(TWO_HOURS)
                .build();

        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setWatches(Arrays.asList(watch1, watch2, watch3, watch4));
        plan.setPlanRequest(PlanRequest.builder().maxTotalTimeSpent(EIGHT_HOURS).build());

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("score should be 0", "0", score.toShortString());
    }

    @Test
    public void a_plan_where_all_characters_do_watch_with_no_lazy_characters_but_one_of_them_do_watch_alone_should_be_feasible_but_not_perfect() {
        Watch soloFirstWatch = Watch.builder()
                .order(1)
                .watchfulCharacter(legolas)
                .length(FOUR_HOURS)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .length(TWO_HOURS)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .length(TWO_HOURS)
                .build();

        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setWatches(Arrays.asList(soloFirstWatch, watch2, watch3, watch4));
        plan.setPlanRequest(PlanRequest.builder().maxTotalTimeSpent(TEN_HOURS).build());

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
                .length(TWO_HOURS)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .length(TWO_HOURS)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .length(TWO_HOURS)
                .build();

        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setWatches(Arrays.asList(overLoadedWatch, watch2, watch3, watch4));
        plan.setPlanRequest(PlanRequest.builder().maxTotalTimeSpent(TEN_HOURS).build());

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1soft", score.toShortString());
    }

    @Test
    public void a_plan_where_all_characters_do_watch_in_pairs_and_has_one_lazy_characters_should_not_be_feasible() {
        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .length(TWO_HOURS)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        List<Watch> watchesWithLazyLegolas = Arrays.asList(watch1, watch2, watch3, watch4);
        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setWatches(watchesWithLazyLegolas);
        plan.setPlanRequest(PlanRequest.builder().maxTotalTimeSpent(TEN_HOURS).build());

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1hard", score.toShortString());
    }

    @Test
    public void a_plan_where_all_characters_do_watch_in_pairs_and_has_no_lazy_characters_but_last_more_than_max_length_should_not_be_feasible() {
        Watch watch1 = Watch.builder()
                .order(1)
                .watchfulCharacter(legolas)
                .watchfulCharacter(silvara)
                .length(TWO_HOURS)
                .build();

        Watch watch2 = Watch.builder()
                .order(2)
                .watchfulCharacter(silvara)
                .watchfulCharacter(laurana)
                .length(TWO_HOURS)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .length(TWO_HOURS)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .length(FOUR_HOURS)
                .build();

        List<Watch> watchesWithLazyLegolas = Arrays.asList(watch1, watch2, watch3, watch4);
        Plan plan = Plan.builder()
                .planRequest(PlanRequest.builder()
                        .maxTotalTimeSpent(EIGHT_HOURS)
                        .party(partyOfFourElves)
                        .build())
                .build();

        plan.setWatches(watchesWithLazyLegolas);

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("score should not be feasible", "-1hard", score.toShortString());
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
                .length(TWO_HOURS)
                .build();

        Watch watch3 = Watch.builder()
                .order(3)
                .watchfulCharacter(laurana)
                .watchfulCharacter(gilthanas)
                .length(TWO_HOURS)
                .build();

        Watch watch4 = Watch.builder()
                .order(4)
                .watchfulCharacter(gilthanas)
                .watchfulCharacter(legolas)
                .length(TWO_HOURS)
                .build();

        List<Watch> watchesWithLazyLegolas = Arrays.asList(emptyWatch, watch2, watch3, watch4);
        Plan plan = new Plan();
        plan.setCharacters(partyOfFourElves);
        plan.setWatches(watchesWithLazyLegolas);
        plan.setPlanRequest(PlanRequest.builder().maxTotalTimeSpent(TEN_HOURS).build());

        Score score = planScoreCalculator.calculateScore(plan);

        assertEquals("-1hard", score.toShortString());
    }
}
