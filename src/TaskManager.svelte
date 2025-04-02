<script>
  import Task from './Task.svelte';
  
  let tasks = [];
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
  
  <div class="add-task">
    <input
      aria-label="New task"
      bind:value={newTask}
      on:keydown={e => e.key === 'Enter' && addTask()}
      placeholder="Enter new task"
    />
    <button on:click={addTask}>Add</button>
  </div>

  {#if tasks.length === 0}
    <p>No tasks yet</p>
  {:else}
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
  input {
    flex-grow: 1;
    padding: 8px;
  }
</style>
