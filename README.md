## Mermaid Form Starter UI

Built using create-react-app. 


This is a setup for a form that can be used for validation. 


## Feature Toggles

There is a toggle in the environment .env file which controls which environment is being run. 


### Acceptable REACT_APP_API_MODE Values

- "amplify"


## Prerequisites

- Docker (https://docs.docker.com/engine/install/)
- docker-compose (https://docs.docker.com/compose/install/)


## Environment Variables

Copy the following into a `.env` file (see `.env_sample`)

`cp .env_sample .env`


## Spin up local development (from scratch)

`make fresh_install`
or 
`make build && make start`


## Access psql

`make psql`
or 
```
http://localhost:5050

user/ admin
password/ admin
```
