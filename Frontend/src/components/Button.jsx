import { forwardRef } from 'react'

/**
 * Shared Button component.
 * variant: 'primary' (default) | 'ghost'
 */
const Button = forwardRef(function Button(
  { children, variant = 'primary', className = '', onClick, disabled, type = 'button', ...rest },
  ref
) {
  const base =
    'inline-flex items-center justify-center gap-2 cursor-pointer outline-none ' +
    'rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ' +
    'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:
      'border-0 bg-gradient-to-br from-[#ff2d78] to-[#cc1f5f] text-white ' +
      'shadow-lg shadow-[#ff2d78]/20 hover:shadow-[#ff2d78]/40 hover:brightness-110',
    ghost:
      'border border-[#2a3348] bg-transparent text-[#7d8590] ' +
      'hover:bg-[#1c2230] hover:text-[#e6edf3] hover:border-[#3d4d66]',
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
