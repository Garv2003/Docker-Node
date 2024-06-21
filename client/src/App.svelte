<script lang="ts">
  import { onMount } from "svelte";

  let tasks: string[] = [];
  let taskName = "";

  function addTask() {
    fetch("http://localhost:6969/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        tasks = [...tasks, data.task];
        taskName = "";
      });
  }

  function deleteTask(task: string, i: number) {
    fetch("http://localhost:6969/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: task }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        tasks = tasks.filter((t, index) => index !== i);
      });
  }

  function updateTask(task: string, i: number) {
    const newTaskName = prompt("Enter new task name");
    if (newTaskName) {
      fetch("http://localhost:6969/tasks/" + task + "/" + newTaskName, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          tasks = tasks.map((t, index) => {
            if (index === i) {
              return newTaskName;
            }
            return t;
          });
        });
    }
  }

  onMount(() => {
    fetch("http://localhost:6969/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        tasks = data.tasks;
      });
  });
</script>

<main>
  <h1>Tasks</h1>
  <input type="text" bind:value={taskName} />
  <button on:click={addTask}>Add Task</button>
  {#if tasks.length > 0}
    <ul>
      {#each tasks as task, i}
        <li>{task}</li>
        <span>
          <button
            on:click={() => {
              deleteTask(task, i);
            }}>Delete</button
          >
          <button
            on:click={() => {
              updateTask(task, i);
            }}>Update</button
          >
        </span>
      {/each}
    </ul>
  {/if}
</main>
