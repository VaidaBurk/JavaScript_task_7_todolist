// sessionStorage.setItem("data",
//     JSON.stringify(
//         [
//             {
//                 id: 1,
//                 name: "Study",
//                 description: "Java Script, Saturday 8:00 - 13:00"
//             },
//             {
//                 id: 2,
//                 name: "Go downtown",
//                 description: "When studying is done"
//             },
//             {
//                 id: 3,
//                 name: "Study again",
//                 description: "Sunday"
//             }
//         ] 
//     ) 
// );

updateHtmlTable()

let id = 3;
function updateHtmlTable() {

    // 3 - foreach todo list
    let generatedHtml = "";
    let todos = JSON.parse( sessionStorage.getItem("data") );
    if (todos === null) {
        sessionStorage.setItem("data", JSON.stringify( [] ));
        return;
    }

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        // 4 - generate row
        let tableRow = 
        `<tr>
            <td>${todo.name}</td>
            <td>${todo.description}</td>
            <td>
                <div class="edit btn btn-outline-warning btn-sm" id="edit-${todo.id}">Edit</div>
                <div class="delete btn btn-outline-danger btn-sm" onclick="deleteEntry(${todo.id});">Delete</div>
                <div class="delete btn btn-outline-success btn-sm" onclick="markDone(${todo.id});">Done</div>
            </td>
        </tr>`;

        generatedHtml = generatedHtml + tableRow;               // merge generated table
    }

    let tbodyElement = document.getElementById("tasks-table");      // get tbody of table
    tbodyElement.innerHTML = generatedHtml;                         // modify tbody.innerHtml into our newly generated one

    activateEditButtons();
}

function updateValues() {
    let todoName = document.getElementById("todo-name").value; 
    todoName = "";
}

function addNewTodo() {

    document.getElementById("todo-name").focus();

        if(!inputValidation()) {
        return;
    };

    id++;
    
    //1. get task name from document
    let todoName = document.getElementById("todo-name").value; 
    
    //2. get description from document
    let todoDescription = document.getElementById("todo-description").value;

    let todoId = id;
    
    //3. create new todo object
    let todo = {
        id: todoId,
        name: todoName,
        description: todoDescription
    }
    
    //4. add new object to array
    let todos = JSON.parse( sessionStorage.getItem("data") );
    todos.push(todo);
    sessionStorage.setItem("data", JSON.stringify(todos));

    //5. call updateHtmlTable function
    updateHtmlTable();
  
    updateValues(); 
    clearForm();
}


function clearForm() {
    document.getElementById("todo-name").value = "";
    document.getElementById("todo-description").value = "";   
}


function inputValidation() {
    document.getElementById("name-error-msg").innerHTML = "";
    document.getElementById("description-error-msg").innerHTML = "";
    document.getElementById("success-message").innerHTML = "";

    document.getElementById("name-error-msg").classList.remove("alert", "alert-danger", "alert-warning");
    document.getElementById("description-error-msg").classList.remove("alert", "alert-danger");
    document.getElementById("success-message").classList.remove("alert", "alert-danger", "alert-success");

    if ( !isValid("todo-description") && !isValid("todo-name") ) {
        document.getElementById("description-error-msg").innerHTML = "<div>Please enter ToDo description (optional)!</div>";
        document.getElementById("name-error-msg").innerHTML = "<div>Please enter ToDo name!</div>";
        document.getElementById("description-error-msg").classList.add("alert", "alert-danger");
        document.getElementById("name-error-msg").classList.add("alert", "alert-danger");
        return false;
    };
    
    if ( !isValid("todo-name") && isValid("todo-description") ) {
        document.getElementById("name-error-msg").innerHTML = "<div>Please enter ToDo name!</div>";
        document.getElementById("name-error-msg").classList.add("alert", "alert-warning");
        return false;
    };

    if ( isValid("todo-name") ) {
        document.getElementById("success-message").innerHTML = "<div>New ToDo successfully added!</div>";
        document.getElementById("success-message").classList.add("alert", "alert-success");
        return true;
    };  
};


function isValid(id) {
    if (document.getElementById(id).value == "") {
        return false;
    };
    return true;
};


function deleteEntry(id) {
    console.log(id);
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.id == id){
            todos.splice(i, 1);
        };    
    };

    updateHtmlTable();
    document.getElementById("success-message").innerHTML = "<div>ToDo successfully removed!</div>";
    document.getElementById("success-message").classList.add("alert", "alert-success");
};

function markDone(id) {
    console.log(id);
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.id == id){
            todos.splice(i, 1);
        };    
    };

    updateHtmlTable();
    document.getElementById("success-message").innerHTML = "<div>ToDo finished!</div>";
    document.getElementById("success-message").classList.add("alert", "alert-success");
};


function activateEditButtons() {

    let edittingButtons = document.getElementsByClassName("edit");

    for (let i = 0; i < edittingButtons.length; i++) {
        
        let edittingBtn = edittingButtons[i];
        
        edittingBtn.addEventListener("click",function(){
            console.log(edittingBtn.id);
            editEntry(edittingBtn.id)
            }
        );
    };   
};


function editEntry(id) {
    for (let i = 0; i < todos.length; i++) {
        if (`edit-${todos[i].id}` == id){
            console.log(todos[i]);
            activateEditMode(todos[i]);
        };      
    };
};


function activateEditMode(todo) {

    document.getElementById("todo-name").value = todo.name;
    document.getElementById("todo-description").value = todo.description;
    document.getElementById("todo-id").value = todo.id;

    document.getElementById("edit-btn").style = "";
    document.getElementById("add-btn").style = "dislpay: none";
};


function editTodo() {

    var todoId = document.getElementById("todo-id").value;
    var todo = todos.filter(todo => todo.id == todoId)[0];

    todo.name = document.getElementById("todo-name").value;
    todo.description = document.getElementById("todo-description").value;

    if(!inputValidation()) {
        return;
    }

    updateHtmlTable();
    clearForm();
    document.getElementById("edit-btn").style = "display: none";
    document.getElementById("success-message").innerHTML = "<div>ToDo successfully updated!</div>";
    document.getElementById("success-message").classList.add("alert", "alert-success");
};