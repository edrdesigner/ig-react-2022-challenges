import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>('@lc-todo-tasks', []);

  function handleAddTask(tasksTitle: string) {
    setTasks([
      ...tasks,
      { id: uuidv4(), title: tasksTitle, isCompleted: false },
    ]);
  }

  function handleDeleteTask(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function handleToggleTaskCompleted(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  return (
    <>
      <Header onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onComplete={handleToggleTaskCompleted}
      />
    </>
  );
}

export default App;
