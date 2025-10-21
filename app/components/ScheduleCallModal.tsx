import React, { useState, useEffect } from "react";
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from"../../FirebaseConfig";

type Slot = { date: string; time: string };

const generateSlots = (): Slot[] => {
  // For demo, generate slots for today 10am-5pm every hour
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10);
  return Array.from({ length: 8 }, (_, i) => ({
    date: ymd,
    time: `${String(10 + i).padStart(2, "0")}:00`,
  }));
};

export default function ScheduleCallModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<Slot | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);

  // Real-time booked slots listener
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const q = query(collection(db, "calls"), where("date", "==", today));
    const unsub = onSnapshot(q, snap => {
      setBookedSlots(snap.docs.map(doc => ({
        date: doc.data().date,
        time: doc.data().time,
      })));
    });
    return unsub;
  }, []);

  const availableSlots = generateSlots().filter(
    slot => !bookedSlots.some(b => b.date === slot.date && b.time === slot.time)
  );

  const bookSlot = async () => {
    if (!selected || !email) return;
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
    } catch {
      alert("Booking failed. Try again.");
    }
    setLoading(false);
  };

  if (done)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p>Check your email for details and a calendar invite.</p>
        <button onClick={onClose} className="mt-4 btn">Close</button>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule a Call</h2>
      <label className="block mb-2">Your Email</label>
      <input
        type="email"
        className="input mb-4 w-full border p-2 rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label className="block mb-2">Choose a slot</label>
      <div className="space-y-2 mb-4">
        {availableSlots.length === 0 && <div>No slots available today.</div>}
        {availableSlots.map((slot, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(slot)}
            className={`btn w-full border p-2 rounded ${selected === slot ? "bg-blue-500 text-white" : ""}`}
          >
            {slot.date} at {slot.time}
          </button>
        ))}
      </div>
      <button
        className="btn-primary w-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white px-4 py-2 rounded"
        onClick={bookSlot}
        disabled={!selected || !email || loading}
      >
        {loading ? "Booking..." : "Book Call"}
      </button>
    </div>
  );
}