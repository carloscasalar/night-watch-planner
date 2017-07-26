package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;

/**
 * Character
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-26T16:29:37.524Z")
@AllArgsConstructor
@Data
public class Character {
    @JsonProperty("name")
    @NotNull
    private String name;

    @JsonProperty("senses")
    @NotNull
    @Size(min = 1)
    private List<Sense> senses;

    @JsonProperty("requiredSleepTime")
    @Min(1)
    private Integer requiredSleepTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Character character = (Character) o;
        return Objects.equals(this.name, character.name) &&
                Objects.equals(this.senses, character.senses) &&
                Objects.equals(this.requiredSleepTime, character.requiredSleepTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, senses, requiredSleepTime);
    }

}

