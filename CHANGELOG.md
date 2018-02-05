# CHANGELOG

## v0.0.3 2018-02-05

### Modified
* Plan request contains maximum total time instead of maximum number of watches.
* Plan is initialized with a number of watches equal to the minimum character sleep hours 
  time plus the maximum required character sleep time.
* Solver max time is now 10 seconds.   

### Add
* All non lazy characters sleep at minimum their required sleep time in all found solutions.
* New hard rules:
  * Total time spent is not greater than the one specified in plan request.
* New medium rules:
  * Oversleep time penalizes. -1 point for each 30 minutes of oversleep time.  

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
