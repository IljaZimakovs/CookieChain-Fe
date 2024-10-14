interface T_TaskStatusView {
  currentTask: number;
  totalTask: number;
}

const TaskStatusView: React.FC<T_TaskStatusView> = ({
  currentTask,
  totalTask,
}) => {
  return (
    <h2 className="text-white text-xl font-semibold mb-4 font-Rubik">
      Task ({currentTask + "/" + totalTask})
    </h2>
  );
};

export default TaskStatusView;
