import { TbClipboardText } from 'react-icons/tb';
import { ITask } from '../../App';
import { Task } from '../Task';
import styles from './taskList.module.css';

interface TaskListProps {
  tasks: ITask[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Concluídas</p>
          <span>{`${completedTasks} de ${tasks.length}`}</span>
        </div>
      </header>
      <section className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <div className={styles.empty}>
            <TbClipboardText size={50} />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
