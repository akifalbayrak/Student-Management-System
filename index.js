const courses = []; // all courses
const students = []; // all students

const courses_json = [
    {
        id: 1,
        courseName: "db",
        base: 7,
    },
    {
        id: 2,
        courseName: "web",
        base: 10,
    },
    { id: 3, courseName: "network", base: 7 },
    { id: 4, courseName: "mining", base: 10 },
    {
        id: 5,
        courseName: "chemistry",
        base: 10,
    },
    {
        id: 6,
        courseName: "nlp",
        base: 10,
    },
];
// calculate the mark
const calculateMark = (midterm, final, base) => {
    const score = midterm * 0.4 + final * 0.6;
    if (base == 10) {
        if (score >= 90) {
            return "A";
        }
        if (score >= 80) {
            return "B";
        }
        if (score >= 70) {
            return "C";
        }
        if (score >= 60) {
            return "D";
        } else {
            return "F";
        }
    } else if (base == 7) {
        if (score >= 93) {
            return "A";
        }
        if (score >= 85) {
            return "B";
        }
        if (score >= 77) {
            return "C";
        }
        if (score >= 70) {
            return "D";
        } else {
            return "F";
        }
    }
};

let courseID = courses_json.length; //global course id
let selectedStudent = null; //selected student for edit or delete
let selectedCourse = null; //selected course from select input
let foundStudent = null; //student that is found by search input
let courseEdit = false; //course editing indicator
let studentSearchForm = document.getElementById("search-student"); //student search form
let studentSearchInput = document.getElementById("search-bar"); //student search input
let idInput = document.getElementById("ID"); //ID input
let firstNameInput = document.getElementById("first-name"); //first name input
let surnameInput = document.getElementById("surname"); //surname input
let midtermInput = document.getElementById("midterm-score"); //midterm input
let finalInput = document.getElementById("final-score"); //final input
let courseNameInput = document.getElementById("course-name"); //course name input
let base7Radio = document.getElementById("base7"); //base 7 radio button
let base10Radio = document.getElementById("base10"); //base 10 radio button
let courseSelector = document.getElementById("courses"); //course selector input
const emptyCourseOption = document.getElementById("empty-option"); // empty course option
const courseForm = document.getElementById("add-course"); //course adding table
const studentForm = document.getElementById("add-student"); //student adding table
const studentsViewTable = document.getElementById("student-table"); //student display table
const studentDetailsTable = document.getElementById("course-table"); //student details table
const courseDetailsTable = document.getElementById("course-detail"); //course detail table
const courseStudentDetailsTable = document.getElementById(
    "course-student-detail"
);
const courseDetailsSelect = document.getElementById("course-details"); // course detail selector
const allOption = document.getElementById("all"); // all details selector options
const failedOption = document.getElementById("failed"); // failed students option
const passedOption = document.getElementById("passed"); // passed students option
const courseDetailsDiv = document.getElementById("course-details-div"); // course details div
const baseVal = parseInt(
    // base point
    document.querySelector('input[name="base"]:checked')?.value || 10
);
let failedStudents = []; // failed students
let passedStudents = []; // passed students

/// EVENT LISTENERS

// course adding table
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isCourseFormValid()) {
        if (courseEdit) {
            // if course update handler function is triggered
            updateCourse(); // update the course
            updateCourseDetails();
            updateCourseStudentDetails(); // update course details table
            courseEdit = false; // set course editing state to false
        } else {
            // if course edit is false, that means user is trying to add a new course
            addCourse(); // add the new course
            clearTable(studentDetailsTable); // clear course details table
            clearTable(courseDetailsTable); // clear course details table
            clearTable(courseStudentDetailsTable);
            showAlert("Kurs başarıyla eklendi");
        }
    } else {
        alert("Please fill all the neccessary fields");
    }
    removeInput();
});

// student adding table
studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isStudentFormValid()) {
        let student = findStudent(idInput.value);
        if (selectedStudent === null) {
            // if there is no selected student
            if (student) {
                // if the student already exists
                if (studentTakingCourse(student.id)) {
                    // if the student is already taking the selected course
                    updateStudentMarks(student); // update the marks with the newly provided scores
                } else {
                    // if the student isn't taking the selected course
                    addNewCourseToStudent(student);
                }
            } else {
                // if there is no student found, that means user is trying to add a new student
                addStudent(); // add new student
            }
        } else {
            // if there is a student selected, that means user is trying to update the student
            updateStudent(selectedStudent); // update the student
            selectedStudent = null;
        }
        updateCourseDetails(); // update course details
        updateCourseStudentDetails(); // update course details table
    } else {
        alert("Please fill all the neccessary fields");
    }
    removeInput(); // clear the inputs
});

// student search input
studentSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    foundStudent = findStudent(studentSearchInput.value); // find student by the provided input
    if (foundStudent) {
        // if the student exists
        if (foundStudent.takingCourses.length > 0) {
            // if the student exists and has taken at least one course
            viewStudent(foundStudent); // view student details
            clearTable(courseStudentDetailsTable);
            clearTable(courseDetailsTable); // clear course details table
        } else {
            // if the student doesn't have any courses
            alert("This student doesn't have any courses");
        }
    } else {
        alert("No student found with id " + studentSearchInput.value);
    }
    studentSearchInput.value = "";
});

// course select input
courseSelector.addEventListener("change", (e) => {
    selectedCourse = findCourseByName(e.target.value); // find the selected course by using the value of the select input
    if (selectedCourse != null) {
        // if user selected a course
        updateCourseDetails();
        updateCourseStudentDetails(); // update course details table
    } else {
        // if user selected the empty option
        clearTable(courseDetailsTable); // clear course details table
    }
});

// id input
idInput.addEventListener("change", (event) => {
    if (findStudent(event.target.valueAsNumber)) {
        // if a student exists with the id provided in the ID input
        let student = findStudent(event.target.valueAsNumber); // find the student with the provided id
        (firstNameInput.value = student.firstName), // feed the name input
            (surnameInput.value = student.surname); // feed the surname input
    }
});

// course details select input
courseDetailsSelect.addEventListener("change", () => {
    updateCourseStudentDetails();
});

/// CLASSES

// course creating class
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
};
courses_json.map((course) => {
    let newCourse = new Course(course.id, course.courseName, course.base);
    courses.push(newCourse);
    emptyCourseOption.selected = true;
});
// student creating class
class Student {
    constructor(id, firstName, surname, midterm, final) {
        this.id = id; // unique student id
        this.firstName = firstName; // student name
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
const students_json = [
    { id: 1, name: "akif", surname: "albayrak", midterm: 100, final: 100 },
    { id: 2, name: "mete", surname: "albayrak", midterm: 100, final: 100 },
    { id: 3, name: "beyza", surname: "albayrak", midterm: 100, final: 100 },
    { id: 4, name: "mehmet", surname: "albayrak", midterm: 100, final: 100 },
    { id: 5, name: "ülkü", surname: "albayrak", midterm: 100, final: 100 },
    { id: 6, name: "ahmet", surname: "albayrak", midterm: 100, final: 100 },
];
// student adding function
const addStudent = () => {
    // if student doesn't exists
    const newStudent = new Student( // create a new student with the data from the inputs
        idInput.valueAsNumber,
        firstNameInput.value,
        surnameInput.value,
        midtermInput.valueAsNumber,
        finalInput.valueAsNumber
    );
    selectedCourse.students.push(idInput.valueAsNumber); // add the student id to the selectec course list's students list
    students.push(newStudent); // add the student to the students list
};

/// SEARCH FUNCTIONS

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
students_json.map((student) => {
    idInput.valueAsNumber = student.id;
    firstNameInput.value = student.name;
    surnameInput.value = student.surname;
    midtermInput.valueAsNumber = student.midterm;
    finalInput.valueAsNumber = student.final;

    selectedCourse = findCourse(1);
    addStudent();
    idInput.value = null;
    firstNameInput.value = null;
    surnameInput.value = null;
    midtermInput.value = null;
    finalInput.value = null;
    // Add the new Student object to the students array
});
/// TABLE CREATING FUNCTIONS

// adding student details table function
const addStudentDetails = (
    id,
    firstName,
    surname,
    course,
    midterm,
    final,
    mark
) => {
    const tbody = studentDetailsTable.getElementsByTagName("tbody")[0];
    const row = tbody.insertRow(-1); // create a new row
    const idRow = row.insertCell(); // create new cells
    const nameRow = row.insertCell();
    const surnameRow = row.insertCell();
    const courseRow = row.insertCell();
    const midtermRow = row.insertCell();
    const finalRow = row.insertCell();
    const markRow = row.insertCell();
    idRow.innerHTML = id; // fill the new cells with the provided information
    nameRow.innerHTML = firstName;
    surnameRow.innerHTML = surname;
    courseRow.innerHTML = course;
    midtermRow.innerHTML = midterm;
    finalRow.innerHTML = final;
    markRow.innerHTML = mark;
};

// add course details function
const addCourseDetails = (id, cName, failed, passed, average) => {
    const tbody = courseDetailsTable.getElementsByTagName("tbody")[0];
    const row = tbody.insertRow(-1); // create a new row
    const idRow = row.insertCell(); // create new cellss
    const courseNameRow = row.insertCell();
    const failedStudentRow = row.insertCell();
    const passedStudentRow = row.insertCell();
    const averageRow = row.insertCell();
    const baseRow = row.insertCell();
    const actionRow = row.insertCell();
    idRow.innerHTML = id; // fill the new cells with the provided information
    courseNameRow.innerHTML = cName;
    failedStudentRow.innerHTML = failed;
    passedStudentRow.innerHTML = passed;
    averageRow.innerHTML = average;
    baseRow.innerHTML = selectedCourse.base;
    actionRow.innerHTML = // create action buttons
        "<button class='edit' onClick='courseEditHandler(this)'>Edit </button><button class='delete' onClick='courseDeleteHandler(this)'>Delete</button>";
};

// add course student details function
const viewCourseStudentDetails = (
    id,
    firstName,
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
    idRow.innerHTML = id; // fill the new cells with the provided information
    nameRow.innerHTML = firstName;
    surnameRow.innerHTML = surname;
    midtermRow.innerHTML = midterm;
    finalRow.innerHTML = final;
    markRow.innerHTML = mark;
    passRow.innerHTML = pass;
    actionRow.innerHTML = // create action buttons
        "<button class='edit' onClick='studentEditHandler(this)'>Edit </button><button class='delete' onClick='studentDeleteHandler(this)'>Delete</button>";
};
/// EDIT, DELETE AND UPDATE HANDLERS

// student edit handler
const studentEditHandler = (tr) => {
    const selectedTr = tr.parentElement.parentElement; // selected row
    selectedStudent = tr.parentElement.parentElement.cells[0].innerHTML; // update the selected student id
    idInput.value = selectedTr.cells[0].innerHTML; // feed the input values with the selected student data
    firstNameInput.value = selectedTr.cells[1].innerHTML;
    surnameInput.value = selectedTr.cells[2].innerHTML;
    midtermInput.value = selectedTr.cells[3].innerHTML;
    finalInput.value = selectedTr.cells[4].innerHTML;
};

// student delete handler
const studentDeleteHandler = (tr) => {
    selectedStudent = tr.parentElement.parentElement.cells[0].innerHTML; // update the selected student id
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
    updateCourseStudentDetails(); // update course details table
};

// course edit handler
const courseEditHandler = (tr) => {
    courseEdit = true; // set the course editing indicator
    const selectedTr = tr.parentElement.parentElement; // selecred row
    courseNameInput.value = selectedTr.cells[1].innerHTML; // feed the input values with the selected course data
    if (selectedCourse.base == 7) {
        base7Radio.checked = true;
    } else if (selectedCourse.base == 10) {
        base10Radio.checked = true;
    }
};

// course delete handler
const courseDeleteHandler = (tr) => {
    selectedCourse = tr.parentElement.parentElement.cells[0].innerHTML; // select the course with the id
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
    selectedCourse = null; // set selected coure to null
    clearTable(courseDetailsTable); // clear course details table
    courseSelector.options[courseSelector.selectedIndex].remove(); // remove the course from the course selector
};

// update student function
const updateStudent = (studentid) => {
    let student = findStudent(studentid); // find the student with the given id
    student.firstName = firstNameInput.value; // update the first name
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
    }
};

// update student marks function
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

// adding a new course to the student
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

// update course function
const updateCourse = () => {
    selectedCourse.courseName = courseNameInput.value; // set the values that are provided by inputs
    selectedCourse.base = parseInt(
        document.querySelector('input[name="base"]:checked').value
    );
    // // update the selector option
    // courseSelector.options[courseSelector.selectedIndex].value =
    //     selectedCourse.courseName;
    // courseSelector.options[courseSelector.selectedIndex].text =
    //     selectedCourse.courseName;
};

// update the course details
const updateCourseDetails = () => {
    clearTable(courseDetailsTable); // clear course details table
    let failed = 0; // failed student count
    let passed = 0; // passed student count
    let average = 0; // course average
    failedStudents = [];
    passedStudents = [];
    let studentCount = selectedCourse.students.length; // student count
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
    average = average.toFixed(2);
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

// update student details table
const viewStudent = (foundStudent) => {
    let student = findStudent(foundStudent.id);
    clearTable(studentDetailsTable);
    let courses = student.takingCourses;
    for (let i = 0; i <= courses.length - 1; i++) {
        let course_id = courses[i].id;
        let currentCourse = findCourse(course_id);
        emptyCourseOption.selected = true;
        addStudentDetails(
            student.id,
            student.firstName,
            student.surname,
            currentCourse.courseName,
            courses[i].midterm,
            courses[i].final,
            courses[i].mark
        );
    }
    const gpaRow = studentDetailsTable.insertRow(-1);
    const gpaScore = gpaRow.insertCell(-1);
    gpaScore.innerHTML = "GPA: " + calculateGpa(student);
};

// update the course details table with students
const updateCourseStudentDetails = () => {
    let studentArray = [];
    clearTable(courseStudentDetailsTable);
    if (courseDetailsSelect.value == "all") {
        studentArray = studentArray.concat(passedStudents, failedStudents);
    } else if (courseDetailsSelect.value == "failed") {
        // if the failed option selected
        studentArray = failedStudents;
    } else if (courseDetailsSelect.value == "passed") {
        // if the passed option selected
        studentArray = passedStudents;
    }
    if (studentArray.length > 0) {
        // if there is a student in selected list
        for (let i = 0; i < studentArray.length; i++) {
            let student = studentArray[i];
            let studentDetails = findStudent(studentArray[i].id);
            viewCourseStudentDetails(
                student.id,
                studentDetails.firstName,
                studentDetails.surname,
                student.midterm,
                student.final,
                student.mark,
                student.mark != "F"
            );
        }
    }
};

/// Validators

// student form validation
const isStudentFormValid = () => {
    if (
        selectedCourse != null &&
        idInput.value != "" &&
        firstNameInput.value != "" &&
        surnameInput.value != "" &&
        midtermInput.value != "" &&
        finalInput.value != ""
    ) {
        return true;
    } else {
        return false;
    }
};

// course form validation
const isCourseFormValid = () => {
    if (
        courseNameInput.value != "" &&
        document.querySelector('input[name="base"]:checked') != null
    ) {
        return true;
    } else {
        return false;
    }
};

// is student taking the course
const studentTakingCourse = (id) => {
    if (selectedCourse.students.includes(id)) {
        return true;
    } else {
        return false;
    }
};

// clear all inputs after any submit
const removeInput = () => {
    idInput.value = "";
    firstNameInput.value = "";
    surnameInput.value = "";
    midtermInput.value = "";
    finalInput.value = "";
    courseNameInput.value = "";
    let bases = document.getElementsByName("base");
    for (var i = 0; i < bases.length; i++) bases[i].checked = false;
};

// clear the given table
const clearTable = (tableName) => {
    for (var x = tableName.rows.length; x > 1; x--) {
        tableName.deleteRow(-1);
    }
};

// calculate the gpa of given student
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
    // Alert oluştur
    let alert = document.createElement("div");
    alert.innerHTML = `${text}`;
    alert.style.position = "fixed";
    alert.style.left = "50%";
    alert.style.top = "50%";
    alert.style.transform = "translate(-50%, -50%)";
    alert.style.background = "green";
    alert.style.color = "white";
    alert.style.padding = "10px";
    alert.style.borderRadius = "5px";
    alert.style.zIndex = "1000";

    // Alert'i sayfaya ekle
    document.body.appendChild(alert);

    // 2 saniye sonra alert'i kaldır
    setTimeout(function () {
        alert.remove();
    }, 2000);
}
