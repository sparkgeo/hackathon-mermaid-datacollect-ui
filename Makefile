.PHONY: build

# https://mherman.org/blog/dockerizing-a-react-app/
# https://dev.to/igmrrf/docker-react-exited-with-code-0-398n

build:
	npm run build

start:
	docker-compose up -d 

stop:
	docker-compose down

kill:
	docker-compose down -v
	rm -fr node_modules
	rm -fr build

logs:
	docker-compose logs -f webapp

fresh_install: kill
	make build
	make start

# build-prod:
# 	docker-compose -f docker-compose.prod.yml build

# start-prod:
# 	docker-compose -f docker-compose.prod.yml up -d --build

# stop-prod:
# 	docker-compose -f docker-compose.prod.yml stop
