import { SOURCE_COLORS } from '../constants'
import { exportToExcel } from '../utils/exportExcel'

export function ProspectTable({ prospects, onClearAll, onToast }) {
  const handleExport = () => {
    if (!prospects.length) { onToast('No data to export!', 'error'); return }
    exportToExcel(prospects)
    onToast('Exported successfully!', 'success')
  }

  const handleClear = () => {
    if (window.confirm('Clear all entries? This cannot be undone.')) {
      onClearAll()
      onToast('All entries cleared.', 'success')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800">📋 Prospect Records</h2>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">{prospects.length} entry</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${prospects.length ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            📥 Export Excel
          </button>
          {prospects.length > 0 && (
            <button onClick={handleClear} className="text-sm font-semibold px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition">
              🗑 Clear All
            </button>
          )}
        </div>
      </div>

      {prospects.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm">No prospects yet. Fill in the form above to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Sales ID</th>
                <th className="px-3 py-2">Customer Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Program</th>
                <th className="px-3 py-2">KTP</th>
                <th className="px-3 py-2">Birthdate</th>
                <th className="px-3 py-2">Address</th>
                <th className="px-3 py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((p, i) => (
                <tr key={p.id} className="border-t odd:bg-white even:bg-gray-50">
                  <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-2 font-medium">{p.salesId}</td>
                  <td className="px-3 py-2">{p.customerName}</td>
                  <td className="px-3 py-2">{p.phone}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${SOURCE_COLORS[p.source] ?? 'bg-gray-400 text-white'}`}>{p.source}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-600 max-w-[140px] truncate">{p.marketingProgram || '-'}</td>
                  <td className="px-3 py-2">{p.ktpNumber || '-'}</td>
                  <td className="px-3 py-2">{p.birthdate || '-'}</td>
                  <td className="px-3 py-2 max-w-[140px] truncate">{p.address || '-'}</td>
                  <td className="px-3 py-2 text-gray-400 text-xs">{p.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
