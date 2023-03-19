type DraggableContainerProps = {
  tasks: Task[];
};

const DraggableContainer = ({ tasks }: DraggableContainerProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasksInProgress(items.filter(t => t.category === 'inprogress'));
    setTasksDone(items.filter(t => t.category === 'done'));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='tasks'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className='tasks__task'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h2 className='title'>{task.title}</h2>
                    <
