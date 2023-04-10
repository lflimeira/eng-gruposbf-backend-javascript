up: service domains

dev: service domains-dev

service:
	docker-compose up -d currency-exchange

domains:
	docker-compose up -d domains

domains-dev:
	docker-compose up -d domains-dev

