.PHONY: build

# -----------------------------------------------------------------
# FRONTEND
# -----------------------------------------------------------------

# https://mherman.org/blog/dockerizing-a-react-app/
# https://dev.to/igmrrf/docker-react-exited-with-code-0-398n

build:
	docker-compose build

start:
	docker-compose up -d 

stop:
	docker-compose down

kill:
	docker-compose down -v
	rm -fr node_modules
	rm -fr build

cors: 
	docker-compose exec pouchdb-app sh -c "npm run cors"

logs:
	docker-compose logs -f amplify-app pouchdb-app

fresh_install: kill
	make build
	make start
	sleep 10
	make setup_db
	make cors
	make open_apps

open_pouchapp:
	open http://localhost:3001/

open_amplifyapp:
	open http://localhost:3002/

open_couchadmin:
	open http://localhost:5984/_utils/

open_etlapi:
	open http://localhost:8080/docs/

open_pgadmin:
	open http://localhost:5050/

open_apps: open_pouchapp open_amplifyapp open_couchadmin open_etlapi open_pgadmin


# build-prod:
# 	docker-compose -f docker-compose.prod.yml build

# start-prod:
# 	docker-compose -f docker-compose.prod.yml up -d --build

# stop-prod:
# 	docker-compose -f docker-compose.prod.yml stop


# -----------------------------------------------------------------
# BACKEND
# -----------------------------------------------------------------

SHELL=/bin/bash

setup_db:
	# docker-compose up -d
	docker-compose logs -f couchdb_available_monitor
	@echo "### Don't worry about duplicate errors if you have already created this couch database"
	curl -X PUT 'http://admin:password@localhost:5984/mermaid' -d '{"id":"mermaid","name":"mermaid"}'
	docker-compose logs -f api_db_migration_monitor
	docker cp api_db_pgadmin/pgadmin4-servers.json api_db_pgadmin:/tmp/pgadmin4-servers.json
	docker exec -it api_db_pgadmin /bin/sh -c "python setup.py --load-servers /tmp/pgadmin4-servers.json --user admin"

psql:
	docker-compose exec -it postgresdb /bin/bash -c "PGPASSWORD=${POSTGRES_PASS} psql -U postgres -h localhost mermaid"

generate-migration:
	docker-compose exec api_db_etl alembic -c /app/migrations/alembic.ini revision --autogenerate

new-migration:
	docker-compose exec api_db_etl alembic -c /app/migrations/alembic.ini revision

apply-migration:
	docker-compose exec api_db_etl alembic -c /app/migrations/alembic.ini upgrade head
