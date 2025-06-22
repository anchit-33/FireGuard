import { useEffect, useState } from "react";
import BlockedIPList from "./components/BlockedIPList";
import RequestLogs from "./components/RequestLogs";
import "./App.css";
export default function App() {
  const [blocked, setBlocked] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newIP, setNewIP] = useState("");

  const fetchBlocked = async () => {
    const res = await fetch("http://localhost:5000/api/blocked");
    const data = await res.json();
    setBlocked(data);
  };

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:5000/api/logs");
    const data = await res.json();
    setLogs(data);
  };

  const blockIP = async () => {
    if (!newIP) return;
    await fetch("http://localhost:5000/api/block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip: newIP }),
    });
    setNewIP("");
    fetchBlocked();
  };

  const unblockIP = async (ip) => {
    await fetch("http://localhost:5000/api/unblock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip }),
    });
    fetchBlocked();
  };

  useEffect(() => {
    fetchBlocked();
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-700 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-6">🔥 Real-Time IP Firewall</h1>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          value={newIP}
          onChange={(e) => setNewIP(e.target.value)}
          placeholder="Enter IP to block"
          className="border px-4 py-2 rounded w-full bg-zinc-500 text-white"
        />
        <button onClick={blockIP} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Block IP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlockedIPList blocked={blocked} unblockIP={unblockIP} />
        <RequestLogs logs={logs} />
      </div>
    </div>
  );
}
