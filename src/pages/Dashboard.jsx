import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  FaFire,
  FaCalendarAlt,
  FaCheckCircle,
  FaPlus
} from "react-icons/fa";

import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from "firebase/firestore";

function Dashboard() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [date, setDate] = useState(new Date());

  const suggestedHabits = [
    "Drink 2L Water",
    "Read 10 Pages",
    "Workout",
    "Meditate",
    "Code for 1 Hour",
    "Journal Writing"
  ];

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "habits"),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    const habitList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setHabits(habitList);
  };

  const addHabit = async () => {
    if (!habit.trim()) return;

    const user = auth.currentUser;

    await addDoc(collection(db, "habits"), {
      name: habit,
      completed: false,
      userId: user.uid,
      createdAt: new Date().toLocaleDateString(),
      completedDate: null
    });

    setHabit("");
    fetchHabits();
  };

  const toggleComplete = async (id, currentStatus) => {
    const habitRef = doc(db, "habits", id);

    await updateDoc(habitRef, {
      completed: !currentStatus,
      completedDate: !currentStatus
        ? new Date().toLocaleDateString()
        : null
    });

    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await deleteDoc(doc(db, "habits", id));
    fetchHabits();
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const completedToday = habits.filter(
    (item) =>
      item.completedDate === new Date().toLocaleDateString()
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Good Morning, Heena ☀️
          </h1>
          <p className="text-gray-500">
            Let’s build consistency today.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
          <FaPlus className="text-2xl mb-2" />
          <h2>Total Habits</h2>
          <p className="text-3xl font-bold">
            {habits.length}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
          <FaCheckCircle className="text-2xl mb-2" />
          <h2>Completed Today</h2>
          <p className="text-3xl font-bold">
            {completedToday}
          </p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-2xl shadow">
          <FaFire className="text-2xl mb-2" />
          <h2>Pending</h2>
          <p className="text-3xl font-bold">
            {habits.filter((item) => !item.completed).length}
          </p>
        </div>
      </div>

      {/* Add Habit */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex gap-4">
          <input
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            placeholder="Add new habit..."
            className="border p-3 rounded-lg w-full"
          />

          <button
            onClick={addHabit}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* Suggested Habits */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Suggested Habits ✨
        </h2>

        <div className="flex flex-wrap gap-3">
          {suggestedHabits.map((item, index) => (
            <button
              key={index}
              onClick={() => setHabit(item)}
              className="bg-white px-4 py-2 rounded-full shadow hover:bg-blue-100"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="text-blue-500" />
          <h2 className="text-xl font-bold">
            Monthly Progress
          </h2>
        </div>

        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <div className="bg-white p-8 rounded-2xl shadow text-center mb-8">
          <h2 className="text-2xl font-bold">
            No habits yet ✨
          </h2>
          <p className="text-gray-500">
            Start building your future self today.
          </p>
        </div>
      )}

      {/* Pending Habits */}
      {habits.filter((item) => !item.completed).length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Pending Habits
          </h2>

          <div className="space-y-4 mb-8">
            {habits
              .filter((item) => !item.completed)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {item.createdAt}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        toggleComplete(
                          item.id,
                          item.completed
                        )
                      }
                      className="bg-green-500 text-white px-3 rounded"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        deleteHabit(item.id)
                      }
                      className="bg-red-500 text-white px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* Completed Habits */}
      {habits.filter((item) => item.completed).length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Completed Habits
          </h2>

          <div className="space-y-4">
            {habits
              .filter((item) => item.completed)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-green-50 p-4 rounded-xl shadow flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name} ✅
                    </p>

                    <p className="text-sm text-gray-500">
                      Created: {item.createdAt}
                    </p>

                    <p className="text-sm text-green-600">
                      Completed: {item.completedDate}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteHabit(item.id)
                    }
                    className="bg-red-500 text-white px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;