'use client'

import { Download, ChevronDown } from 'lucide-react'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'

interface ExportButtonProps {
  onExportCSV?: () => void
  onExportPDF?: () => void
}

export function ExportButton({ onExportCSV, onExportPDF }: ExportButtonProps) {
  return (
    <Dropdown
      trigger={
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4" />
          Export
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      }
    >
      {onExportCSV && (
        <DropdownItem onClick={onExportCSV}>
          Export as CSV
        </DropdownItem>
      )}
      {onExportPDF && (
        <DropdownItem onClick={onExportPDF}>
          Export as PDF
        </DropdownItem>
      )}
    </Dropdown>
  )
}
