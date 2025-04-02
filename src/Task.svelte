<script>
  export let task;
  export let onDelete;
  export let onToggle;
</script>

<li class="task">
  <input
    type="checkbox"
    checked={task.completed}
    on:change={onToggle}
    aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
    aria-checked={task.completed}
  />
  <span class:completed={task.completed}>{task.text}</span>
  <button on:click={onDelete}>Delete</button>
</li>

<style>
  .task {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
  }
  .completed {
    text-decoration: line-through;
    opacity: 0.7;
  }
</style>
