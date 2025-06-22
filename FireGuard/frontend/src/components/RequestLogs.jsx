export default function RequestLogs({ logs }) {
  return (
    <div className="bg-white p-4 rounded shadow max-h-[400px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">📈 Incoming Requests</h2>
      {logs.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <ul>
          {logs.map((log, idx) => (
            <li key={idx} className="text-sm text-gray-700 mb-1">
              <span className="font-medium">{log.ip}</span> - {new Date(log.time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
