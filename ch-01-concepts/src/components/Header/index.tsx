import { ChangeEvent, FormEvent, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import logo from '../../assets/logo.svg';
import styles from './header.module.css';

interface HeaderProps {
  onAddTask: (title: string) => void;
}

export function Header({ onAddTask }: HeaderProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onAddTask(title);
    setTitle('');
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" />
      <form
        id="form-add-task"
        className={styles.newTaskForm}
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Adicione uma nova tarefa"
          type="text"
          value={title}
          onChange={handleChangeTitle}
        />
        <button>
          Criar <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
