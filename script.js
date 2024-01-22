document.addEventListener('DOMContentLoaded', function () {
    var isJsonVisible = false;

    var toggleButton = document.getElementById('toggleButton');
    var teacherListContainer = document.getElementById('teacherListContainer');

    toggleButton.addEventListener('click', function () {
        if (!isJsonVisible) {
            fetch('http://localhost:8080/api/auth/teacher/getAll', { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    teacherListContainer.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    isJsonVisible = true;
                    toggleButton.textContent = 'Hide Teacher List';
                })
                .catch(error => console.error('Error:', error));
        } else {
            teacherListContainer.innerHTML = '';
            isJsonVisible = false;
            toggleButton.textContent = 'Show Teacher List';
        }
    }); 
});
document.addEventListener('DOMContentLoaded', function () {
    var closeButton = document.getElementById('closeButton');

    var getStudentButton = document.getElementById('getStudentButton');
    var studentInfoContainer = document.getElementById('studentInfo');

    getStudentButton.addEventListener('click', function () {
        var studentIdInput = document.getElementById('studentId');
        var studentId = studentIdInput.value;

        if (studentId.trim() === '') {
            alert('Please enter a student ID.');
            return;
        }

        fetch('http://localhost:8080/api/auth/teacher/' + studentId, { mode: 'cors' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Teacher not found');
                }
                return response.json();
            })
            .then(student => {
                
                studentInfoContainer.innerHTML = '<pre>' + JSON.stringify(student, null, 2) + '</pre>';
                closeButton.style.display = 'block'; // Kapatma butonunu görünür yap

            })
            .catch(error => {
                studentInfoContainer.innerHTML = '<p>Error: ' + error.message + '</p>';
                closeButton.style.display = 'none'; // Kapatma butonunu gizle

            });
    });
    closeButton.addEventListener('click', function () {
        studentInfoContainer.innerHTML = ''; // Öğrenci bilgilerini temizle
        closeButton.style.display = 'none'; // Kapatma butonunu gizle
    });
});