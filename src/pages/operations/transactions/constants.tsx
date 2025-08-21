import React from 'react'
import { ColumnDefinition } from '@/types/common'
import { TransactionAlert, ClientTransactionRow, BrokerTransactionRow } from '@/types/transactions'
import StatusChip from '@/components/common/StatusChip'
import FileCell from '@/components/common/FileCell'

export const transactionsAlertColumns: ColumnDefinition<TransactionAlert>[] = [
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
]

export const clientTransactionColumns: ColumnDefinition<ClientTransactionRow>[] = [
  {
    id: 'reconciled',
    header: 'Reconciled',
    accessorKey: 'reconciled',
    render: (value) => <StatusChip status={value} />,
  },
  {
    id: 'tradeDate',
    header: 'Trade Date',
    accessorKey: 'tradeDate',
  },
  {
    id: 'fund',
    header: 'Fund',
    accessorKey: 'fund',
  },
  {
    id: 'account',
    header: 'Account',
    accessorKey: 'account',
  },
  {
    id: 'type',
    header: 'Type',
    accessorKey: 'type',
  },
  {
    id: 'contract',
    header: 'Contract',
    accessorKey: 'contract',
  },
  {
    id: 'marketType',
    header: 'Market Type',
    accessorKey: 'marketType',
  },
  {
    id: 'commission',
    header: 'Commission',
    accessorKey: 'commission',
  },
  {
    id: 'cPeriod',
    header: 'c.Period',
    accessorKey: 'cPeriod',
  },
  {
    id: 'currency',
    header: 'Currency',
    accessorKey: 'currency',
  },
  {
    id: 'value',
    header: 'Value',
    accessorKey: 'value',
    render: (value) => value?.toFixed(2),
  },
  {
    id: 'usdValue',
    header: 'USD Value',
    accessorKey: 'usdValue',
    render: (value) => value?.toFixed(2),
  },
  {
    id: 'lots',
    header: 'Lots',
    accessorKey: 'lots',
  },
  {
    id: 'from',
    header: 'From',
    accessorKey: 'from',
  },
  {
    id: 'to',
    header: 'To',
    accessorKey: 'to',
  },
  {
    id: 'grace',
    header: 'Grace',
    accessorKey: 'grace',
  },
  {
    id: 'toPlusGrace',
    header: 'To + Grace',
    accessorKey: 'toPlusGrace',
  },
  {
    id: 'info',
    header: 'Info',
    accessorKey: 'info',
  },
  {
    id: 'mode',
    header: 'Mode',
    accessorKey: 'mode',
  },
]

export const brokerTransactionColumns: ColumnDefinition<BrokerTransactionRow>[] = [
  {
    id: 'reconciled',
    header: 'Reconciled',
    accessorKey: 'reconciled',
    render: (value) => <StatusChip status={value} />,
  },
  {
    id: 'date',
    header: 'Date',
    accessorKey: 'date',
  },
  {
    id: 'fund',
    header: 'Fund',
    accessorKey: 'fund',
  },
  {
    id: 'account',
    header: 'Account',
    accessorKey: 'account',
  },
  {
    id: 'type',
    header: 'Type',
    accessorKey: 'type',
  },
  {
    id: 'contract',
    header: 'Contract',
    accessorKey: 'contract',
  },
  {
    id: 'currency',
    header: 'Currency',
    accessorKey: 'currency',
  },
  {
    id: 'value',
    header: 'Value',
    accessorKey: 'value',
    render: (value) => value?.toFixed(2),
  },
  {
    id: 'usdValue',
    header: 'USD Value',
    accessorKey: 'usdValue',
    render: (value) => value?.toFixed(2),
  },
  {
    id: 'lots',
    header: 'Lots',
    accessorKey: 'lots',
  },
  {
    id: 'info',
    header: 'Info',
    accessorKey: 'info',
  },
  {
    id: 'mode',
    header: 'Mode',
    accessorKey: 'mode',
  },
  {
    id: 'file',
    header: 'File',
    accessorKey: 'file',
    render: (value) => <FileCell filePath={value} />,
  },
]
