# Night Watch Planner v0.1.0 [![CircleCI](https://circleci.com/gh/carloscasalar/night-watch-planner/tree/master.svg?style=svg)](https://circleci.com/gh/carloscasalar/night-watch-planner/tree/master)

Just a Night watch planner optimizer for use in RPGs like _[Pathfinder](http://paizo.com/pathfinder)_.

## Sample request

Sample Plan Request with this body:
```json
{
	"maxTotalTimeSpent": 720,
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

curl command to test the endpoin:
```
curl --request POST \
  --url http://localhost:3000/v1/optimize \
  --header 'content-type: application/json' \
  --data '{
	"maxTotalTimeSpent": 720,
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
    * Total time spent should be less than maximum in specified in plan request.
  * Medium rules (very nice to have):
    * No solo watches.
    * No oversleeping time.
  * Soft rules (nice to have):
    * No overloaded watches (more than two characters in the same watch).

## Docker Setup

### Running with Docker Compose

The application can be run using Docker Compose, which orchestrates both the backend optimizer and the React client:

```bash
# Build and start both services
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```

This will:
- Start the optimizer backend on `http://localhost:3000`
- Start the React client on `http://localhost:8080`
- Configure CORS to allow the client to communicate with the backend

Access the application at: `http://localhost:8080`

To stop the services:
```bash
docker compose down
```

### Individual Services

You can also build and run services individually:

```bash
# Build only the client
docker compose build client

# Build only the optimizer
docker compose build optimizer

# Run a specific service
docker compose up client
```

## Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/carloscasalar/night-watch-planner)
