document.addEventListener('DOMContentLoaded', function () {
    var isTeacherListVisible = false;
    var isStudentListVisible = false;
    var isTeacherInfoVisible = false;
    var isStudentInfoVisible = false;
    var isGetStudentVisible = false;


    var toggleTeacherButton = document.getElementById('toggleTeacherButton');
    var teacherListContainer = document.getElementById('teacherListContainer');
    var findTeacherButton = document.getElementById('findTeacherButton');
    var findTeacherContainer = document.getElementById('findTeacherContainer');
    var getTeacherButton = document.getElementById('getTeacherButton');
    var teacherInfoContainer = document.getElementById('teacherInfo');

    var toggleStudentButton = document.getElementById('toggleStudentButton');
    var studentListContainer = document.getElementById('studentListContainer');
    var findStudentButton = document.getElementById('findStudentButton');
    var findStudentContainer = document.getElementById('findStudentContainer');
    var getStudentButton = document.getElementById('getStudentButton');
    var studentInfoContainer = document.getElementById('studentInfo');

    toggleTeacherButton.addEventListener('click', function () {
        if (!isTeacherListVisible) {
            fetch('http://localhost:8080/api/auth/teacher/getAll', { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    teacherListContainer.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    isTeacherListVisible = true;
                    toggleTeacherButton.textContent = 'Hide Teacher List';
                })
                .catch(error => console.error('Error:', error));
        } else {
            teacherListContainer.innerHTML = '';
            isTeacherListVisible = false;
            toggleTeacherButton.textContent = 'Show Teacher List';
        }
    });

    findTeacherButton.addEventListener('click', function () {
        findTeacherContainer.style.display = 'block';
        isTeacherInfoVisible = true;
    });

    getTeacherButton.addEventListener('click', function () {
        teacherInfoContainer.innerHTML = '';

        var teacherIdInput = document.getElementById('teacherId');
        var teacherId = teacherIdInput.value;

        if (teacherId.trim() === '') {
            alert('Please enter a teacher ID.');
            return;
        }

        // Eğer öğrenci listesi açıksa, kapat
        if (isTeacherListVisible) {
            teacherListContainer.innerHTML = '';
            isTeacherListVisible = false;
            toggleTeacherButton.textContent = 'Show teacher List';
        }

        fetch('http://localhost:8080/api/auth/teacher/' + teacherId, { mode: 'cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Teacher not found');
                }
                return response.json();
            })
            .then(teacher => {
                teacherInfoContainer.innerHTML = '<pre>' + JSON.stringify(teacher, null, 2) + '</pre><button style="font-size:10px">Add Student</button>';
            })
            .catch(error => {
                teacherInfoContainer.innerHTML = '<p>Error: ' + error.message + '</p>';
            });
    });

    toggleStudentButton.addEventListener('click', function () {
        if (isStudentInfoVisible) {
            studentInfoContainer.innerHTML = '';
            isStudentInfoVisible = false;
            findStudentContainer.style.display = 'none';
        }

        // Eğer "Get Student" butonu ve input alanı açıksa, kapat
        if (isGetStudentVisible) {
            getStudentContainer.style.display = 'none';
            isGetStudentVisible = false;
        }

        if (!isStudentListVisible) {
            fetch('http://localhost:8080/api/auth/student/getAll', { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    studentListContainer.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    isStudentListVisible = true;
                    toggleStudentButton.textContent = 'Hide Student List';
                })
                .catch(error => console.error('Error:', error));
        } else {
            studentListContainer.innerHTML = '';
            isStudentListVisible = false;
            toggleStudentButton.textContent = 'Show Student List';
        }
    });

    findStudentButton.addEventListener('click', function () {
        findStudentContainer.style.display = 'block';
        isStudentInfoVisible = true;
    });

    getStudentButton.addEventListener('click', function () {
        studentInfoContainer.innerHTML = '';

        var studentIdInput = document.getElementById('studentId');
        var studentId = studentIdInput.value;

        if (studentId.trim() === '') {
            alert('Please enter a student ID.');
            return;
        }

        // Eğer öğrenci listesi açıksa, kapat
        if (isStudentListVisible) {
            studentListContainer.innerHTML = '';
            isStudentListVisible = false;
            toggleStudentButton.textContent = 'Show Student List';
        }

        // Diğer işlemler devam eder...
        fetch('http://localhost:8080/api/auth/student/' + studentId, { mode: 'cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Student not found');
                }
                return response.json();
            })
            .then(student => {
                studentInfoContainer.innerHTML = '<pre>' + JSON.stringify(student, null, 2) + '</pre>';
            })
            .catch(error => {
                studentInfoContainer.innerHTML = '<p>Error: ' + error.message + '</p>';
            });
    });
});
