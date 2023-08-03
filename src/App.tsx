import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import { Task } from './model/Task'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'

const App = () => {

  // const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const storedTasks = window.localStorage.getItem("taskList");
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  });

  const [filteredTaskList, setFilteredTaskList] = useState<Task[]>(taskList);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    window.localStorage.setItem("taskList", JSON.stringify(taskList));
    setFilteredTaskList(taskList);
  }, [taskList]);

  const handleAddTask = (task: Omit<Task, "id">) => {
    setTaskList([...taskList, { id: Date.now(), ...task }]);
  };

  const handleDeleteTask = (id: number) => {
    setTaskList(taskList.filter(task => task.id != id));
    setFilteredTaskList(taskList);
  }

  useEffect(() => {
    setFilteredTaskList(selectedCategory == "" ? taskList : taskList.filter(task => task.category == selectedCategory));
  }, [selectedCategory]);

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
      <TaskFilter onSelectCategory={setSelectedCategory} />
      {filteredTaskList == undefined || filteredTaskList.length == 0 ? <label>No tasks yet.</label> : <TaskList taskList={filteredTaskList} onDelete={handleDeleteTask} />}
    </div>
  )
}

export default App;
