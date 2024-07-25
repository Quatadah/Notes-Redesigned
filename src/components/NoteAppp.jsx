"use client";
import {
  Calendar,
  Clock,
  Home,
  Menu,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Settings,
  SkipForward,
  Sun,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./plate-ui/button";

const NoteAppp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Morning exercise", done: true, time: "06:50" },
    { id: 2, name: "Breakfast", done: true, time: "07:20" },
    {
      id: 3,
      name: "Learn how to use grid in user interface design",
      done: false,
      time: "07:25 - 08:15",
    },
    {
      id: 4,
      name: "Daily meeting - Dashboard App",
      done: false,
      time: "08:30 - 08:45",
    },
    {
      id: 5,
      name: "Designing UI for Dashboard App",
      done: false,
      time: "08:50 - 10:15",
    },
    { id: 6, name: "Play God Of War", done: false, time: "10:20 - 10:45" },
  ]);

  const [currentTaskIndex, setCurrentTaskIndex] = useState(2);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimeLeft(sessionType === "work" ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const skipTask = useCallback(() => {
    const nextTaskIndex = (currentTaskIndex + 1) % tasks.length;
    setCurrentTaskIndex(nextTaskIndex);
    setSessionType("work");
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }, [currentTaskIndex, tasks.length]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (sessionType === "work") {
        setSessionType("break");
        setTimeLeft(5 * 60); // 5 minutes break
      } else {
        skipTask();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType, skipTask]);

  const addTask = (taskName) => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      done: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTasks([...tasks, newTask]);
  };

  const completedTasks = tasks.filter((task) => task.done).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="min-h-screen transition-colors duration-200 bg-background text-foreground">
      {/* Header */}
      <header className="shadow-md bg-card">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 text-muted-foreground">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-card-foreground">
              Pomodoro App
            </h1>
          </div>
          <button onClick={toggleTheme} className="text-muted-foreground">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      <div className="container flex px-4 py-8 mx-auto">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-200 ease-in-out`}
        >
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">
              Menu
            </h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-muted-foreground hover:text-primary"
                  >
                    <Home size={20} className="mr-2" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-muted-foreground hover:text-primary"
                  >
                    <Calendar size={20} className="mr-2" />
                    Schedule
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-muted-foreground hover:text-primary"
                  >
                    <Settings size={20} className="mr-2" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow ml-0 transition-all duration-200 ease-in-out md:ml-64">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Tasks and Progress section */}
            <div className="space-y-8">
              {/* Tasks List */}
              <div className="overflow-hidden rounded-lg shadow-lg bg-card">
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                    Tasks List ({tasks.length} Tasks)
                  </h2>
                  <ul className="space-y-3">
                    {tasks.map((task, index) => (
                      <li key={task.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="w-5 h-5 mr-3 rounded text-primary border-muted form-checkbox focus:ring-primary"
                        />
                        <span
                          className={`flex-grow ${task.done
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                            }`}
                        >
                          {task.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {task.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => addTask(`New Task ${tasks.length + 1}`)}
                  >
                    + Add Task
                  </Button>
                </div>
              </div>

              {/* Daily Progress */}
              <div className="overflow-hidden rounded-lg shadow-lg bg-card">
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                    Daily Progress
                  </h2>
                  <div className="flex items-center mb-2">
                    <div className="px-3 py-1 mr-2 text-sm text-white rounded-full bg-primary">
                      {completedTasks}/{tasks.length}
                    </div>
                    <span className="text-muted-foreground">Tasks completed</span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="relative pt-1">
                    <div className="flex h-2 mb-4 overflow-hidden text-xs rounded bg-secondary">
                      <div
                        style={{ width: `${progress}%` }}
                        className="flex flex-col justify-center text-center text-white shadow-none bg-primary whitespace-nowrap"
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-sm font-semibold text-primary">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer section */}
            <div className="overflow-hidden rounded-lg shadow-lg bg-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-primary">
                    {sessionType === "work" ? "Work Session" : "Break Time"}
                  </span>
                  <button className="text-muted-foreground">
                    <Clock size={24} />
                  </button>
                </div>
                <div className="mb-8 text-center">
                  <h1 className="text-6xl font-bold text-card-foreground">
                    {formatTime(timeLeft)}
                  </h1>
                </div>
                <p className="mb-8 text-center text-muted-foreground">
                  #{currentTaskIndex + 1} - {tasks[currentTaskIndex].name}
                </p>
                <div className="flex justify-center space-x-6">
                  <button
                    className="p-3 transition-colors duration-200 rounded-full text-muted-foreground bg-muted hover:bg-muted-foreground"
                    onClick={resetTimer}
                  >
                    <RotateCcw size={28} />
                  </button>
                  <button
                    className="p-5 transition-colors duration-200 rounded-full bg-primary hover:bg-primary-foreground"
                    onClick={isRunning ? pauseTimer : startTimer}
                  >
                    {isRunning ? <Pause size={36} /> : <Play size={36} />}
                  </button>
                  <button
                    className="p-3 transition-colors duration-200 rounded-full text-muted-foreground bg-muted hover:bg-muted-foreground"
                    onClick={skipTask}
                  >
                    <SkipForward size={28} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NoteAppp;
