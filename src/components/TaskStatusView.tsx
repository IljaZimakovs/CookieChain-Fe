interface T_TaskStatusView {
  currentTask: number;
  totalTask: number;
}

const TaskStatusView: React.FC<T_TaskStatusView> = ({
  currentTask,
  totalTask,
}) => {
  return (
    <h2 className="text-black text-[20px] px-4 relative font-medium font-rubik">
      Task ({currentTask + "/" + totalTask})
    </h2>
  );
};

export default TaskStatusView;
