function showInput() {
    var selectedPerson = document.getElementById("person").value;
    var experience = document.getElementById("age-experience")
    var departmentTeacher = document.getElementById("departmentTeacher");

    if (selectedPerson === "teacher") {
        experience.innerHTML = "Experience:"
        departmentTeacher.style.display = "block";
    } else {
        experience.innerHTML = "Age:"
        departmentTeacher.style.display = "none";
    }
}

var postbtn = document.getElementById("postPersonbtn");



document.getElementById('postPersonbtn').addEventListener('click', function () {
    var name = document.getElementById('name').value;
    var age = parseInt(document.getElementById('age').value, 10);
    var personType = document.getElementById('person').value;
    var department = document.getElementById('department').value;
    var responseResult = document.getElementById("response");

    var requestData = {
        name: name,
    };

    if (personType === 'teacher') {
        requestData.experience = age;
        requestData.department = department;

        fetch('http://localhost:8080/api/auth/teacher/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                responseResult.innerHTML = "Teacher Successfully Added"
                console.log('Teacher Successfully Added: ', data);
            })
            .catch(error => {
                responseResult.innerHTML = "Teacher Is not Added"
                console.error('Error: ', error);
            });
    }
    else {
        requestData.age = age
        fetch('http://localhost:8080/api/auth/student/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                responseResult.innerHTML = "Student Successfully Added"
                console.log('Student Successfully Added: ', data);
            })
            .catch(error => {
                responseResult.innerHTML = "Student Is not Added"

                console.error('Error: ', error);
            });
    }
});