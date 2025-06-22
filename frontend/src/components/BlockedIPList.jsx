export default function BlockedIPList({ blocked, unblockIP }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">⛔ Blocked IPs</h2>
      {blocked.length === 0 ? (
        <p>No IPs blocked</p>
      ) : (
        <ul>
          {blocked.map((ip) => (
            <li key={ip} className="flex justify-between items-center mb-2">
              <span>{ip}</span>
              <button
                onClick={() => unblockIP(ip)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
