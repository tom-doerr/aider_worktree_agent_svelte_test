import { render, fireEvent } from '@testing-library/svelte';
import Task from './Task.svelte';

describe('Task', () => {
  const task = {
    id: 1,
    text: 'Test task',
    completed: false
  };

  it('renders task text', () => {
    const { getByText } = render(Task, { props: { task } });
    expect(getByText('Test task')).toBeInTheDocument();
  });

  it('toggles completed state', async () => {
    const mockToggle = jest.fn();
    const { getByRole } = render(Task, { 
      props: { task, onToggle: mockToggle } 
    });
    
    const checkbox = getByRole('checkbox');
    await fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalled();
  });

  it('calls delete handler', async () => {
    const mockDelete = jest.fn();
    const { getByRole } = render(Task, { 
      props: { task, onDelete: mockDelete } 
    });
    
    const button = getByRole('button', { name: 'Delete' });
    await fireEvent.click(button);
    expect(mockDelete).toHaveBeenCalled();
  });
});
