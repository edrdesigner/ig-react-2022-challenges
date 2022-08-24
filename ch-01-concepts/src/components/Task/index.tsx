import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import styles from './task.module.css';
import { ITask } from '../../App';

interface TaskProps {
  task: ITask;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function Task({ task, onComplete, onDelete }: TaskProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.id)}
      >
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>
      <p className={task.isCompleted ? styles.textCompleted : ''}>
        {task.title}
      </p>
      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
