package es.carloscasalar.nwp.usecase;

import es.carloscasalar.nwp.model.Plan;
import es.carloscasalar.nwp.model.PlanRequest;
import es.carloscasalar.nwp.model.Watch;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class GeneratePlan {

    public Plan execute(PlanRequest planRequest) {
        log.debug("Hello from GeneratePlan use case");
        List<Watch> watchs = new ArrayList<Watch>();
        planRequest.getParty().forEach(character -> {

            List<String> characters = new ArrayList<String>();
            characters.add(character.getName());
            Watch watch = new Watch(characters, new ArrayList<>());
            watchs.add(watch);
        });
        Plan plan = new Plan(watchs, new ArrayList<>());
        return plan;
    }
}
