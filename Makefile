# https://mherman.org/blog/dockerizing-a-react-app/

build-dev:
	docker-compose build
	# docker build -t sample:dev .

start-dev:
	docker-compose up -d
	# docker run \
  #   -it \
  #   --rm \
  #   -v ${PWD}:/app \
  #   -v /app/node_modules \
  #   -p 3001:3000 \
  #   -e CHOKIDAR_USEPOLLING=true \
  #   sample:dev

stop-dev:
	docker-compose stop

build-prod:
	docker-compose -f docker-compose.prod.yml build

start-prod:
	docker-compose -f docker-compose.prod.yml up -d --build

stop-prod:
	docker-compose -f docker-compose.prod.yml stop
