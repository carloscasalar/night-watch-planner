package es.carloscasalar.nwp.usecase;

import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
import es.carloscasalar.nwp.model.Watch;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;
import org.springframework.stereotype.Service;

import java.util.Comparator;

@Service
@AllArgsConstructor
@Slf4j
public class GeneratePlan {

    public Plan execute(PlanRequest planRequest) {
        log.debug("Hello from GeneratePlan use case");
        /*Set<Watch> watches = new HashSet<>();
        planRequest.getParty().forEach(character -> {
            Watch watch = Watch.builder()
                    .watchfulCharacter(character)
                    .build();
            watches.add(watch);
        });

        return new Plan(planRequest);
        */
        Plan problem = new Plan(planRequest);

        SolverFactory<Plan> factory = SolverFactory
                .createFromXmlResource("NightWatchSolverConfig.xml");
        Solver<Plan> solver = factory.buildSolver();

        Plan optimizedPlan = solver.solve(problem);
        log.debug("Solved watches:", optimizedPlan.getWatches());
        return optimizedPlan;
    }
}
