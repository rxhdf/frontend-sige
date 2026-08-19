import { useEffect, useState } from 'react'
import cobaoLogo from '@/assets/cobao_logo.svg'

// Duraciones acordadas con el usuario tras comparar
// docs/Design_Interfaces_Templates/Splash_Screen/opcion-2-relleno.html
// (Opción 2, Relleno ascendente) -- el relleno ahí corre en loop infinito
// solo para comparar variantes; aquí se reproduce UNA vez en el arranque
// real y luego cede paso al contenido.
const REVEAL_MS = 3000
const HOLD_MS = 500
const FADE_MS = 400

interface SplashScreenProps {
  onFinish: () => void
}

// Logo real sin alterar (misma técnica de máscara CSS que el mockup, no
// una recreación) -- ver docs/Design_Interfaces_Templates/Splash_Screen/
// para el resto de variantes exploradas y por qué se descartaron.
export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), REVEAL_MS + HOLD_MS)
    const finishTimer = setTimeout(onFinish, REVEAL_MS + HOLD_MS + FADE_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-md bg-background"
      style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease`, pointerEvents: fading ? 'none' : 'auto' }}
    >
      <style>{`
        .splash-logo-mask {
          -webkit-mask-image: url(${cobaoLogo});
          mask-image: url(${cobaoLogo});
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-size: contain;
          mask-size: contain;
        }
        .splash-logo-fill-dim {
          background-color: #d9dadb;
        }
        .splash-logo-fill-primary {
          background-color: #b5000b;
          animation: splash-rise-reveal ${REVEAL_MS}ms cubic-bezier(.65,0,.35,1) forwards;
        }
        @keyframes splash-rise-reveal {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0% 0 0 0); }
        }
      `}</style>
      <div className="relative w-40 h-40 sm:w-48 sm:h-48">
        <div className="splash-logo-mask splash-logo-fill-dim absolute inset-0" />
        <div className="splash-logo-mask splash-logo-fill-primary absolute inset-0" />
      </div>
      <div className="flex flex-col items-center -mt-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">SIGE</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Sistema Integral de Gestión Educativa</p>
      </div>
    </div>
  )
}
