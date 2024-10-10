'use client'

import React, { useEffect } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }

    // Select the custom element directly and attach the event listener
    const uploadCtxProvider = document.querySelector('lr-upload-ctx-provider')

    uploadCtxProvider?.addEventListener('file-upload-success', handleUpload)

    // Cleanup on unmount
    return () => {
      uploadCtxProvider?.removeEventListener('file-upload-success', handleUpload)
    }
  }, [onUpload, router])

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="750abd291cf6c0dd8b28"
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />

      <lr-upload-ctx-provider ctx-name="my-uploader" />
    </div>
  )
}

export default UploadCareButton
