
let todos = [];

let id = 0;

function updateHtmlTable() {

    // 3 - foreach todo list
    let generatedHtml = "";
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        // 4 - generate row
        let tableRow = 
        `<tr>
            <td>${todo.name}</td>
            <td>${todo.description}</td>
            <td>
                <div class="delete btn btn-danger" onclick="deleteEntry(${todo.id});">delete</div>
            </td>
        </tr>`;
        // 5 - merge generated table
        generatedHtml = generatedHtml + tableRow;
    }

    // 1 - get table html element
    // 2 - get tbody of that table
    let tbodyElement = document.getElementById("tasks-table");
    // 6 - modify tbody.innerHtml into our newly generated one
    tbodyElement.innerHTML = generatedHtml;
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
    todos.push(todo);

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
    document.getElementById("error").innerHTML = "";

    if ( isValid("todo-name") ) {
        document.getElementById("error").innerHTML = "<h3>New ToDo added!</h3>"
        return true;
    };

    if ( !isValid("todo-description") && !isValid("todo-name") ) {
        document.getElementById("error").innerHTML = "<h3>Please add new ToDo!</h3>"
        };
    
    if ( !isValid("todo-name") && isValid("todo-description") ) {
        document.getElementById("error").innerHTML = "<h3>Please add ToDo name!</h3>"
        };
}

function isValid(id) {
    if (document.getElementById(id).value == "") {
        return false;
    };
    return true;
}

function inputValidationV2() {
    document.getElementById("error").innerHTML = ""

    if ( isValid("todo-name") ) {
        return true;
    };

    if ( !isValid("todo-description") && !isValid("todo-name") ) {
        document.getElementById("error").innerHTML += "<h1>Please add new ToDo!</h1>"
        return false;
    };
    
    // if ( !isValid("todo-name") ) {
    //     document.getElementById("error").innerHTML += "<h1>Please add ToDo name!</h1>"
    //     };

    // return false;

}

function deleteEntry(id) {
    console.log(id);
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.id == id){
            todos.splice(i, 1);
        }
        
    }

    updateHtmlTable();
}

// function activateDeleteBtn() {
//     let deleteBtns = document.getElementsByClassName("delete");

//     for (let i = 0; i < deleteBtns.length; i++) {
//         const btn = deleteBtns[i];
//         btn.addEventListener("click",function(){
//         console.log(btn.id)
//         })
//     };
// }