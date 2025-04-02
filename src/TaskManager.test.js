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
});
