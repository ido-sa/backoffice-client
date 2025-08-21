import React from 'react'
import { ColumnDefinition } from '@/types/common'
import { FillAlert, FillRow } from '@/types/fills'
import StatusChip from '@/components/common/StatusChip'
import FileCell from '@/components/common/FileCell'

export const fillsAlertColumns: ColumnDefinition<FillAlert>[] = [
  {
    id: 'date',
    header: 'DATE',
    accessorKey: 'date',
  },
  {
    id: 'brokerName',
    header: 'BROKER',
    accessorKey: 'brokerName',
  },
  {
    id: 'contractName',
    header: 'CONTRACT',
    accessorKey: 'contractName',
  },
]

export const fillsTableColumns: ColumnDefinition<FillRow>[] = [
  {
    id: 'reconciled',
    header: 'Reconciled',
    accessorKey: 'reconciled',
    render: (value) => <StatusChip status={value} />,
  },
  {
    id: 'side',
    header: 'Side',
    accessorKey: 'side',
  },
  {
    id: 'lots',
    header: 'Lots',
    accessorKey: 'lots',
  },
  {
    id: 'price',
    header: 'Price',
    accessorKey: 'price',
    render: (value) => value?.toFixed(2),
  },
  {
    id: 'mode',
    header: 'Mode',
    accessorKey: 'mode',
  },
  {
    id: 'finalName',
    header: 'Final Name',
    accessorKey: 'finalName',
  },
  {
    id: 'time',
    header: 'Time',
    accessorKey: 'time',
  },
  {
    id: 'excRef',
    header: 'Exc Ref',
    accessorKey: 'excRef',
  },
  {
    id: 'file',
    header: 'File',
    accessorKey: 'file',
    render: (value) => <FileCell filePath={value} />,
  },
]
