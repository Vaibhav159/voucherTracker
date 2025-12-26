# Voucher Backend

Backend for Voucher Tracker

[![Built with Cookiecutter Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg?logo=cookiecutter)](https://github.com/cookiecutter/cookiecutter-django/)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)

License: MIT

## Settings

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).

## Basic Commands

### Setting Up Your Users

- To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

- To create a **superuser account**, use this command:

      $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

### Type checks

Running type checks with mypy:

    $ mypy backend

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report:

    $ coverage run -m pytest
    $ coverage html
    $ open htmlcov/index.html

#### Running tests with pytest

    $ pytest

### Live reloading and Sass CSS compilation

Moved to [Live reloading and SASS compilation](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally.html#sass-compilation-live-reloading).

## Deployment

The following details how to deploy this application.

### Docker

See detailed [cookiecutter-django Docker documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html).

### Cosmos Server Deployment

1.  **Prepare Configuration**:
    -   Use `docker-compose.cosmos.yml`. This file removes Traefik (since Cosmos handles proxying) and exposes Nginx.
    -   Ensure `DJANGO_ALLOWED_HOSTS` includes your domain or `*` if relying on Cosmos Gateway for security.

2.  **Deploy in Cosmos**:
    -   Go to Cosmos Dashboard -> "New Application".
    -   Select "Docker Compose".
    -   Copy/Paste the content of `backend/docker-compose.cosmos.yml`.
    -   **Important**: You may need to adjust the `ports` section if port 80 is occupied, or let Cosmos manage the routing to the container's port 80.
    -   Add Environment Variables from `.envs/.production/.django` and `.envs/.production/.postgres` into the Cosmos UI if not using the file mount method.

### Local Development

1.  Build and run using Docker (Standard):
    ```bash
    docker-compose -f local.yml up --build
    ```
2.  Build and run using Docker (Cosmos Simulation):
    ```bash
    docker-compose -f docker-compose.cosmos.yml up --build
    ```
    (Access at http://localhost/api/health/)

3.  Access Health Check:
    Visit [http://localhost:8000/api/health/](http://localhost:8000/api/health/)

### Production Deployment

1.  On your server, clone the repo.
2.  Set environment variables in `.envs/.production/`.
3.  Build and run:
    ```bash
    docker-compose -f production.yml up -d --build
    ```
4.  Access Health Check at `http://<your-server-ip>:8000/api/health/`.

### Using `uv` (Non-Docker)

If you prefer running locally without Docker:

1.  Install dependencies:
    ```bash
    uv pip install -r requirements/local.txt
    ```
2.  Run migrations and server:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```
