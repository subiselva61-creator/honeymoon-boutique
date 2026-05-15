import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import config from '@payload-config'
import type { ServerFunctionClient } from 'payload'
import React from 'react'

import { importMap } from './admin/importMap.js'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function serverFunction(args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function PayloadLayout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
