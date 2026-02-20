import { utils, writeFile } from 'xlsx'
import { EXCEL_HEADERS } from '../constants'

export function exportToExcel(prospects) {
  const rows = prospects.map(p =>
    Object.fromEntries(
      Object.entries(EXCEL_HEADERS).map(([key, label]) => [label, p[key] ?? ''])
    )
  )
  const ws = utils.json_to_sheet(rows)
  ws['!cols'] = Object.values(EXCEL_HEADERS).map(() => ({ wch: 22 }))
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Prospects')
  const timestamp = new Date().toISOString().slice(0, 10)
  writeFile(wb, `prospects_${timestamp}.xlsx`)
}
