# Student Management API

## Introduction

This API provides functionality to manage student records, including adding, retrieving, updating, and deleting student information, using Express.js, Mongoose, MongoDB, and the MVC design pattern.
<br><br>

## How To Run

Run the following command

```bash
npm start
```

<br>

## Base URL

All endpoints are relative to the base URL: `http://localhost:5000`
<br><br>

## Endpoints

### Get all Students

-   **Endpoint:** `/student/get_all_students`
-   **Method:** `GET`
-   **Description:** Retrieve a list of all students.
    <br><br>

### Add a Student

-   **Endpoint:** `/student/add_student`
-   **Method:** `POST`
-   **Description:** Add a new student to the database.
-   **Body:**
    ```json
    {
        "fullName": "Rahat Khan",
        "class": 11,
        "roll": 55,
        "section": "C"
    }
    ```
    <br><br>

### Get Student by Roll and Class

-   **Endpoint:** `/student/get_student_by_roll_class/:roll/:class`
-   **Method:** `GET`
-   **Description:** Retrieve a student by roll and class.
    <br><br>

### Update Student by ID

-   **Endpoint:** `/student/update_student_by_id/:id`
-   **Method:** `PUT`
-   **Description:** Update a student's information by ID.
-   **Body:**
    ```json
    {
        "fullName": "Rahat Khan",
        "class": 11,
        "roll": 55,
        "section": "C"
    }
    ```
    <br><br>

### Get Student by ID

-   **Endpoint:** `/student/get_student_by_id/:id`
-   **Method:** `GET`
-   **Description:** Retrieve a student by ID.
    <br><br>

### Delete Student by ID

-   **Endpoint:** `/student/delete_student_by_id/:id`
-   **Method:** `DELETE`
-   **Description:** Delete a student by ID.
    <br><br>

### Delete Student by Roll and Class

-   **Endpoint:** `/student/delete_student_by_roll_class/:roll/:class`
-   **Method:** `DELETE`
-   **Description:** Delete a student by roll and class.
    <br><br>

### Add Marks

-   **Endpoint:** `/marks/add_marks`
-   **Method:** `POST`
-   **Description:** Add new marks to the database. Add reference of the marks to student collection.
-   **Body:**
    ```json
    {
        "marks": 65,
        "term": "Final",
        "subject": "Bangla",
        "studentClass": 9,
        "studentRoll": 29,
        "studentRef": "659b8fe9a07f6fc0ba3b5651"
    }
    ```
    <br><br>

### Delete Marks by ID

-   **Endpoint:** `/marks/delete_marks_by_id/:id`
-   **Method:** `DELETE`
-   **Description:** Delete marks by id and remove the reference from the student collection.
    <br><br>

## Notes

-   Ensure to replace `:id`, `:roll`, and `:class` with the actual ID, roll number, and class values respectively when making requests. You can see the postman documentation for more clarifications.
