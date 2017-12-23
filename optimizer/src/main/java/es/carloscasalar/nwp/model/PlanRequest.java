package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * Body of a plan request.
 */
@AllArgsConstructor
@Data
@Builder
public class PlanRequest {
    @JsonProperty("lengthOfWatch")
    @NotNull
    @Min(1)
    private Integer lengthOfWatch;

    @JsonProperty("maxTotalTimeSpent")
    @NotNull
    @Min(60)
    private Integer maxTotalTimeSpent;

    @JsonProperty("firstNightWatch")
    @Min(1)
    private Integer firstNightWatch;

    @JsonProperty("lastNightWatch")
    @Min(1)
    private Integer lastNightWatch;

    @JsonProperty("party")
    @NotNull
    @Valid
    @Size(min = 1)
    private Set<Character> party;
}

