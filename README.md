# Night Watch Planner v0.0.2

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

curl command to test the endpoing:
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

## Rules
Optimizer follow this rules in order to find the best night watch plan:
  * Hard rules (for a plan to be feasible):
    * Plan has no empty watches.
    * There is no lazy characters.
  * Medium rules (very nice to have):
    * No solo watches.
  * Soft rules (nice to have):
    * No overloaded watches (more than two characters in the same watch).