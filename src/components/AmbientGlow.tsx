export default function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full opacity-30 blur-[110px] animate-[drift_22s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, #7C5CFC, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-[120px] animate-[drift_26s_ease-in-out_infinite_reverse]"
        style={{ background: 'radial-gradient(circle, #FF6B4A, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #D946A8, transparent 70%)' }}
      />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
      `}</style>
    </div>
  )
}
