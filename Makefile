.PHONY: build

# https://mherman.org/blog/dockerizing-a-react-app/
# https://dev.to/igmrrf/docker-react-exited-with-code-0-398n

build:
	docker-compose build

start:
	docker-compose up -d 

stop:
	docker-compose stop

logs:
	docker-compose logs -f 

fresh_install:
	make build
	make start

# build-prod:
# 	docker-compose -f docker-compose.prod.yml build

# start-prod:
# 	docker-compose -f docker-compose.prod.yml up -d --build

# stop-prod:
# 	docker-compose -f docker-compose.prod.yml stop
