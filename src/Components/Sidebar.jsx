import { LayoutDashboard, CheckSquare, Sparkles, PieChart, Plus, User, X, Code, Link } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import {useNavigate} from 'react-router-dom';

const Sidebar = ({ onCloseMobile }) => {

    const { info } = useTask();
    const navigate = useNavigate()

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: Sparkles, label: 'AI Assistant', path: '/ai-insights' },
        // { icon: FolderOpen, label: 'Projects', path: '/projects' },
        { icon: PieChart, label: 'Analytics', path: '/analytics', badge: 'BETA' },
        // { icon: Code, label: 'About Dev', path: '/dev' },
        // { icon: Users, label: 'Team', path: '/team' },
        { icon: Plus, label: 'New Task', path: '/add-task' },
    ];

    return (
        <aside className="w-64 h-full bg-[#09090b] border-r border-white/5 flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
                <div 
                    onClick={() => navigate('/dev')}
                    className="flex items-center justify-around gap-2 cursor-pointer"
                    title="Click to See Developer Details"
                >
                    <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                        <div className="w-3 h-3 bg-black rounded-sm" />
                    </div>
                    <span className="font-semibold text-white tracking-wide">Tasker</span>
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/dev');
                        }}
                        className="ml-auto p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-all cursor-pointer"
                        title="Developer Details"
                    >
                        <Code size={16} />
                    </div>
                </div>
                {/* Mobile Close Button */}
                <button
                    onClick={onCloseMobile}
                    className="lg:hidden p-1 -mr-2 text-zinc-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-0.5 overflow-y-auto">
                <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Platform</p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onCloseMobile}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${isActive
                                ? 'bg-zinc-800/50 text-white'
                                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                            }
                        `}
                    >
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-500/10 text-purple-400 rounded border border-purple-500/20">
                                {item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}

                <div className="mt-8">
                    <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Configuration</p>
                    <NavLink
                        to="/profile"
                        onClick={onCloseMobile}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${isActive ? 'bg-zinc-800/50 text-white' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'}
                        `}
                    >
                        <User className="w-4 h-4 shrink-0" />
                        <span>Profile</span>
                    </NavLink>
                </div>
            </nav>

            {/* Profile */}
            <div className="p-4 border-t border-white/5 shrink-0">
                <NavLink
                    to="/profile"
                    onClick={onCloseMobile}
                    className="flex items-center gap-3 hover:bg-zinc-800/50 p-2 rounded-lg transition-colors"
                >
                    <img
                        src={info?.profilePic || `https://api.dicebear.com/7.x/initials/svg?seed=${info?.name || 'User'}`}
                        alt="User"
                        className="w-8 h-8 rounded-full ring-2 ring-zinc-800 bg-zinc-700 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{info.name}</p>
                        <p className="text-xs text-zinc-500 truncate">Pro Workspace</p>
                    </div>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
