# sprayer-app

This application is designed to help farmers record their sprayer usage on their mobile devices while out in a field, regardless of the reliability of their network connection.

## Setup For Development

1. Download and install Docker and Docker Compose.
2. Run `docker-compose up -d --build` (to put it up and rebuild it).
3. Run `docker-compose exec server python manage.py migrate`.
4. Run `docker-compose exec server python manage.py createsuperuser --email admin@example.com --username admin` and then it will prompt you for a password. For development, pick something easy like `admin` (and then approve using an insecure password).

The application is accessible in this development mode at [`http://localhost:3000/`](http://localhost:3000/).

The browsable API is also available at [`http://localhost:8000/api/`](http://localhost:8000/api/).

### Setup For Production or Testing Offline Capabilities

 1. Download and install Docker and Docker Compose.
 2. Open a terminal and navigate to the `sprayer-app` folder.
 3. Run `docker-compose up -d --build` (to create and build the client and the server Docker images).
 4. Run `docker-compose exec client yarn global add serve` (to install the `serve` appliation globally on the client container).
 5. Run `docker-compose exec client yarn build` (to create a production build of the application).
 6. Run `docker-compose exec client serve -s build -l 4000` (to start serving the newly creating production build).
 7. Run `docker-compose exec server python manage.py migrate` (to set up the database).
 8. Run `docker-compose exec server python manage.py createsuperuser --email admin@example.com --username admin` (to create the admin user which will allow access to the local system). It will prompt you for a password. For testing purposes, pick something easy like `admin` (and then approve using an insecure password by typing `y`). Note that you will need to use this password to access both the browsable API and the application.

The application should now be up and running.

The application is accessible in this production mode at http://localhost:4000/.

The browsable API is also available at http://localhost:8000/api/.

### Running and testing that the application works properly.

\* Disclaimer, these testing instructions were written for usage with the Chrome web browser.

1. Navigate to [http://localhost:8000/api/owners/](http://localhost:8000/api/owners/).
	- Login as the previously created admin user.
	- Note that there are zero owners created.
2. Navigate to [http://localhost:4000/record](http://localhost:4000/record).
	- Login as the previously created admin user.
	- Create an owner by typing in the `Owner` textfield and hitting enter.
3. Return to [http://localhost:8000/api/owners/](http://localhost:8000/api/owners/).
	- Refresh the page.
	- Notice that there is now one owner created.
4. Return to [http://localhost:4000/record](http://localhost:4000/record).
	- Open the Chrome developer tools (Crtl+Shift+I --or-- Settings > More tools > Developer tools).
	- Navigate to the `Application` tab.
	- Under `Application`, select the `Service Workers`
![enter image description here](https://lh3.googleusercontent.com/r2ImkqBjYPRfcmuLVmqPCBe6nTfp5WHWOtArSmd6NH74sVWflmguevDNTf4Kv8Z2rZqRHC0jjvEkQw "Developer Tools Menu")
	- Check the `Offline` option. This will make the current tab bahave as if it were offline.
	- Refresh the webpage. Nothing on the page should change, showing that the webpage stays loaded while offline.
	- Create another owner by typing in the `Owner` textfield and hitting enter.
5. Return to [http://localhost:8000/api/owners/](http://localhost:8000/api/owners/).
	- Refresh the page.
	- Notice that there is still just one owner created.
6. Return to [http://localhost:4000/record](http://localhost:4000/record).
	- In the Chrome Developer tools > Application > Service Worker panel, uncheck the `Offline` option. This will return the webpage to being online. In the background, the request to create an owner will be sent automatically.
7. Return to [http://localhost:8000/api/owners/](http://localhost:8000/api/owners/).
	- Refresh the page.
	- Notice that there are now two owners created.
