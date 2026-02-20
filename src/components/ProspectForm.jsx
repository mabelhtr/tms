import { useState } from 'react'
import { SOURCES } from '../constants'
import { validateForm } from '../utils/validate'

const EMPTY = { salesId: '', customerName: '', phone: '', source: '', marketingProgram: '', ktpNumber: '', address: '', birthdate: '' }

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputClass = (err) =>
  `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${err ? 'border-red-500' : 'border-gray-300'}`

export function ProspectForm({ onAdd, onToast }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const handle = (e) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'source' && value !== 'Marketing Activity' ? { marketingProgram: '' } : {})
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validateForm(values)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onAdd(values)
    onToast('Prospect added successfully!', 'success')
    setValues(EMPTY)
    setErrors({})
  }

  const reset = () => { if (window.confirm('Clear the form?')) { setValues(EMPTY); setErrors({}) } }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-5">➕ Add New Prospect</h2>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Sales ID" required error={errors.salesId}>
            <input name="salesId" value={values.salesId} onChange={handle} placeholder="e.g. SLS-001" className={inputClass(errors.salesId)} />
          </Field>
          <Field label="Customer Name" required error={errors.customerName}>
            <input name="customerName" value={values.customerName} onChange={handle} placeholder="Full name" className={inputClass(errors.customerName)} />
          </Field>
          <Field label="Phone Number" required error={errors.phone}>
            <input name="phone" type="tel" value={values.phone} onChange={handle} placeholder="e.g. 08123456789" className={inputClass(errors.phone)} />
          </Field>
          <Field label="Source" required error={errors.source}>
            <select name="source" value={values.source} onChange={handle} className={inputClass(errors.source)}>
              <option value="">-- Select source --</option>
              {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="KTP Number" error={errors.ktpNumber}>
            <input name="ktpNumber" value={values.ktpNumber} onChange={handle} placeholder="16-digit KTP number (optional)" className={inputClass(errors.ktpNumber)} />
          </Field>
          <Field label="Birthdate" error={errors.birthdate}>
            <input name="birthdate" type="date" value={values.birthdate} onChange={handle} className={inputClass(errors.birthdate)} />
          </Field>
        </div>

        {values.source === 'Marketing Activity' && (
          <Field label="Marketing Activity Program" required error={errors.marketingProgram}>
            <input name="marketingProgram" value={values.marketingProgram} onChange={handle} placeholder="e.g. Q1 Email Campaign, Webinar March 2025" className={inputClass(errors.marketingProgram)} />
          </Field>
        )}

        <Field label="Address" error={errors.address}>
          <textarea name="address" value={values.address} onChange={handle} placeholder="Full address (optional)" rows={2} className={inputClass(errors.address) + ' resize-none'} />
        </Field>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
            ✓ Submit
          </button>
          <button type="button" onClick={reset} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition">
            ✕ Clear
          </button>
        </div>
      </form>
    </div>
  )
}
