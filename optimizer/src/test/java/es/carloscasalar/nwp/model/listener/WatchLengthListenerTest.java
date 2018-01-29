package es.carloscasalar.nwp.model.listener;

import es.carloscasalar.nwp.model.Character;
import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.Watch;
import es.carloscasalar.nwp.model.fixtures.CharacterFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.optaplanner.core.api.score.Score;
import org.optaplanner.core.api.score.constraint.ConstraintMatchTotal;
import org.optaplanner.core.api.score.constraint.Indictment;
import org.optaplanner.core.impl.domain.variable.descriptor.VariableDescriptor;
import org.optaplanner.core.impl.score.director.ScoreDirector;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class WatchLengthListenerTest {

    private WatchLengthListener listener;
    private Character kitiara;
    private Character tanis;
    private Character laurana;

    @Before
    public void init() {

        listener = new WatchLengthListener();

        CharacterFactory characterFactory = new CharacterFactory();

        kitiara = characterFactory.getHuman("Kitiara uth Matar");
        tanis = characterFactory.getHalfElf("Tanis");
        laurana = characterFactory.getElf("Laurana");

    }

    @Test
    public void in_a_two_watches_plan_with_two_eight_sleeping_characters_listener_should_set_al_watch_length_to_eight_hours() {
        Plan plan = new Plan();

        plan.setCharacters(new HashSet<>());
        plan.getCharacters().add(kitiara);
        plan.getCharacters().add(tanis);

        Watch kitiarasWatch = Watch.builder()
                .order(1)
                .watchfulCharacter(kitiara)
                .build();

        Watch tanissWatch = Watch.builder()
                .order(2)
                .watchfulCharacter(tanis)
                .build();

        plan.setWatches(Arrays.asList(kitiarasWatch, tanissWatch));

        PlanScoreDirectorStub scoreDirector = new PlanScoreDirectorStub(plan);
        listener.fillWatchLengths(scoreDirector);

        assertEquals("Kitiara's watch should last all time Tanis is sleeping (360 minutes)", tanis.getRequiredSleepTime(), kitiarasWatch.getLength());
        assertEquals("Tanis's watch should last all time Kitiara is sleeping (480 minutes)", kitiara.getRequiredSleepTime(), tanissWatch.getLength());

    }

    @Test
    public void a_13_hours_configuration() {
        Plan plan = new Plan();

        plan.setCharacters(new HashSet<>());
        plan.getCharacters().add(kitiara);
        plan.getCharacters().add(tanis);
        plan.getCharacters().add(laurana);

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

        plan.setWatches(Arrays.asList(firstWatch, secondWatch, thirdWatch, fourthWatch));

        PlanScoreDirectorStub scoreDirectorStub = new PlanScoreDirectorStub(plan);
        listener.fillWatchLengths(scoreDirectorStub);

        assertEquals("First watch should last 180 mins", Integer.valueOf(180), firstWatch.getLength());
        assertEquals("Second watch should last 160 mins", Integer.valueOf(160), secondWatch.getLength());
        assertEquals("Third watch should last 240 mins", Integer.valueOf(240), thirdWatch.getLength());
        assertEquals("Fourth watch should last 180 mins", Integer.valueOf(180), fourthWatch.getLength());

    }
}

class PlanScoreDirectorStub implements ScoreDirector<Plan> {
    private Plan plan;

    PlanScoreDirectorStub(Plan plan) {
        this.plan = plan;
    }

    @Override
    public Plan getWorkingSolution() {
        return plan;
    }

    @Override
    public void setWorkingSolution(Plan plan) {
        this.plan = plan;
    }

    @Override
    public Score calculateScore() {
        return null;
    }

    @Override
    public boolean isConstraintMatchEnabled() {
        return false;
    }

    @Override
    public Collection<ConstraintMatchTotal> getConstraintMatchTotals() {
        return null;
    }

    @Override
    public Map<Object, Indictment> getIndictmentMap() {
        return null;
    }

    @Override
    public void beforeEntityAdded(Object o) {

    }

    @Override
    public void afterEntityAdded(Object o) {

    }

    @Override
    public void beforeVariableChanged(Object o, String s) {

    }

    @Override
    public void afterVariableChanged(Object o, String s) {

    }

    @Override
    public void beforeVariableChanged(VariableDescriptor variableDescriptor, Object o) {

    }

    @Override
    public void afterVariableChanged(VariableDescriptor variableDescriptor, Object o) {

    }

    @Override
    public void changeVariableFacade(VariableDescriptor variableDescriptor, Object o, Object o1) {

    }

    @Override
    public void triggerVariableListeners() {

    }

    @Override
    public void beforeEntityRemoved(Object o) {

    }

    @Override
    public void afterEntityRemoved(Object o) {

    }

    @Override
    public void beforeProblemFactAdded(Object o) {

    }

    @Override
    public void afterProblemFactAdded(Object o) {

    }

    @Override
    public void beforeProblemPropertyChanged(Object o) {

    }

    @Override
    public void afterProblemPropertyChanged(Object o) {

    }

    @Override
    public void beforeProblemFactRemoved(Object o) {

    }

    @Override
    public void afterProblemFactRemoved(Object o) {

    }

    @Override
    public <E> E lookUpWorkingObject(E e) {
        return null;
    }

    @Override
    public void close() {

    }
}