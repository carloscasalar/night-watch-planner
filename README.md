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
  --data '{\n	"lengthOfWatch": 60,\n	"maxWatches": 8,\n	"party": [\n		{\n			"name": "Gandalf",\n			"senses": ["Low light"],\n			"requiredSleepTime": 480\n		},\n		{\n			"name": "Legolas",\n			"senses": ["Low light"],\n			"requiredSleepTime": 240\n		},\n		{\n			"name": "Gimli",\n			"senses": ["Darkvision"],\n			"requiredSleepTime": 480\n		},\n		{\n			"name": "Boromir",\n			"senses": ["Normal"],\n			"requiredSleepTime": 480\n		}\n	]\n}'
```

## Work in progress
Currently following steps in https://docs.optaplanner.org/7.3.0.Final/optaplanner-docs/html_single/index.html#cloudBalancingDomainModel

About solver config: https://docs.optaplanner.org/7.3.0.Final/optaplanner-docs/html_single/index.html#solverConfigurationByJavaAPI