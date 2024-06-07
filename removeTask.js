
function taskDeleted(btnDeletedElement) {
  let id = btnDeletedElement.parentNode.parentNode.getAttribute('data-task-id');
  tasks[id].deleted = true;

  let confirming =   confirm("Are you sure you want to delete it?");
 
  if (confirming == true) {
       displayTasks();
    } else return
  }







/*
async function taskDeleted(btnDeletedElement) {
  let id = btnDeletedElement.parentNode.parentNode.getAttribute('data-task-id');
  // tasks[id].deleted = true;

  let confirming = confirm("Are you sure you want to delete it?");

  if (confirming == true) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })
    tasks.find((task) => Number(task.id).toString() === id).deleted = true

    displayTasks();
  } else return
}

*/

