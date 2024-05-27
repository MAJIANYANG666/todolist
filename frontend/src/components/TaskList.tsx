// TaskList.tsx
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]);
//   const history = useHistory();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTasks();
  }, []);

//   const handleTaskClick = (taskId: number) => {
//     history.push(`/tasks/${taskId}`);
//   };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task: any) => (
         <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
       </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
