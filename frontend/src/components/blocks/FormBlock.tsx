'use client'
import { useState } from 'react'
import { submitForm } from '@/lib/payload'

type Props = {
  heading?: string
  subheading?: string
  form?: any
  style?: 'inline' | 'card' | 'fullwidth'
}

export default function FormBlock({ heading, subheading, form, style = 'card' }: Props) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  if (!form) return null

  const fields: any[] = form.fields || []

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await submitForm(form.id, values)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: style === 'fullwidth' ? 'var(--color-deep)' : 'var(--color-cream)' }}
    >
      <div className={`mx-auto ${style === 'fullwidth' ? 'max-w-3xl' : 'max-w-2xl'}`}>
        {(heading || subheading) && (
          <div className="text-center mb-10">
            {heading && (
              <h2
                className="text-4xl font-light mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: style === 'fullwidth' ? 'white' : 'var(--color-deep)',
                }}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p style={{ color: style === 'fullwidth' ? 'rgba(255,255,255,0.75)' : 'var(--color-muted)' }}>
                {subheading}
              </p>
            )}
          </div>
        )}

        <div
          className={`p-8 ${style === 'card' ? 'shadow-lg' : ''}`}
          style={{
            backgroundColor: style === 'card' ? 'white' : 'transparent',
            borderRadius: '2px',
          }}
        >
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-deep)' }}>
                {form.confirmationMessage || 'Thank you! We\'ll be in touch soon.'}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field: any) => (
                <div key={field.name}>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {field.label}
                    {field.required && ' *'}
                  </label>
                  {field.blockType === 'textarea' ? (
                    <textarea
                      required={field.required}
                      rows={4}
                      value={values[field.name] || ''}
                      onChange={e => setValues(v => ({ ...v, [field.name]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border-b bg-transparent outline-none focus:border-b-2 transition-all"
                      style={{
                        borderColor: 'var(--color-blush)',
                        color: 'var(--color-text)',
                      }}
                    />
                  ) : field.blockType === 'select' ? (
                    <select
                      required={field.required}
                      value={values[field.name] || ''}
                      onChange={e => setValues(v => ({ ...v, [field.name]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border-b bg-transparent outline-none"
                      style={{ borderColor: 'var(--color-blush)', color: 'var(--color-text)' }}
                    >
                      <option value="">Select…</option>
                      {field.options?.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.blockType === 'email' ? 'email' : field.blockType === 'number' ? 'number' : 'text'}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={values[field.name] || ''}
                      onChange={e => setValues(v => ({ ...v, [field.name]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border-b bg-transparent outline-none transition-all"
                      style={{ borderColor: 'var(--color-blush)', color: 'var(--color-text)' }}
                    />
                  )}
                </div>
              ))}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 text-sm tracking-widest uppercase font-light transition-all duration-300 disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-deep)', color: 'white' }}
              >
                {status === 'loading' ? 'Sending…' : form.submitButtonLabel || 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
