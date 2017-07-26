package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

/**
 * Night watch plan
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-26T16:29:37.524Z")
@AllArgsConstructor
@Data
public class Plan {
    @JsonProperty("watchs")
    @NotNull
    @Valid
    private List<Watch> watchs;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Plan plan = (Plan) o;
        return Objects.equals(this.watchs, plan.watchs);
    }

    @Override
    public int hashCode() {
        return Objects.hash(watchs);
    }
}

