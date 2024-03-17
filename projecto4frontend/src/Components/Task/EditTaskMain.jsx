import React from "react";
import './EditTaskMain.module.css';
import { useNavigate } from "react-router-dom";

const EditTaskMain = () => {
  return (
    <main class="main-task">
        <div class="detalhes-task">
            <div class="breadcrumb">
                <ul>
                  <li class="link-bc" id="link-bc"><a href="home.html">Home</a></li>
                </ul>
                <label id="taskCreator">TASK CREATOR:</label>
              </div>
              <div>
                <label class="labelEditTask" for="titulo-task">TITLE</label> 
                <textarea id="titulo-task">Task 1</textarea>
            </div>
            <div>
                <label class="labelEditTask" for="descricao-task">DESCRIPTION</label> 
                <textarea class="text-task" id="descricao-task"></textarea>
            </div>
           
            <p id="warningMessage3"></p>
            <div class="task-save">
                <button class="save-button" id="save-button">Save</button>
                <button class="cancel-button" id="cancel-button">Cancel</button>
            </div>
        </div>
        <div class="task-buttons">
            <div class="status-and-priority">
                <div class="task-status">
                    <h4 class="taskH4">status</h4>
                    <div class="status-buttons">
                        <button class="status-button todo" id="todo-button">To do</button>
                        <button class="status-button doing" id="doing-button">Doing</button>
                        <button class="status-button done" id="done-button">Done</button>
                    </div>
                </div>        
                <div class="task-priority">
                    <h4 class="taskH4">priority</h4>
                    <div class="priority-buttons">
                        <button class="priority-button low" id="low-button">Low</button>
                        <button class="priority-button medium" id="medium-button">Medium</button>
                        <button class="priority-button high" id="high-button">High</button>
                    </div>
                </div>
                <div id="taskDate">
                    <div>
                        <label class="labelEditTask" for="startdate">INITIAL DATE</label>
                        <input class = "dateinput" id ="startdateEditTask" type ="date" placeholder="Start-date" />
                    </div>
                    <div>
                        <label class="labelEditTask" for="enddate">FINAL DATE</label>
                        <input class = "dateinput" id ="enddateEditTask" type ="date" placeholder="End-date" />
                            
                    </div>
                    <div>
                        <label class="labelEditTask" for="category">CATEGORY</label>
                        <select id="categoryEditTask"></select>
                      </div>
                </div>
            </div>
        </div>
    </main>
    );
}

export default EditTaskMain;