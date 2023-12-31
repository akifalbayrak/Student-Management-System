// //  Example courses
// const courses_json = [
//         {
//             id: 1,
//             courseName: "Database Management Systems",
//             base: 7,
//             students: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
//         },
//         {
//             id: 2,
//             courseName: "Web Development and Programming",
//             base: 7,
//             students: [3, 2, 7],
//         },
//         {
//             id: 3,
//             courseName: "Computer Networks",
//             base: 7,
//             students: [1, 6],
//         },
//         {
//             id: 4,
//             courseName: "Natural Language Processing",
//             base: 7,
//             students: [5],
//         },
// ];

// // Default Students
// const students_json = [
//         {
//             id: 1,
//             name: "ezel",
//             surname: "Bayraktar",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 92,
//                     final: 92,
//                     mark: "B",
//                 },
//                 {
//                     id: 3,
//                     midterm: 70,
//                     final: 70,
//                     mark: "D",
//                 },
//             ],
//         },
//         {
//             id: 2,
//             name: "Kenan",
//             surname: "Birkan",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 95,
//                     final: 95,
//                     mark: "A",
//                 },
//                 {
//                     id: 2,
//                     midterm: 50,
//                     final: 50,
//                     mark: "F",
//                 },
//             ],
//         },
//         {
//             id: 3,
//             name: "Kaya",
//             surname: "Erk",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 50,
//                     final: 50,
//                     mark: "F",
//                 },
//                 {
//                     id: 2,
//                     midterm: 80,
//                     final: 80,
//                     mark: "C",
//                 },
//             ],
//         },
//         {
//             id: 4,
//             name: "Eyşan",
//             surname: "Tezcan",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 92,
//                     final: 92,
//                     mark: "B",
//                 },
//             ],
//         },
//         {
//             id: 5,
//             name: "Cengiz",
//             surname: "Atay",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 70,
//                     final: 70,
//                     mark: "D",
//                 },
//                 {
//                     id: 4,
//                     midterm: 89,
//                     final: 83,
//                     mark: "B",
//                 },
//             ],
//         },
//         {
//             id: 6,
//             name: "ramiz",
//             surname: "karaeski",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 65,
//                     final: 65,
//                     mark: "F",
//                 },
//                 {
//                     id: 3,
//                     midterm: 100,
//                     final: 100,
//                     mark: "A",
//                 },
//             ],
//         },
//         {
//             id: 7,
//             name: "bahar",
//             surname: "tezcan",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 69,
//                     final: 69,
//                     mark: "F",
//                 },
//                 {
//                     id: 2,
//                     midterm: 95,
//                     final: 95,
//                     mark: "A",
//                 },
//             ],
//         },
//         {
//             id: 8,
//             name: "ömer",
//             surname: "uçar",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 71,
//                     final: 71,
//                     mark: "D",
//                 },
//             ],
//         },
//         {
//             id: 9,
//             name: "temmuz",
//             surname: "assasin",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 79,
//                     final: 79,
//                     mark: "C",
//                 },
//             ],
//         },
//         {
//             id: 10,
//             name: "tevfik",
//             surname: "zaim",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 86,
//                     final: 86,
//                     mark: "B",
//                 },
//             ],
//         },
//         {
//             id: 11,
//             name: "şebo",
//             surname: "zaim",
//             takingCourses: [
//                 {
//                     id: 1,
//                     midterm: 89,
//                     final: 89,
//                     mark: "B",
//                 },
//             ],
//         },
// ];

// Variable Declarations:

// Track course ID generation
let courseID = 1;

// Store selected student and course details
let selectedStudent = null;
let selectedCourse = null;

// Track student search results
let foundStudent = null;

// Flag for course editing mode
let courseEdit = false;

// References to HTML elements:

// Forms for student search
let studentNameSearchForm = document.getElementById("search-student-byname");

// Input fields for student search
let studentSearchInput = document.getElementById("search-bar");
let studentNameSearchInput = document.getElementById("search-bar-byname");

// Element for displaying all student information
const showAllstudents = document.getElementById("all-students");

// Input fields for student and course data
let idInput = document.getElementById("id");
let nameInput = document.getElementById("name");
let surnameInput = document.getElementById("surname");
let midtermInput = document.getElementById("midterm-score");
let finalInput = document.getElementById("final-score");
let courseNameInput = document.getElementById("course-name");

// Radio buttons for number base selection
let base7Radio = document.getElementById("base7");
let base10Radio = document.getElementById("base10");

// Course selector element
let courseSelector = document.getElementById("courses");

// Empty option for course selector
const emptyCourseOption = document.getElementById("empty-option");

// Forms for adding courses and students
const addCourseForm = document.getElementById("add-course");
const addStudentForm = document.getElementById("add-student");

// Tables to display student, course, and course-student details
const studentDetailsTable = document.getElementById("students-table");
const courseDetailsTable = document.getElementById("course-detail-table");
const courseStudentDetailsTable = document.getElementById(
    "course-student-detail-table"
);

// Element for selecting course details
const courseDetailsSelect = document.getElementById("course-details");

// Determine selected number base (default to base 10)
const baseVal = parseInt(
    document.querySelector('input[name="base"]:checked')?.value || 10
);
// Arrays to store student objects based on their pass/fail status:
let failedStudents = []; // Array to store students who have failed a course
let passedStudents = []; // Array to store students who have passed a course

// Arrays to store course and student objects:
let courses = []; // Array to store course objects
let students = []; // Array to store student objects

// Function to calculate a student's overall mark and grade:
const calculateMark = (midterm, final, base) => {
    // Calculate the overall score based on midterm and final weights:
    const score = midterm * 0.4 + final * 0.6;

    // Determine the grade based on the score and the specified number base:
    if (base == 10) {
        // Grade cutoffs for base 10:
        if (score >= 90) {
            return "A";
        } else if (score >= 80) {
            return "B";
        } else if (score >= 70) {
            return "C";
        } else if (score >= 60) {
            return "D";
        } else {
            return "F";
        }
    } else if (base == 7) {
        // Grade cutoffs for base 7:
        if (score >= 93) {
            return "A";
        } else if (score >= 85) {
            return "B";
        } else if (score >= 77) {
            return "C";
        } else if (score >= 70) {
            return "D";
        } else {
            return "F";
        }
    }
};

// Event listeners for course form:

addCourseForm.addEventListener("submit", (event) => {
    // Prevent default form submission
    event.preventDefault();
    // If input is valid:
    if (isCourseFormValid()) {
        // Check for duplicate course name:
        if (findCourseByName(courseNameInput)) {
            showAlert("This course already exists.");
        } else {
            // Handle course addition or editing:
            if (courseEdit) {
                updateCourse();
                updateCourseDetails();
                updateCourseStudentDetails();
                courseEdit = false; // Exit editing mode
                courseSelector.disabled = false;
            } else {
                addCourse();
                showAlert("Course successfully added.");
            }
        }
    }
    removeInput(); // Clear input fields
    saveCourses();
});

// Event listeners for student form:

addStudentForm.addEventListener("submit", (event) => {
    // Prevent default form submission
    event.preventDefault();

    if (courseSelector.value != emptyCourseOption.value) {
        // Check if the student form is valid
        if (isStudentFormValid()) {
            // Try to find an existing student with the entered ID
            let student = findStudent(idInput.value);

            // Handle different scenarios based on whether a student is selected and whether they already exist:
            if (selectedStudent === null) {
                // No student is currently selected:
                if (student) {
                    // Student exists:
                    if (studentTakingCourse(student.id)) {
                        // Student is already taking the course:
                        updateStudentMarks(student); // Update their marks
                        showAlert("Student marks updated.");
                    } else {
                        // Add the student to the course:
                        addNewCourseToStudent(student);
                        showAlert("Student added to course.");
                        clearTable(studentDetailsTable);
                    }
                } else {
                    // Student doesn't exist, create a new one:
                    addStudent();
                    showAlert("Student added to course.");
                }
            } else {
                // A student is selected, update their information:
                updateStudent(selectedStudent);
                showAlert("Student updated.");
                idInput.disabled = false;
                nameInput.disabled = false;
                surnameInput.disabled = false;
                courseSelector.disabled = false;
                selectedStudent = null; // Clear the selection
                clearTable(studentDetailsTable); // Clear any student details display
            }
            // Update course and course student details regardless of the scenario:
            updateCourseDetails();
            updateCourseStudentDetails();
        } else {
            // Form is not valid, display an error message:
            showAlert("Please fill all the necessary fields");
        }

        // Clear input fields after submission:
        removeInput();
    } else {
        showAlert("Please select course");
    }
    saveStudents();
    saveCourses();
});

// Event listeners for student search with id and name or surname form:
studentNameSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearTable(studentDetailsTable);

    let studentsName = studentNameSearchInput.value.toLowerCase().trim();

    // Check if the input is a number (assumed to be an ID)
    if (!isNaN(studentsName)) {
        // Use part 2 for ID search
        if (studentsName != "") {
            foundStudent = findStudent(studentsName);
            if (foundStudent) {
                if (foundStudent.takingCourses.length > 0) {
                    viewStudent(foundStudent);
                    clearTable(courseStudentDetailsTable);
                    clearTable(courseDetailsTable);
                } else {
                    showAlert("This student doesn't have any courses");
                }
            } else {
                showAlert(
                    "No student found with id " + studentSearchInput.value
                );
            }
            studentSearchInput.value = "";
        } else {
            showAlert("Enter valid id");
        }
    } else {
        // Use part 1 for name search
        if (studentsName.length != 0) {
            let allstudents = [];
            allstudents = findStudentName(studentsName);
            if (allstudents != null) {
                allstudents.map((st) => {
                    // console.log(st)
                    if (st.takingCourses.length > 0) {
                        viewStudent(st);
                        clearTable(courseStudentDetailsTable);
                        clearTable(courseDetailsTable);
                    } else {
                        showAlert("This student doesn't have any courses");
                    }
                });
            } else {
                showAlert(
                    "No student found with name " + studentNameSearchInput.value
                );
            }
            studentNameSearchInput.value = "";
        } else {
            showAlert("Enter valid name and surname");
        }
    }
});

// Displaying all students
let toggleAllStudents = true;
showAllstudents.addEventListener("click", () => {
    if (toggleAllStudents) {
        showAllstudents.innerText = "Close All Students";
        clearTable(studentDetailsTable);
        clearTable(courseDetailsTable);
        clearTable(courseStudentDetailsTable);
        students.map((student) => {
            viewStudent(student);
        });
    } else {
        showAllstudents.innerText = "Show All Students";
        clearTable(studentDetailsTable);
        clearTable(courseDetailsTable);
        clearTable(courseStudentDetailsTable);
    }

    toggleAllStudents = !toggleAllStudents;
});

// Choosing course
courseSelector.addEventListener("change", (e) => {
    selectedCourse = findCourseByName(e.target.value);
    if (selectedCourse != emptyCourseOption) {
        updateCourseDetails();
        updateCourseStudentDetails();
    } else {
        clearTable(studentDetailsTable);
        clearTable(courseStudentDetailsTable);
    }
});

// when enter text to id input it will try every key down to find student with this text
idInput.addEventListener("change", (event) => {
    if (findStudent(event.target.valueAsNumber)) {
        let student = findStudent(event.target.valueAsNumber);
        (nameInput.value = student.name),
            (surnameInput.value = student.surname);
        document.getElementById("name").disabled = true;
        document.getElementById("surname").disabled = true;
    } else {
        document.getElementById("name").disabled = false;
        document.getElementById("surname").disabled = false;
        nameInput.value = "";
        surnameInput.value = "";
    }
});

// when course details options is changed with another this will update table
courseDetailsSelect.addEventListener("change", () => {
    updateCourseStudentDetails();
    updateCourseDetails();
});

// default course class
class Course {
    constructor(id, courseName, base) {
        this.id = id; // unique course id
        this.courseName = courseName; // course name
        this.base = base;
        this.students = []; // student ids who are taking the course
        let newOption = new Option(courseName, courseName); // create a new option with a name and value is equal to the course name
        courseSelector.add(newOption, undefined); // add the new option to the course selector
        newOption.selected = true; // select the new option
    }
}

// course adding function
const addCourse = () => {
    const newCourse = new Course(courseID, courseNameInput.value, baseVal); // create a new course
    selectedCourse = newCourse; // update the selected course
    courseID++; // increse the course id
    courses.push(newCourse); // push the new course to the courses list
    // Update course and course student details regardless of the scenario:
    updateCourseDetails();
    updateCourseStudentDetails();
};

// student creating class
class Student {
    constructor(id, name, surname, midterm, final) {
        this.id = id; // unique student id
        this.name = name; // student name
        this.surname = surname; // student surname
        this.takingCourses = [
            // courses that student is taking
            {
                id: selectedCourse.id, // course id
                midterm: midterm, // student's midtems score of the selected course
                final: final, // student's final score of the selected course
                mark: calculateMark(midterm, final, selectedCourse.base), // student's mark of the selected course
            },
        ];
    }
}

// student adding function
const addStudent = () => {
    const newStudent = new Student(
        idInput.valueAsNumber,
        nameInput.value,
        surnameInput.value,
        midtermInput.valueAsNumber,
        finalInput.valueAsNumber
    );
    selectedCourse.students.push(idInput.valueAsNumber); // add the student id to the selectec course list's students list
    students.push(newStudent); // add the student to the students list
};

// find course by id
const findCourse = (id) => {
    for (const course of courses) {
        if (course.id === id) {
            return course;
        }
    }
};

// find course by name
const findCourseByName = (name) => {
    for (const course of courses) {
        if (course.courseName === name) {
            return course;
        }
    }
};

// find student by id
const findStudent = (id) => {
    for (const student of students) {
        if (student.id == id) {
            return student;
        }
    }
};
// find student by name
const findStudentName = (name) => {
    let allstudents = [];
    for (const student of students) {
        if (
            student.name.toLowerCase().startsWith(name) ||
            student.surname.toLowerCase().startsWith(name)
        ) {
            allstudents.push(student);
        }
    }
    return allstudents;
};

// adding student details table function
const addStudentDetails = (id, name, surname, course, midterm, final, mark) => {
    const tbody = studentDetailsTable.getElementsByTagName("tbody")[0];
    const row = tbody.insertRow(-1); // create a new row
    const idRow = row.insertCell(); // create new cells
    const nameRow = row.insertCell();
    const surnameRow = row.insertCell();
    const courseRow = row.insertCell();
    const midtermRow = row.insertCell();
    const finalRow = row.insertCell();
    const markRow = row.insertCell();
    idRow.innerHTML = id;
    nameRow.innerHTML = name;
    surnameRow.innerHTML = surname;
    courseRow.innerHTML = course;
    midtermRow.innerHTML = midterm;
    finalRow.innerHTML = final;
    markRow.innerHTML = mark;
};

// add course details function
const addCourseDetails = (id, courseName, failed, passed, average) => {
    const tbody = courseDetailsTable.getElementsByTagName("tbody")[0];
    const row = tbody.insertRow(-1); // create a new row
    const idRow = row.insertCell(); // create new cellss
    const courseNameRow = row.insertCell();
    const failedStudentRow = row.insertCell();
    const passedStudentRow = row.insertCell();
    const averageRow = row.insertCell();
    const baseRow = row.insertCell();
    const actionRow = row.insertCell();
    idRow.innerHTML = id;
    courseNameRow.innerHTML = courseName;
    failedStudentRow.innerHTML = failed;
    passedStudentRow.innerHTML = passed;
    averageRow.innerHTML = average;
    baseRow.innerHTML = selectedCourse.base;
    actionRow.innerHTML =
        "<button class='edit button' onClick='courseEditHandler(this)'>Edit</button><button class='delete button' onClick='courseDeleteHandler(this)'>Delete</button>";
};

// add course student details function
const viewCourseStudentDetails = (
    id,
    name,
    surname,
    midterm,
    final,
    mark,
    pass
) => {
    const tbody = courseStudentDetailsTable.getElementsByTagName("tbody")[0];
    const row = tbody.insertRow(-1); // create a new row
    const idRow = row.insertCell(); // create new cells
    const nameRow = row.insertCell();
    const surnameRow = row.insertCell();
    const midtermRow = row.insertCell();
    const finalRow = row.insertCell();
    const markRow = row.insertCell();
    const passRow = row.insertCell();
    const actionRow = row.insertCell();
    idRow.innerHTML = id;
    nameRow.innerHTML = name;
    surnameRow.innerHTML = surname;
    midtermRow.innerHTML = midterm;
    finalRow.innerHTML = final;
    markRow.innerHTML = mark;
    passRow.innerHTML = pass;
    actionRow.innerHTML =
        "<button class='edit button' onClick='studentEditHandler(this)'>Edit </button><button class='delete button' onClick='studentDeleteHandler(this)'>Delete</button>";
};

// Student Handling for Editing
const studentEditHandler = (tr) => {
    const selectedTr = tr.parentElement.parentElement; // selected row
    selectedStudent = tr.parentElement.parentElement.cells[0].innerHTML; // update the selected student id
    idInput.value = selectedTr.cells[0].innerHTML; // feed the input values with the selected student data
    nameInput.value = selectedTr.cells[1].innerHTML;
    surnameInput.value = selectedTr.cells[2].innerHTML;
    midtermInput.value = selectedTr.cells[3].innerHTML;
    finalInput.value = selectedTr.cells[4].innerHTML;
    idInput.disabled = true;
    nameInput.disabled = true;
    surnameInput.disabled = true;
    courseSelector.disabled = true;
    clearTable(studentDetailsTable);
    updateCourseDetails();
    updateCourseStudentDetails();
    // Transition effect for smooth rotation
    const transitionDuration = 5000; // Adjust duration as needed
    addStudentForm.style.transition = `transform ${transitionDuration}ms ease-out-cubic`;
    addStudentForm.style.transform = "rotateY(0deg)"; // Show form with smooth rotation
    addStudentForm.scrollIntoView();
};
const studentDeleteHandler = (tr) => {
    selectedStudent = tr.parentElement.parentElement.cells[0].innerHTML; // update the selected student id

    // Confirmation alert
    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
        const student = findStudent(selectedStudent); // find the selected student
        for (let i = 0; i < students.length; i++) {
            if (students[i] === student) {
                students.splice(i, 1); // delete the selected student from students list
            }
        }
        for (let i = 0; i < courses.length; i++) {
            for (let j = 0; j < courses[i].students.length; j++) {
                if (courses[i].students[j] == student.id) {
                    courses[i].students.splice(j, 1); // delete the selected student from courses
                }
            }
        }
        selectedStudent = null; // set selected student to null
        // emptyCourseOption.selected = true;
        clearTable(studentDetailsTable);
        updateCourseDetails();
        updateCourseStudentDetails();

        // Transition effect for smooth rotation
        const transitionDuration = 5000; // Adjust duration as needed
        addStudentForm.style.transition = `transform ${transitionDuration}ms ease-out-cubic`;
        addStudentForm.style.transform = "rotateY(0deg)"; // Show form with smooth rotation
        addStudentForm.scrollIntoView();
        saveStudents();
        saveCourses();
    }
};

// Course Handling for Editing
const courseEditHandler = (tr) => {
    courseEdit = true; // set the course editing indicator
    const selectedTr = tr.parentElement.parentElement; // selecred row
    courseNameInput.value = selectedTr.cells[1].innerHTML; // feed the input values with the selected course data
    // Disable courseSelector for 5 seconds
    courseSelector.disabled = true;

    if (selectedCourse.base == 7) {
        base7Radio.checked = true;
    } else if (selectedCourse.base == 10) {
        base10Radio.checked = true;
    }
    clearTable(studentDetailsTable);
    updateCourseDetails();
    updateCourseStudentDetails();
    // Transition effect for smooth rotation
    const transitionDuration = 5000; // Adjust duration as needed
    addCourseForm.style.transition = `transform ${transitionDuration}ms ease-out-cubic`;
    addCourseForm.style.transform = "rotateY(0deg)"; // Show form with smooth rotation
    addCourseForm.scrollIntoView();
};

// Course Handling for Deleting
const courseDeleteHandler = (tr) => {
    selectedCourse = tr.parentElement.parentElement.cells[0].innerHTML; // select the course with the id

    // Confirmation alert
    const confirmDelete = confirm(
        "Are you sure you want to delete this course? This action can not be undone."
    );
    if (confirmDelete) {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id == selectedCourse) {
                courses.splice(i, 1); // delete the course
            }
        }
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < students[i].takingCourses.length; j++) {
                if (students[i].takingCourses[j].id == selectedCourse) {
                    students[i].takingCourses.splice(j, 1); // delete the course details from the students
                }
            }
        }
        selectedCourse = null; // set selected course to null
        courseSelector.options[courseSelector.selectedIndex].remove(); // remove the course from the course selector
        clearTable(studentDetailsTable);
        clearTable(courseDetailsTable);
        clearTable(courseStudentDetailsTable);
        saveStudents();
        saveCourses();
    }
};

// Updating Student
const updateStudent = (studentid) => {
    let student = findStudent(studentid); // find the student with the given id
    student.name = nameInput.value; // update the first name
    student.surname = surnameInput.value; // update the surname

    updateStudentMarks(student); // update student marks
    if (!findStudent(idInput.valueAsNumber)) {
        // if a student with a given id doesn't exists
        for (let i = 0; i < student.takingCourses.length; i++) {
            let course = findCourse(student.takingCourses[i].id); // find the course from the student's taking courses list
            for (let j = 0; j < course.students.length; j++) {
                if (course.students[j] == student.id) {
                    course.students.splice(j, 1);
                    course.students.push(idInput.valueAsNumber); // replace the student id with the new student id from the courses list
                }
            }
            student.id = idInput.valueAsNumber; // update the student id
        }
        clearTable(studentDetailsTable);
        clearTable(courseDetailsTable);
        clearTable(courseStudentDetailsTable);
    }
};

// Update Student Marks
const updateStudentMarks = (student) => {
    let marks = {
        // create the mark details
        id: selectedCourse.id,
        midterm: midtermInput.valueAsNumber,
        final: finalInput.valueAsNumber,
        mark: calculateMark(
            midtermInput.value,
            finalInput.value,
            selectedCourse.base
        ),
    };
    for (let i = 0; i < student.takingCourses.length; i++) {
        // delete the old marks and replace with the new ones
        if (student.takingCourses[i].id == selectedCourse.id) {
            student.takingCourses.splice(i, 1);
            student.takingCourses.push(marks);
        }
    }
};

// Adding a new Course to Student
const addNewCourseToStudent = (student) => {
    let marks = {
        id: selectedCourse.id,
        midterm: midtermInput.valueAsNumber,
        final: finalInput.valueAsNumber,
        mark: calculateMark(
            midtermInput.value,
            finalInput.value,
            selectedCourse.base
        ),
    };
    student.takingCourses.push(marks); // add the course details to the student
    selectedCourse.students.push(student.id); // add the student id to the selectec course list's students list
};

// Update Course
const updateCourse = () => {
    selectedCourse.courseName = courseNameInput.value; // set the values that are provided by inputs
    selectedCourse.base = parseInt(
        document.querySelector('input[name="base"]:checked').value
    );
    courseSelector.options[courseSelector.selectedIndex].innerText =
        courseNameInput.value; // remove the course from the course selector
};

// Update Course Details
const updateCourseDetails = () => {
    clearTable(courseDetailsTable);
    let failed = 0;
    let passed = 0;
    let average = 0;
    failedStudents = [];
    passedStudents = [];
    let studentCount = selectedCourse.students.length;
    for (let i = 0; i < studentCount; i++) {
        let student = findStudent(selectedCourse.students[i]);
        for (let j = 0; j < student.takingCourses.length; j++) {
            if (student.takingCourses[j].id == selectedCourse.id) {
                let course = student.takingCourses[j];
                let mark = course.midterm * 0.4 + course.final * 0.6;
                average += mark;
                let studentDetails = {
                    id: student.id,
                    midterm: course.midterm,
                    final: course.final,
                    mark: calculateMark(
                        course.midterm,
                        course.final,
                        selectedCourse.base
                    ),
                };
                if (selectedCourse.base == 10) {
                    if (mark >= 60) {
                        passed++;
                        passedStudents.push(studentDetails);
                    } else {
                        failed++;
                        failedStudents.push(studentDetails);
                    }
                }
                if (selectedCourse.base == 7) {
                    if (mark >= 70) {
                        passed++;
                        passedStudents.push(studentDetails);
                    } else {
                        failed++;
                        failedStudents.push(studentDetails);
                    }
                }
            }
        }
    }
    average /= studentCount;
    average = average.toFixed(1);
    if (average === "NaN") {
        average = 0;
    }
    addCourseDetails(
        selectedCourse.id,
        selectedCourse.courseName,
        failed,
        passed,
        average
    );
};

// Updating table with new student values
const viewStudent = (foundStudent) => {
    let student = findStudent(foundStudent.id);

    let courses = student.takingCourses;
    for (let i = 0; i <= courses.length - 1; i++) {
        let course_id = courses[i].id;
        let currentCourse = findCourse(course_id);
        emptyCourseOption.selected = true;
        addStudentDetails(
            student.id,
            student.name,
            student.surname,
            currentCourse.courseName,
            courses[i].midterm,
            courses[i].final,
            courses[i].mark
        );
    }

    // Check if GPA is a number before displaying it:
    const gpa = calculateGpa(student);
    if (!isNaN(gpa)) {
        const gpaRow = studentDetailsTable.insertRow(-1);
        const gpaScore = gpaRow.insertCell(-1);
        gpaScore.innerHTML = "GPA: " + gpa;
    }
};

// Update the Course Details Table with Students
const updateCourseStudentDetails = () => {
    let studentArray = [];
    clearTable(courseStudentDetailsTable);
    if (courseDetailsSelect.value == "all") {
        studentArray = studentArray.concat(passedStudents, failedStudents);
    } else if (courseDetailsSelect.value == "failed") {
        studentArray = failedStudents;
    } else if (courseDetailsSelect.value == "passed") {
        studentArray = passedStudents;
    }
    if (studentArray.length > 0) {
        for (let i = 0; i < studentArray.length; i++) {
            let student = studentArray[i];
            let studentDetails = findStudent(studentArray[i].id);
            viewCourseStudentDetails(
                student.id,
                studentDetails.name,
                studentDetails.surname,
                student.midterm,
                student.final,
                student.mark,
                student.mark != "F"
                    ? (student.mark.innerHTML =
                          '<img src="/assets/checkmark-circle-outline.svg" class="icon" >')
                    : '<img src="/assets/close-circle-outline.svg" class="icon">'
            );
        }
    }
};

// Student Validation
const isStudentFormValid = () => {
    if (
        selectedCourse != null &&
        idInput.value != "" &&
        nameInput.value != "" &&
        surnameInput.value != "" &&
        midtermInput.value != "" &&
        finalInput.value != ""
    ) {
        return true;
    } else {
        return false;
    }
};

// Course Validation
const isCourseFormValid = () => {
    if (
        courseNameInput.value !== "" &&
        document.querySelector('input[name="base"]:checked') !== null
    ) {
        // Check if the first character is a number
        if (!isNaN(courseNameInput.value[0])) {
            showAlert("Course name can't start with a number"); // Log an error message
            return false;
        }

        // Other validation checks (if any)

        return true;
    } else {
        showAlert("Please fill all the necessary fields with correct form");
        return false;
    }
};

// Controlling is Student taking the Course
const studentTakingCourse = (id) => {
    if (selectedCourse.students.includes(id)) {
        return true;
    } else {
        return false;
    }
};

// Clear all inputs after any Submit
const removeInput = () => {
    idInput.value = "";
    nameInput.value = "";
    surnameInput.value = "";
    midtermInput.value = "";
    finalInput.value = "";
    courseNameInput.value = "";
    let bases = document.getElementsByName("base");
    for (var i = 0; i < bases.length; i++) bases[i].checked = false;
};

// Clear the given Table
const clearTable = (tableName) => {
    for (var x = tableName.rows.length; x > 1; x--) {
        tableName.deleteRow(-1);
    }
};

// Calculate the gpa of given Student
const calculateGpa = (student) => {
    let gpa = 0;
    for (score in student.takingCourses) {
        gpa +=
            student.takingCourses[score].midterm * 0.4 +
            student.takingCourses[score].final * 0.6;
    }
    return parseFloat(((gpa /= student.takingCourses.length) / 25).toFixed(2));
};

function showAlert(text) {
    // Alert element with appropriate accessibility attributes
    const alert = document.createElement("div");
    alert.setAttribute("role", "alert");
    alert.setAttribute("aria-live", "assertive");

    // Set alert content and styling
    alert.textContent = text;
    alert.style.cssText = `
      position: fixed;
      right:0;
      top: 50%;
      transform: translate(0%, -50%);
      background-color: rgba(46, 204, 113, 0.95); /* Translucent green with subtle gradient */
      color: #fff;
      text-align: center;
      font-family: sans-serif;
      font-weight: bold;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* Soft drop shadow */
      z-index: 1000;
      
    `;

    // Add a close button to the alert
    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.style.cssText = `
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      font-weight: bold;
      font-size: 20px;
      color: white;
      transition: color 0.3s; // Transition for color
    `;
    // Add a hover effect to the close button
    closeBtn.addEventListener("mouseover", function () {
        this.style.color = "black";
    });
    closeBtn.addEventListener("mouseout", function () {
        this.style.color = "white";
    });
    // Add a click event to the close button
    closeBtn.addEventListener("click", function () {
        this.parentElement.remove();
    });
    // Append the close button to the alert
    alert.appendChild(closeBtn);

    // Add alert to the page and remove after 3 seconds
    document.body.appendChild(alert);
    // Make the alert visible by changing its opacity
    setTimeout(() => (alert.style.opacity = 1), 100);
    // Make the alert invisible and remove it after 3 seconds
    setTimeout(() => {
        alert.style.opacity = 0;
        setTimeout(() => alert.remove(), 500);
    }, 3000);
}

// When switch is clicked it will toggle to dark to light mode and light to dark mode
const switchIcon = document.getElementById("switch-icon-on");
const hiddenElement = document.getElementById("switch-icon-off");
let toggle = true;

switchIcon.addEventListener("click", () => {
    saveToggle();
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const articles = document.querySelectorAll("article");
    const forms = document.querySelectorAll("form");
    const inputs = document.querySelectorAll("input");
    const buttons = document.querySelectorAll(".button");
    const tables = document.querySelectorAll("table");
    const thElements = document.querySelectorAll("th");
    const scrollbars = document.querySelectorAll("::-webkit-scrollbar");
    // Transition effect for the switch icon
    const transitionDuration = 800; // Adjust duration as needed
    switchIcon.style.transition = `transform ${transitionDuration}ms ease-in-out`;
    if (toggle) {
        switchIcon.style.transform = "rotate(180deg)"; // Rotate icon smoothly
        // Apply dark mode classes with a slight delay
        setTimeout(() => {
            body.classList.add("dark-mode");
            header.classList.add("dark-mode");
            scrollbars.forEach((scrollbar) => {
                scrollbar.classList.add("dark-mode");
            });
            articles.forEach((article) => {
                article.classList.add("dark-mode");
            });
            forms.forEach((form) => {
                form.classList.add("dark-mode");
            });
            inputs.forEach((input) => {
                input.classList.add("dark-mode");
            });
            buttons.forEach((button) => {
                button.classList.add("dark-mode");
            });
            tables.forEach((table) => {
                table.classList.add("dark-mode");
            });
            thElements.forEach((th) => {
                th.classList.add("dark-mode");
            });
        }, transitionDuration / 2); // Apply classes after half the transition
    } else {
        switchIcon.style.transform = "rotate(0deg)"; // Rotate icon back smoothly

        // Remove dark mode classes with a slight delay
        setTimeout(() => {
            body.classList.remove("dark-mode");
            header.classList.remove("dark-mode");
            scrollbars.forEach((scrollbar) => {
                scrollbar.classList.remove("dark-mode");
            });
            articles.forEach((article) => {
                article.classList.remove("dark-mode");
            });
            forms.forEach((form) => {
                form.classList.remove("dark-mode");
            });
            inputs.forEach((input) => {
                input.classList.remove("dark-mode");
            });
            buttons.forEach((button) => {
                button.classList.remove("dark-mode");
            });
            tables.forEach((table) => {
                table.classList.remove("dark-mode");
            });
            thElements.forEach((th) => {
                th.classList.remove("dark-mode");
            });
        }, transitionDuration / 2); // Remove classes after half the transition
    }

    switchIcon.src = toggle
        ? "assets/toggle-on-solid.svg"
        : "assets/toggle-off-solid.svg";
    toggle = !toggle;
});

function saveToggle() {
    localStorage.setItem("dark", JSON.stringify(toggle));
}
function loadToggle() {
    return JSON.parse(localStorage.getItem("dark"));
}

function saveCourses() {
    localStorage.setItem("courses", JSON.stringify(courses));
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function loadCourses() {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    return courses;
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    return students;
}
// Load courses and students on page load
window.addEventListener("load", () => {
    toggle = loadToggle();
    if (toggle) {
        switchIcon.click();
    } else {
        switchIcon.src = toggle
            ? "assets/toggle-on-solid.svg"
            : "assets/toggle-off-solid.svg";
    }
    let tempCourses = loadCourses();
    tempCourses.map((course) => {
        let newCourse = new Course(courseID, course.courseName, course.base);
        courseID++; // increse the course id
        courses.push(newCourse);
        emptyCourseOption.selected = true;
    });

    // // adding default students to table
    let tempStudents = loadStudents();
    tempStudents.map((student) => {
        student.takingCourses.map((c) => {
            courseSelector.value = findCourse(c.id).courseName;
            selectedCourse = findCourse(c.id);
            let findStudentVal = findStudent(student.id);
            // No student is currently selected:
            if (findStudentVal) {
                // Student exists:

                let marks = {
                    id: selectedCourse.id,
                    midterm: c.midterm,
                    final: c.final,
                    mark: calculateMark(
                        c.midterm,
                        c.final,
                        selectedCourse.base
                    ),
                };
                findStudentVal.takingCourses.push(marks); // add the course details to the student
                selectedCourse.students.push(findStudentVal.id);
            } else {
                // Student doesn't exist, create a new one:
                const newStudent = new Student(
                    student.id,
                    student.name,
                    student.surname,
                    c.midterm,
                    c.final
                );
                selectedCourse.students.push(student.id); // add the student id to the selectec course list's students list
                students.push(newStudent); // add the student to the students list
            }
        });
        emptyCourseOption.selected = true;
    });
});
