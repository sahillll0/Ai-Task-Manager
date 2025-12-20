
import Layout from '../Components/Layout';
import StatsCard from '../Components/StatsCard';
import { Search, Bell, Filter, MoreHorizontal, Calendar, CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';


const DashBoard = () => {



  const { tasks, status } = useTask();

  const navigate = useNavigate()

  const stats = [
    { title: 'Total Tasks', value: status.totalTask, icon: CheckCircle2, trend: 0 },
    { title: 'In Progress', value: status.inProgressTask, icon: Clock, trend: 0 },
    { title: 'Pending Reviews', value: status.isPendingTask, icon: AlertCircle, trend: 0 },
    { title: 'Completed', value: status.completeTask, icon: CheckCircle2, trend: 0 },
  ];



  const recentTasks = tasks.slice(0, 5);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Medium': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Low': return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
      default: return 'text-zinc-400 bg-zinc-400/10';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Progress': return 'text-blue-400';
      case 'Completed': return 'text-emerald-400';
      case 'Pending': return 'text-amber-400';
      default: return 'text-zinc-400';
    }
  };

  return (
   
    <Layout className="scrollbar-hide">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">Overview of your productivity and tasks.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-zinc-700 focus:bg-zinc-800/50 transition-all w-64 text-zinc-200 placeholder:text-zinc-600"
                />
              </div> */}

            <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </button>

            <button onClick={() => navigate('/add-task')} className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors">
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Tasks */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#09090b]">
            <h2 className="text-sm font-semibold text-white">Recent Tasks</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/50 bg-zinc-900/20">
                  <th className="p-4 pl-6 text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap">Task</th>
                  <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  {/* <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Project</th> */}
                  <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap">Priority</th>
                  <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap">Due</th>
                  <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {recentTasks.map((task, index) => (
                  <tr key={index} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="p-4 pl-6">
                      <span className="font-medium text-zinc-300 group-hover:text-white transition-colors text-sm whitespace-nowrap">{task.title}</span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${getStatusStyle(task.status)} whitespace-nowrap`}>
                        <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                        {task.status}
                      </span>
                    </td>
                    {/* <td className="p-4">
                        <span className="text-zinc-500 text-sm">{task.project}</span>
                      </td> */}
                    <td className="p-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wide ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-500 flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" />
                        {(() => {
                          const now = new Date();
                          const due = new Date(task.dueDate);
                          const diff = due.getTime() - now.getTime(); // Difference in milliseconds

                          if (diff < 0) {
                            return 'Overdue';
                          }

                          const seconds = Math.floor(diff / 1000);
                          const minutes = Math.floor(seconds / 60);
                          const hours = Math.floor(minutes / 60);
                          const days = Math.floor(hours / 24);

                          if (days > 0) {
                            return `${days} day${days > 1 ? 's' : ''} left`;
                          } else if (hours > 0) {
                            return `${hours} hour${hours > 1 ? 's' : ''} left`;
                          } else if (minutes > 0) {
                            return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
                          } else {
                            return 'Less than a minute left';
                          }
                        })()}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => navigate(`/tasks`)}
                        className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  
  );
};

export default DashBoard;