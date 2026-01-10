# Makefile for Voucher Tracker

# Default target: show help
.DEFAULT_GOAL := help

# ==========================================
#  🚀 DEPLOYMENT COMMANDS
# ==========================================

.PHONY: deploy
deploy: pull down up migrate ## Full Release: Pulls images, restarts containers, and migrates DB
	@echo "✅ Deployment complete!"

.PHONY: quick-deploy
quick-deploy: pull up migrate ## Fast Release: Updates containers without tearing them completely down

# ==========================================
#  🐳 DOCKER CONTROLS
# ==========================================

.PHONY: pull
pull:
	docker compose pull

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: restart
restart: down up

.PHONY: logs
logs: ## View logs (Ctrl+C to exit)
	docker compose logs -f

# ==========================================
#  🐍 DJANGO / APP MANAGEMENT
# ==========================================

.PHONY: migrate
migrate: ## Run standard and custom migrations
	@echo "🗄️  Migrating Database..."
	docker compose exec django python manage.py migrate
	@echo "📚 Migrating Guides..."
	docker compose exec django python manage.py migrate_guides

.PHONY: seed
seed: ## Run the seed_cards command
	docker compose exec django python manage.py seed_cards

.PHONY: bash
bash: ## Access the container shell (replaces 'docker exec -it...')
	docker compose exec django bash

.PHONY: dshell
dshell: ## Access the Django Python shell
	docker compose exec django python manage.py shell

# ==========================================
#  ❓ HELP
# ==========================================

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
