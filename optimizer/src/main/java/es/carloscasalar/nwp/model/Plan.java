package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

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

    @JsonProperty("watchSummary")
    @NotNull
    @Valid
    private List<CharacterWatchSummary> watchSummary;
}

