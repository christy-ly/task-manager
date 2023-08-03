import React from 'react'
import { Task } from '../model/Task'



type Props = {
    taskList: Task[];
    onDelete: (id: number) => void;
}

function TaskList({ taskList, onDelete }: Props) {
    return (
        <div>


            <table className="table table-bordered">
                <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Category</th>
                    <th></th>
                </tr>


                {taskList.map((task) => {
                    return (<tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.category}</td>
                        <td><button onClick={() => onDelete(task.id)}>Delete</button></td>
                    </tr>
                    )
                })}

            </table>
        </div>




    )
}

export default TaskList;