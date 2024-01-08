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
    <br>

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
    <br>

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

-   **Endpoint:** `/student/add_marks`
-   **Method:** `POST`
-   **Valid Terms:** `First`, `Second`, `Final`
-   **Valid Subjects:** `Bangla`, `English`, `Math`
-   **Description:** Add marks to the student collection.
-   **Body:**
    ```json
    {
        "marks": 10,
        "roll": 91,
        "class": 11,
        "term": "First",
        "subject": "Bangla"
    }
    ```
    <br>

### Get All Students Data with Marks

-   **Endpoint:** `/student/get_all_students_marks`
-   **Method:** `GET`
-   **Description:** Get all students data along with their marks in formatted way.
    <br><br>

### Get One Student's Data with Marks by ID

-   **Endpoint:** `/student/get_student_marks_by_id/:id`
-   **Method:** `GET`
-   **Description:** Get one student's data along with his/her marks in formatted way.
    <br><br>

### Get One Student's Data with Marks by Roll and Class

-   **Endpoint:** `/student/get_student_marks_by_roll_class/:roll/:class`
-   **Method:** `GET`
-   **Description:** Get one student's data along with his/her marks in formatted way.
    <br><br>

## Notes

-   Ensure to replace `:id`, `:roll`, and `:class` with the actual ID, roll number, and class values respectively when making requests. You can see the postman documentation for more clarifications.
