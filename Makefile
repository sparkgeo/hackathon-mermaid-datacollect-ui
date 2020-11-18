.PHONY: build

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
	npm run cors

logs:
	docker-compose logs -f webapp

fresh_install: kill
	make build
	make start
	sleep 10
	make cors
	open http://localhost:3001/

# build-prod:
# 	docker-compose -f docker-compose.prod.yml build

# start-prod:
# 	docker-compose -f docker-compose.prod.yml up -d --build

# stop-prod:
# 	docker-compose -f docker-compose.prod.yml stop
