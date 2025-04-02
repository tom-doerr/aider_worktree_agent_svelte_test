<script>
  import Task from './Task.svelte';
  
  let tasks = [];
  
  // Load tasks from localStorage on init
  if (typeof localStorage !== 'undefined') {
    try {
      const savedTasks = localStorage.getItem('tasks');
      tasks = savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
      console.error('Failed to load tasks', e);
    }
  }

  $: {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.error('Failed to save tasks', e);
        // Continue even if storage fails
      }
    }
  }
  let newTask = '';

  function addTask() {
    if (newTask.trim()) {
      tasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      newTask = '';
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
  }

  function toggleTask(id) {
    tasks = tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    );
  }
</script>

<div class="task-manager">
  <h1>Task Manager</h1>
  <p id="task-instructions" class="sr-only">Add tasks using the input field and button</p>
  
  <div class="add-task">
    <input
      aria-label="New task"
      bind:value={newTask}
      on:keydown={e => e.key === 'Enter' && addTask()}
      placeholder="Enter new task"
      aria-describedby="task-instructions"
    />
    <button on:click={addTask}>Add</button>
  </div>

  <p aria-live="polite">
    {#if tasks.length === 0}
      No tasks yet
    {:else}
      {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
    {/if}
  </p>
  
  {#if tasks.length > 0}
    <ul>
      {#each tasks as task (task.id)}
        <Task 
          {task}
          onDelete={() => deleteTask(task.id)}
          onToggle={() => toggleTask(task.id)}
        />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .task-manager {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  .add-task {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  input {
    flex-grow: 1;
    padding: 8px;
  }
</style>
