import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newSubTask, setNewSubTask] = useState('');

  useEffect(() => {
    async function fetchTask() {
      const taskResponse = await axios.get(`/api/tasks/${taskId}`);
      setTask(taskResponse.data);

      const commentsResponse = await axios.get(`/api/comments/task/${taskId}`);
      setComments(commentsResponse.data);

      const subTasksResponse = await axios.get(`/api/tasks/${taskId}/subtasks`);
      setSubTasks(subTasksResponse.data);
    }

    fetchTask();
  }, [taskId]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    await axios.post('/api/comments', {
      content: newComment,
      taskId: task.id,
      authorId: task.id/* 当前用户 ID */,
    });

    setNewComment('');
    const commentsResponse = await axios.get(`/api/comments/task/${taskId}`);
    setComments(commentsResponse.data);
  };

  const handleSubTaskSubmit = async () => {
    if (newSubTask.trim() === '') return;

    await axios.post(`/api/tasks/${taskId}/subtasks`, {
      title: newSubTask,
      description: '',
      status: 'pending',
    });

    setNewSubTask('');
    const subTasksResponse = await axios.get(`/api/tasks/${taskId}/subtasks`);
    setSubTasks(subTasksResponse.data);
  };

  const completeSubTask = async (subTaskId: number) => {
    await axios.patch(`/api/tasks/subtasks/${subTaskId}/complete`);
    const subTasksResponse = await axios.get(`/api/tasks/${taskId}/subtasks`);
    setSubTasks(subTasksResponse.data);
  };

  return (
    <div>
      {task && (
        <>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.author.name}:</strong> {comment.content}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleCommentSubmit}>Submit</button>

          <h3>Subtasks</h3>
          <ul>
            {subTasks.map(subTask => (
              <li key={subTask.id}>
                {subTask.title}
                {subTask.status !== 'completed' && (
                  <button onClick={() => completeSubTask(subTask.id)}>Complete</button>
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newSubTask}
            onChange={e => setNewSubTask(e.target.value)}
            placeholder="Add a subtask"
          />
          <button onClick={handleSubTaskSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default TaskDetail;
