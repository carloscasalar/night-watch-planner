package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;

/**
 * Body of a plan request.
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-26T16:29:37.524Z")
@AllArgsConstructor
@Data
public class PlanRequest {
    @JsonProperty("lengthOfWatch")
    @NotNull
    @Min(1)
    private Integer lengthOfWatch;

    @JsonProperty("maxWatchs")
    @NotNull
    @Min(1)
    private Integer maxWatchs;

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
    private List<Character> party;


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PlanRequest planRequest = (PlanRequest) o;
        return Objects.equals(this.lengthOfWatch, planRequest.lengthOfWatch) &&
                Objects.equals(this.maxWatchs, planRequest.maxWatchs) &&
                Objects.equals(this.firstNightWatch, planRequest.firstNightWatch) &&
                Objects.equals(this.lastNightWatch, planRequest.lastNightWatch) &&
                Objects.equals(this.party, planRequest.party);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lengthOfWatch, maxWatchs, firstNightWatch, lastNightWatch, party);
    }

}

