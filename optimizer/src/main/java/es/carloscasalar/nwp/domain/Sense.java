package es.carloscasalar.nwp.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Relevant senses that allows a _PC_ to be aware of intruders at a relevant distance.
 */
public enum Sense {
  
  BLINDSIGHT("Blindsight"),
  
  DARKVISION("Darkvision"),
  
  LOW_LIGHT("Low light"),
  
  NORMAL("Normal"),
  
  SCENT("Scent");

  private String value;

  Sense(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static Sense fromValue(String text) {
    for (Sense b : Sense.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }
}

