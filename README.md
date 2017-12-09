# Night Watch Planner

Just a Night watch planner optimizer for use in RPGs like _[Pathfinder](http://paizo.com/pathfinder)_.

## Sample request

Sample Plan Request with this body:
```json
{
	"lengthOfWatch": 60,
	"maxWatches": 8,
	"party": [
		{
			"name": "Gandalf",
			"senses": ["Low light"],
			"requiredSleepTime": 480
		},
		{
			"name": "Legolas",
			"senses": ["Low light"],
			"requiredSleepTime": 240
		},
		{
			"name": "Gimli",
			"senses": ["Darkvision"],
			"requiredSleepTime": 480
		},
		{
			"name": "Boromir",
			"senses": ["Normal"],
			"requiredSleepTime": 480
		}
	]
}
```

```
curl --request POST \
  --url http://localhost:3000/v1/optimize \
  --header 'content-type: application/json' \
  --data '{
	"lengthOfWatch": 60,
	"maxWatches": 8,
	"party": [
		{
			"name": "Gandalf",
			"senses": ["Low light"],
			"requiredSleepTime": 480
		},
		{
			"name": "Legolas",
			"senses": ["Low light"],
			"requiredSleepTime": 240
		},
		{
			"name": "Gimli",
			"senses": ["Darkvision"],
			"requiredSleepTime": 480
		},
		{
			"name": "Boromir",
			"senses": ["Normal"],
			"requiredSleepTime": 480
		}
	]
}'
```

## Work in progress
Currently following steps in https://docs.optaplanner.org/7.3.0.Final/optaplanner-docs/html_single/index.html#cloudBalancingDomainModel

About solver config: https://docs.optaplanner.org/7.3.0.Final/optaplanner-docs/html_single/index.html#solverConfigurationByJavaAPI

About planning variables: https://docs.optaplanner.org/7.4.1.Final/optaplanner-docs/html_single/index.html#planningVariable

About chains:  https://docs.optaplanner.org/7.4.1.Final/optaplanner-docs/html_single/index.html#chainedPlanningVariable