# CHANGELOG

## v0.0.3 [WIP]

### Add
* Optimizer now try to find a plan where every character rest for the required sleep time.

## v0.0.2 2017-12-15

### Add
* Score calculator routine based in this easy (and elemental) rules:
  * Hard rules (for a plan to be feasible):
    * Plan has no empty watches.
    * There is no lazy characters.
  * Medium rules (very nice to have):
    * No solo watches.
  * Soft rules (nice to have):
    * No overloaded watches (more than two characters in the same watch).
### Modify
* `Plan` model has been modified. There are three value providers for watches.
* `Plan` is initialized with a `PlanRequest`.    

## v0.0.1 2017-07-27

### Add
* Add experimental model
