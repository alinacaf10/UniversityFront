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