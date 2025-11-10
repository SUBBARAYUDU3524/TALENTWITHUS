"use client";

import React, { useState, useEffect } from "react";
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

type Slot = { date: string; time: string };

const generateSlots = (): Slot[] => {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10);

  const hours = [10, 11, 12, 13, 14, 15, 16, 17];
  return hours.map(h => ({
    date: ymd,
    time: `${String(h).padStart(2, "0")}:00`,
  }));
};

export default function ScheduleCallModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<Slot | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [error, setError] = useState("");

  // ✅ Listen to real-time booked slots
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const q = query(collection(db, "calls"), where("date", "==", today));

    const unsub = onSnapshot(
      q,
      snap => {
        setBookedSlots(
          snap.docs.map(doc => ({
            date: doc.data().date,
            time: doc.data().time,
          }))
        );
      },
      err => console.error("Firestore Error", err)
    );

    return unsub;
  }, []);

  const availableSlots = generateSlots().filter(
    slot => !bookedSlots.some(b => b.date === slot.date && b.time === slot.time)
  );

  // ✅ Book slot
  const bookSlot = async () => {
    setError("");

    if (!selected || !email) {
      setError("Please fill all details");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "calls"), {
        date: selected.date,
        time: selected.time,
        email,
        createdAt: new Date().toISOString(),
        status: "pending",
      });
      setDone(true);
    } catch (err: any) {
      console.error(err);
      setError("Booking failed due to Firestore permissions.");
    }
    setLoading(false);
  };

  // ✅ SUCCESS SCREEN
  if (done)
    return (
      <div className="p-6 text-center bg-black/90 border border-white/10 rounded-2xl shadow-xl max-w-sm mx-auto backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-2 text-green-400">
          ✅ Booking Confirmed!
        </h2>
        <p className="text-gray-300">
          We emailed you the meeting details & Google Calendar invite.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    );

  // ✅ MAIN FORM
  return (
    <div className="p-6 bg-black/90 border border-white/10 rounded-2xl shadow-2xl max-w-sm mx-auto backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Schedule a Call
      </h2>

      {/* Email */}
      <label className="block mb-1 text-gray-300 font-medium">Your Email</label>
      <input
        type="email"
        className="w-full bg-black/40 border border-white/10 p-2 text-white rounded-lg mb-3 outline-none focus:ring-2 focus:ring-cyan-500"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      {/* Slots */}
      <label className="block mb-2 text-gray-300 font-medium">Choose a Slot</label>
      <div className="space-y-2 max-h-52 overflow-auto custom-scroll pr-1">
        {availableSlots.length === 0 && (
          <div className="text-red-400 font-medium">No slots available today.</div>
        )}

        {availableSlots.map((slot, i) => {
          const active = selected?.time === slot.time;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(slot)}
              className={`w-full p-2 rounded-lg border transition-all ${
                active
                  ? "bg-cyan-600 text-white border-cyan-500 shadow-lg"
                  : "border-white/10 text-gray-300 hover:bg-white/5"
              }`}
            >
              {slot.time} — {slot.date}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {/* Book */}
      <button
        onClick={bookSlot}
        disabled={!email || !selected || loading}
        className="mt-5 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg hover:opacity-90 transition-all disabled:opacity-40"
      >
        {loading ? "Booking..." : "✅ Book Call"}
      </button>

      <button
        onClick={onClose}
        className="mt-3 w-full text-gray-500 hover:text-gray-300 text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
