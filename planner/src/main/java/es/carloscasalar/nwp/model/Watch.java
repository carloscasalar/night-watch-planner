package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

/**
 * Details of a watch.
 */

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-26T16:29:37.524Z")
@Data
@AllArgsConstructor
public class Watch {
    @JsonProperty("characters")
    @NotNull
    private List<String> characters;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Watch watch = (Watch) o;
        return Objects.equals(this.characters, watch.characters);
    }

    @Override
    public int hashCode() {
        return Objects.hash(characters);
    }

}

