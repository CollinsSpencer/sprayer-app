# sprayer-app

This application is designed to help farmers record their sprayer usage on their mobile devices while out in a field, regardless of the reliability of their network connection.

## Setup

1. Download and install Docker.
2. Run `docker-compose up -d --build` (to put it up and rebuild it).
3. Run `docker-compose exec server python manage.py migrate`.
4. Run `docker-compose exec server python manage.py createsuperuser --email admin@example.com --username admin` and then it will prompt you for a password. For development, pick something easy like `admin` (and then approve using an insecure password).

The application is accessible in this development mode at [`http://localhost:3000/`](http://localhost:3000/).

The browsable API is also available at [`http://localhost:8000/api/`](http://localhost:8000/api/).
