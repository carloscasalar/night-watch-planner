package es.carloscasalar.nwp.rest;

import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
import es.carloscasalar.nwp.usecase.GeneratePlan;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(path = "/v1/optimize")
@AllArgsConstructor
public class PlanController {

    private GeneratePlan generatePlan;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Plan> optimize(@RequestBody PlanRequest planRequest) {
        Plan plan = generatePlan.execute(planRequest);

        return new ResponseEntity<Plan>(plan, HttpStatus.OK);
    }
}
