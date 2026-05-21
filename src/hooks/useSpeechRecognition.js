import { useCallback, useEffect, useRef, useState } from 'react'

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

export function useSpeechRecognition({ lang, onTranscript, onSessionEnd }) {
  const recognitionRef = useRef(null)
  const finalIndexRef = useRef(0)
  const [status, setStatus] = useState('idle')
  const [errorKey, setErrorKey] = useState(null)

  const supported = Boolean(SpeechRecognition)

  const resetSession = useCallback(() => {
    finalIndexRef.current = 0
  }, [])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setStatus('idle')
  }, [])

  const start = useCallback(() => {
    if (!SpeechRecognition) {
      setStatus('unsupported')
      setErrorKey('unsupported')
      return
    }

    stop()
    resetSession()

    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      resetSession()
      setStatus('listening')
      setErrorKey(null)
    }

    recognition.onresult = (event) => {
      let interim = ''

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i]
        const text = result[0]?.transcript ?? ''

        if (result.isFinal) {
          if (i >= finalIndexRef.current && text) {
            onTranscript({ final: text })
            finalIndexRef.current = i + 1
          }
        } else {
          interim += text
        }
      }

      if (interim) {
        onTranscript({ interim })
      }
    }

    recognition.onerror = (event) => {
      if (event.error === 'aborted') return
      setStatus('error')
      setErrorKey(event.error === 'not-allowed' ? 'permission' : 'generic')
      recognitionRef.current = null
      resetSession()
    }

    recognition.onend = () => {
      setStatus((current) => (current === 'listening' ? 'idle' : current))
      recognitionRef.current = null
      resetSession()
      onSessionEnd?.()
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [lang, onTranscript, onSessionEnd, resetSession, stop])

  const toggle = useCallback(() => {
    if (status === 'listening') {
      stop()
    } else {
      start()
    }
  }, [status, start, stop])

  useEffect(() => () => stop(), [stop])

  return {
    supported,
    status,
    errorKey,
    isListening: status === 'listening',
    start,
    stop,
    toggle,
  }
}
