package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Details of a watch.
 */

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-26T16:29:37.524Z")
@Data
@AllArgsConstructor
public class Watch {
    @JsonProperty("sleepingCharacters")
    @NotNull
    private List<String> sleepingCharacters;

    @JsonProperty("watchfulCharacters")
    @NotNull
    private List<String> watchfulCharacters;
}

