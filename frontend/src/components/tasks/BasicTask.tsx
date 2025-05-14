import React from 'react';
import { Task } from '../../types/task.types';

interface BasicTaskProps { task: Task; }
const BasicTask: React.FC<BasicTaskProps> = ({ task }) => (
    <div>
        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
        {task.description && <p className={`text-sm text-gray-600 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>}
    </div>
);
export default BasicTask;