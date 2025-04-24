.PHONY: all build-frontend build-backend run clean dev-frontend dev-backend dev

all: build-frontend build-backend

build-frontend:
	cd frontend && npm install && npm run build

build-backend:
	cd backend && go build -o server

run:
	cd backend && ./server

# Development commands
dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && go run main.go

dev:
	@echo "Starting backend and frontend in development mode"
	@echo "Backend: http://localhost:8180"
	@echo "Frontend: http://localhost:5173"
	@echo "Use Ctrl+C to stop both servers"
	$(MAKE) -j 2 dev-backend dev-frontend

clean:
	rm -rf backend/dist
	rm -f backend/server