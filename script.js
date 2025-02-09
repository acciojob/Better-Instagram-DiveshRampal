// Get the images and the parent container
const images = document.querySelectorAll('.image');
const parent = document.getElementById('parent');

// Track the currently dragged element
let draggedItem = null;

// Add the dragstart event to each image
images.forEach(image => {
  image.addEventListener('dragstart', (event) => {
    draggedItem = event.target;
    // Add a class to make the dragged item appear semi-transparent
    draggedItem.classList.add('dragging');
  });

  image.addEventListener('dragend', () => {
    // Remove the dragging class once the drag ends
    draggedItem.classList.remove('dragging');
    draggedItem = null;
  });

  // Handle the dragover event to allow dropping
  parent.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow dropping
    const afterElement = getDragAfterElement(parent, event.clientY);
    if (afterElement == null) {
      parent.appendChild(draggedItem);
    } else {
      parent.insertBefore(draggedItem, afterElement);
    }
  });
});

// Get the element after which the dragged item will be inserted
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.image:not(.dragging)')];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
