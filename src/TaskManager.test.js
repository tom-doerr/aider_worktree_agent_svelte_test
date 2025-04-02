import { render, fireEvent } from '@testing-library/svelte';
import TaskManager from './TaskManager.svelte';

describe('TaskManager', () => {
  it('renders an empty task list', () => {
    const { getByText } = render(TaskManager);
    expect(getByText('No tasks yet')).toBeInTheDocument();
  });

  it('adds a new task', async () => {
    const { getByLabelText, getByText, getByRole } = render(TaskManager);
    const input = getByLabelText('New task');
    const button = getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'Test task' } });
    await fireEvent.click(button);

    expect(getByText('Test task')).toBeInTheDocument();
  });

  it('marks task as completed', async () => {
    const { getByLabelText, getByRole, getByText } = render(TaskManager);
    const input = getByLabelText('New task');
    const button = getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'Test task' } });
    await fireEvent.click(button);

    const checkbox = getByRole('checkbox');
    await fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('deletes a task', async () => {
    const { getByLabelText, getByRole, getByText, queryByText } = render(TaskManager);
    const input = getByLabelText('New task');
    const addButton = getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'Test task' } });
    await fireEvent.click(addButton);

    const deleteButton = getByRole('button', { name: 'Delete' });
    await fireEvent.click(deleteButton);

    expect(queryByText('Test task')).not.toBeInTheDocument();
  });

  it('does not add empty tasks', async () => {
    const { getByLabelText, getByRole, queryByText } = render(TaskManager);
    const input = getByLabelText('New task');
    const button = getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: '   ' } });
    await fireEvent.click(button);

    expect(queryByText('No tasks yet')).toBeInTheDocument();
  });

  it('persists tasks after adding', async () => {
    const { getByLabelText, getByRole, getByText } = render(TaskManager);
    const input = getByLabelText('New task');
    const button = getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'Task 1' } });
    await fireEvent.click(button);
    await fireEvent.input(input, { target: { value: 'Task 2' } });
    await fireEvent.click(button);

    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
  });

  it('adds task on Enter key', async () => {
    const { getByLabelText, getByText } = render(TaskManager);
    const input = getByLabelText('New task');

    await fireEvent.input(input, { target: { value: 'Enter task' } });
    await fireEvent.keyDown(input, { key: 'Enter' });

    expect(getByText('Enter task')).toBeInTheDocument();
  });

  it('shows completed task styling', async () => {
    const { getByLabelText, getByRole, getByText } = render(TaskManager);
    const input = getByLabelText('New task');
    const button = getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'Styled task' } });
    await fireEvent.click(button);

    const checkbox = getByRole('checkbox');
    await fireEvent.click(checkbox);
    
    const taskText = getByText('Styled task');
    expect(taskText).toHaveClass('completed');
  });

  it('shows input placeholder', () => {
    const { getByPlaceholderText } = render(TaskManager);
    expect(getByPlaceholderText('Enter new task')).toBeInTheDocument();
  });
});
