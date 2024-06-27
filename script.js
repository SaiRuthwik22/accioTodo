let clicked = false
let todayTodos = localStorage.getItem("todayTodos")?JSON.parse(localStorage.getItem("todayTodos")):[]
let futureTodos = localStorage.getItem("futureTodos")?JSON.parse(localStorage.getItem("futureTodos")):[]
let completedTodos=localStorage.getItem("completedTodos")?JSON.parse(localStorage.getItem("completedTodos")):[]


let dateObj = new Date()
let day = dateObj.getDate();
let month = dateObj.getMonth() + 1;
let year = dateObj.getFullYear();
if (month < 10) {
    month = '0' + month;
}
if (day < 10) {
    day = '0' + day;
}
let formattedDate = year+"-"+month+"-"+day

todayTodos = todayTodos.filter((ele)=>{
    if((String(ele.date)<String(formattedDate))){
        completedTodos.push(ele)
    }
    else{
        return ele
    }
})

futureTodos = futureTodos.filter((ele)=>{
    if(String(ele.date)==String(formattedDate)){
        todayTodos.push(ele)
    }
    else{
        return ele
    }
})
renderToday()
renderFuture()
renderCompleted()


function toggleClicked(){
    clicked = true
}


function addItem() {
    let text = document.getElementById("text").value
    let date = document.getElementById("date").value
    let selectElement = document.getElementById("dropdown")
    let selectedOption = selectElement.value
    if(text && date && clicked){
        if (String(date)<String(formattedDate)) {
            alert("You Can not Enter past Date")
            return
        } else if(String(date)==String(formattedDate)){
            let todos = {todo:text,date:date,priority:selectedOption,completed:false}
            todayTodos.push(todos)
            localStorage.setItem("todayTodos",JSON.stringify(todayTodos))
            renderToday()
        }
        else{
            let todos = {todo:text,date:date,priority:selectedOption,completed:false}
            futureTodos.push(todos)
            localStorage.setItem("futureTodos",JSON.stringify(futureTodos))
            renderFuture()
        }

    }
    else{
        alert("Enter all details")
        return
    }
}


function renderToday(){
    let section1 = document.getElementById("section1")
    let count = 1
    
    section1.innerHTML=" <h3>Today's TodoList</h3>"
    let todayHigh = todayTodos.filter((ele)=>{
        if(String(ele.date) == String(formattedDate)&& ele.priority == "High" && ele.completed==false){
            return ele
        }
    })
    let todayMed = todayTodos.filter((ele)=>{
        if(String(ele.date) == String(formattedDate)&& ele.priority == "Medium" && ele.completed==false){
            return ele
        }
    })
    let todayLow = todayTodos.filter((ele)=>{
        if(String(ele.date) == String(formattedDate)&& ele.priority == "Low" && ele.completed==false){
            return ele
        }
    })
    todayHigh.map((ele)=>{
        section1.innerHTML += `   
        <div class="today-todo-container">
            <div class="todo-box">
                <div class="todo"><p>${count}.${ele.todo} </p></div>
                <div class="items">               
                 <p>${ele.date}</p>
                    <p>${ele.priority}</p>
                    <div class="image-container">
                        <button><img src="./assets/completed.png" alt="completed" onclick="toggleComplete('${ele.todo}','${ele.date}','${ele.priority}','today')"></button>
                        <button><img src="./assets/delete.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','today')" ></button>
                    </div></div>
            </div>
        </div>`;
        count +=1
    })
    todayMed.map((ele)=>{
        section1.innerHTML += `   
        <div class="today-todo-container">
            <div class="todo-box">
                <div class="todo"><p>${count}.${ele.todo} </p></div>
                <div class="items">               
                 <p>${ele.date}</p>
                    <p>${ele.priority}</p>
                    <div class="image-container">
                        <button><img src="./assets/completed.png" alt="completed" onclick="toggleComplete(${JSON.stringify(ele)},'today')"></button>
                        <button><img src="./assets/delete.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','today')"></button>
                    </div></div>
            </div>
        </div>`;
        count +=1
    })
    todayLow.map((ele)=>{
        section1.innerHTML += `   
        <div class="today-todo-container">
            <div class="todo-box">
                <div class="todo"><p>${count}.${ele.todo} </p></div>
                <div class="items">               
                 <p>${ele.date}</p>
                    <p>${ele.priority}</p>
                    <div class="image-container">
                        <button><img src="./assets/completed.png" alt="completed" onclick="toggleComplete(${JSON.stringify(ele)},'today')"></button>
                        <button><img src="./assets/delete.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','today')"></button>
                    </div></div>
            </div>
        </div>`;
        count +=1
    })
}


function renderFuture(){
    let section2 = document.getElementById("section2")
    let count = 1
    section2.innerHTML=" <h3>Future's TodoList</h3>"
        let futureHigh = futureTodos.filter((ele)=>ele.priority == "High")
        let futureMed = futureTodos.filter((ele)=>ele.priority=="Medium")
        let futureLow = futureTodos.filter((ele)=>ele.priority=="Low")
        futureHigh.map((ele)=>{
            section2.innerHTML += `   
            <div class="today-todo-container">
                <div class="todo-box">
                    <div class="todo"><p>${count}.${ele.todo} </p></div>
                    <div class="items">               
                     <p>${ele.date}</p>
                        <p>${ele.priority}</p>
                        <div class="image-container">
                            <button><img src="./assets/completed.png" alt="completed" onclick="toggleComplete('${ele.todo}','${ele.date}','${ele.priority}','future')"></button>
                            <button><img src="./assets/delete.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','future')"></button>
                        </div></div>
                </div>
            </div>`;
            count +=1
        })
        futureMed.map((ele)=>{
            section2.innerHTML += `   
            <div class="today-todo-container">
                <div class="todo-box">
                    <div class="todo"><p>${count}.${ele.todo} </p></div>
                    <div class="items">               
                     <p>${ele.date}</p>
                        <p>${ele.priority}</p>
                        <div class="image-container">
                            <button><img src="./assets/completed.png" alt="completed" onclick="toggleComplete('${ele.todo}','${ele.date}','${ele.priority}','future')"></button>
                            <button><img src="./assets/delete.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','future')"></button>
                        </div></div>
                </div>
            </div>`;
            count +=1
        })
        futureLow.map((ele)=>{
            section2.innerHTML += `   
            <div class="today-todo-container">
                <div class="todo-box">
                    <div class="todo"><p>${count}.${ele.todo} </p></div>
                    <div class="items">               
                     <p>${ele.date}</p>
                        <p>${ele.priority}</p>
                        <div class="image-container">
                            <button><img src="./assets/completed.png" alt="completed" onclick="toggleComplete('${ele.todo}','${ele.date}','${ele.priority}','future')"></button>
                            <button><img src="./assets/delete.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','future')"></button>
                        </div></div>
                </div>
            </div>`;
            count +=1
        })
}


function renderCompleted(){
    let section3 = document.getElementById("section3")
    let count = 1

    section3.innerHTML = "<h3>Completed TodoList</h3>"
    let completedHigh = completedTodos.filter((ele)=>{
        if(ele.priority == "High" ){
            return ele
        }
    })
    let completedMed = completedTodos.filter((ele)=>{
        if(ele.priority == "Medium" ){
            return ele
        }
    })
    let completedLow = completedTodos.filter((ele)=>{
        if(ele.priority == "Low" ){
            return ele
        }
    })
    completedHigh.map((ele)=>{
        section3.innerHTML +=`
        <div class="today-todo-container">
            <div class="completed-todo-container">
                <div class="todo"><p>${count}.${ele.todo}</p></div>
                <div class="items">          
                    <p>${ele.date}</p>
                    <p>${ele.priority}</p>
                    <div class="image-container">
                        <button><img src="./assets/completed2.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','completed')" ></button>
                    </div></div>
            </div>
        </div>`;
        count +=1
    })
    completedMed.map((ele)=>{
        section3.innerHTML +=`
        <div class="today-todo-container">
            <div class="completed-todo-container">
                <div class="todo"><p>${count}.${ele.todo}</p></div>
                <div class="items">          
                    <p>${ele.date}</p>
                    <p>${ele.priority}</p>
                    <div class="image-container">
                        <button><img src="./assets/completed2.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','completed')"></button>
                    </div></div>
            </div>
        </div>`;
        count +=1
    })
    completedLow.map((ele)=>{
        section3.innerHTML +=`
        <div class="today-todo-container">
            <div class="completed-todo-container">
                <div class="todo"><p>${count}.${ele.todo}</p></div>
                <div class="items">          
                    <p>${ele.date}</p>
                    <p>${ele.priority}</p>
                    <div class="image-container">
                        <button><img src="./assets/completed2.png" alt="delete" onclick="deleteTodo('${ele.todo}','${ele.date}','${ele.priority}','completed')"></button>
                    </div></div>
            </div>
        </div>`;
        count +=1
    })
}

function toggleComplete(todo,date,priority,text){
    let fullTodo = {todo:todo,date:date,priority:priority,completed:true}
    completedTodos.push(fullTodo)
    if(text=='today'){
        todayTodos = todayTodos.filter((ele)=>{
            return !(ele.todo == todo && (String(ele.date)==String(date)))
        })
        localStorage.setItem("todayTodos",JSON.stringify(todayTodos))
        renderToday()
    }
    else if(text == 'future'){
        futureTodos = futureTodos.filter((ele)=>{
            return !(ele.todo == todo && (String(ele.date)== String(date)))
        })
        localStorage.setItem("futureTodos",JSON.stringify(futureTodos))
        renderFuture()
    }
    localStorage.setItem("completedTodos",JSON.stringify(completedTodos))
    renderCompleted()
}

function deleteTodo(todo,date,priority,text){
    if(text == 'today'){
        todayTodos = todayTodos.filter((ele)=>{
            return !(ele.todo == todo && String(ele.date) == String(date))
        })
        localStorage.setItem("todayTodos",JSON.stringify(todayTodos))
        renderToday()
        
    }
    else if(text == 'future'){
        futureTodos = futureTodos.filter((ele)=>{
            return !(ele.todo == todo && String(ele.date)==String(date))
        })
        localStorage.setItem("futureTodos",JSON.stringify(futureTodos))
        renderFuture()
    }
    else if(text == 'completed'){
        completedTodos = completedTodos.filter((ele)=>{
            return !(ele.todo == todo && String(ele.date)==String(date))
        })
        localStorage.setItem("completedTodos",JSON.stringify(completedTodos))
        renderCompleted()
    }
}