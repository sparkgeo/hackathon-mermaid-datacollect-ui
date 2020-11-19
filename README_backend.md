Hackathon Mermaid ETL
---------------------


_Part of the MERMAID Replugged project_


## Prerequisites

- Docker (https://docs.docker.com/engine/install/)
- docker-compose (https://docs.docker.com/compose/install/)



## Environment Variables

Copy the following into a `.env` file (see `.env_sample`)

`cp .env_sample .env`

## Spin up local development


Start CouchDB and PostgreSQL databases

`make build && make start_db`

Stop CouchDB and PostgreSQL databases

`make stop_db`

Load CouchDB admin page in browser

```
make fauxton

user/ admin
password/ password

```

Access psql

```
make psql

```
or 
```
http://localhost:5050

user/ admin
password/ admin
```



