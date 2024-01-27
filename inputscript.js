function showInput() {
    var selectedPerson = document.getElementById("person").value;
    var experience=document.getElementById("age-experience")
    var department = document.getElementById("department");

    if (selectedPerson === "teacher") {
        experience.innerHTML="Experience:"
        department.style.display = "block";
    } else {
        experience.innerHTML="Age:"
        department.style.display = "none";
    }
}