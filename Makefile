.PHONY: all build-frontend build-backend run clean

all: build-frontend build-backend

build-frontend:
	cd frontend && npm install && npm run build

build-backend:
	cd backend && go build -o server

run:
	cd backend && ./server

clean:
	rm -rf backend/static
	rm -f backend/server