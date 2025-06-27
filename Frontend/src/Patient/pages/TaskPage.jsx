import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CheckCircle, Circle, CalendarDays } from "lucide-react";
import { format } from "date-fns";

const TaskPage = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [taskName, setTaskName] = useState("");
  const [taskDays, setTaskDays] = useState("");
  const [today, setToday] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = format(new Date(), "yyyy-MM-dd");
      if (now !== today) {
        setToday(now);
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [today]);

  const addTask = () => {
    const days = parseInt(taskDays, 10);
    if (!taskName || isNaN(days) || days <= 0) return;
    const newTask = {
      id: Date.now(),
      name: taskName,
      days,
      createdAt: format(new Date(), "yyyy-MM-dd"),
      completions: [],
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDays("");
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const toggleCompletion = (taskId) => {
    const fun = () =>
      tasks.map((task) => {
        if (task.id === taskId) {
          const today = format(new Date(), "yyyy-MM-dd");
          const alreadyDone = task.completions.includes(today);
          return {
            ...task,
            completions: alreadyDone
              ? task.completions.filter((d) => d !== today)
              : [...task.completions, today],
          };
        }
        return task;
      });
    const val = fun(taskId);
    localStorage.setItem("tasks", JSON.stringify(val));
    setTasks(val);
  };

  const completedTasks = tasks.filter((task) =>
    task.completions.includes(today)
  );
  const pendingTasks = tasks.filter(
    (task) => !task.completions.includes(today)
  );

  const renderTaskCard = (task) => (
    <Card
      key={task.id}
      className="hover:shadow-lg transition border rounded-2xl"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-blue-800">
            {task.name}{" "}
            <span className="text-gray-500">({task.days} days)</span>
          </CardTitle>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleCompletion(task.id)}
            className="rounded-full hover:bg-green-100"
          >
            {task.completions.includes(today) ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-300"
              >
                <CalendarDays className="h-4 w-4 text-blue-600" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold mb-2 text-blue-700">
                {task.name} - History
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {Array.from({ length: task.days }).map((_, i) => {
                  const date = new Date(task.createdAt);
                  date.setDate(date.getDate() + i);
                  const formatted = format(date, "yyyy-MM-dd");
                  const completed = task.completions.includes(formatted);
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-white p-2 rounded-md shadow border"
                    >
                      <span className="text-sm text-gray-700">{formatted}</span>
                      {completed ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : (
                        <Circle className="text-gray-300" size={18} />
                      )}
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 rounded-xl shadow-xl">
      <Card className="border-blue-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Health Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Input
            placeholder="Enter Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="flex-1 rounded-full shadow"
          />
          <Input
            placeholder="Days"
            type="number"
            value={taskDays}
            onChange={(e) => setTaskDays(e.target.value)}
            className="w-32 rounded-full shadow"
          />
          <Button
            onClick={addTask}
            className="bg-green-500 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg"
          >
            + Add Task
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-1">
            📌 Pending Tasks
          </h2>
          <div className="space-y-4">
            {pendingTasks.length > 0 ? (
              pendingTasks.map(renderTaskCard)
            ) : (
              <p className="text-gray-400 italic">
                All caught up for today! 🎉
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-1">
            ✅ Completed Tasks
          </h2>
          <div className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map(renderTaskCard)
            ) : (
              <p className="text-gray-400 italic">
                Nothing completed yet. Keep going! 💪
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-1">
            📖 Overall History
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length === 0 ? (
              <p className="text-gray-400 italic">
                No tasks yet. Start adding some to track your journey! 🚀
              </p>
            ) : (
              tasks.map((task) => (
                <Card
                  key={task.id}
                  className="border border-gray-200 shadow-md bg-white hover:shadow-xl transition rounded-xl"
                >
                  <CardHeader className="pb-1">
                    <CardTitle className="text-lg font-semibold text-blue-800">
                      {task.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Start:</span>{" "}
                      {task.createdAt}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> {task.days}{" "}
                      days
                    </p>
                    <p>
                      <span className="font-medium">Completions:</span>{" "}
                      {task.completions.length}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
