package es.carloscasalar.nwp.usecase;

import es.carloscasalar.nwp.domain.Plan;
import es.carloscasalar.nwp.domain.PlanRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class GeneratePlan {

    public Plan execute(PlanRequest planRequest) {
        log.debug("Hello from GeneratePlan use case");
        Plan problem = new Plan(planRequest);

        SolverFactory<Plan> factory = SolverFactory
                .createFromXmlResource("NightWatchSolverConfig.xml");
        Solver<Plan> solver = factory.buildSolver();

        Plan optimizedPlan = solver.solve(problem);
        log.debug("Solved watches:", optimizedPlan.getWatches());
        return optimizedPlan;
    }
}
