# course-manager
An application for an Admin in a University to manually choose courses for students.

*There are 4 branch ( main, dev, test and docker)*

To run the application (main branch) please use the following commands:

1. >docker build -t "vue-app" ./client/

2. >docker build -t "server-app" ./server/

3. >docker-compose up

For testing purpose you have to use the testing branch and then run the following commands:

***MongoDB must be installed for test to run*

1. >git checkout test

2. >cd server

2. >npm install

2. >npm test

<br>


**Please register as a new user to be able to login OR use the following credentials**


*Email*
```
admin@xyz.com
```
*Password*
```
Admin@123
```
<br>

Here, some of the use cases include:

1. Return the list of students, optionally with pagination
2. Display the list of students
3. Upon click on the list item, display the selected courses for that specific student
4. Also, add the option to choose some courses for that student
5. There is also the option to remove courses
6. New user can be created
7. User has to login to get access

The application will be running on: 
```
localhost:8080
```