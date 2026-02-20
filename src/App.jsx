import { useProspects } from './hooks/useProspects'
import { useToast } from './hooks/useToast'
import { ProspectForm } from './components/ProspectForm'
import { ProspectTable } from './components/ProspectTable'
import { Toast } from './components/Toast'

export default function App() {
  const { prospects, addProspect, clearAll } = useProspects()
  const { toasts, addToast, removeToast } = useToast()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h1 className="text-xl font-bold">Prospect Data Entry</h1>
            <p className="text-blue-200 text-xs">Sales Force Tool</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <ProspectForm onAdd={addProspect} onToast={addToast} />
        <ProspectTable prospects={prospects} onClearAll={clearAll} onToast={addToast} />
      </main>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </div>
  )
}
