function toggleEdit(editMode) {
    const elements = document.querySelectorAll("#username, #name, #surname, #gamename");
    const button = document.querySelector(".cool-btn");

    if (editMode) {
        elements.forEach((element) => {
            const input = document.createElement("input");
            input.value = element.textContent;
            input.className = "form-control";
            input.setAttribute("data-id", element.id);
            input.id = element.id;
            element.replaceWith(input);
        });
        button.textContent = "Save";
        button.onclick = () => toggleEdit(false);
    } else {
        elements.forEach((input) => {
            const td = document.createElement("td");
            td.textContent = input.value;
            td.id = input.getAttribute("data-id");
            input.replaceWith(td);
        });
        button.textContent = "Edit";
        button.onclick = () => toggleEdit(true);
    }
}
