const Button = ({ children, href, variant = 'primary' }) => {
  const className = `btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}`

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return <button className={className}>{children}</button>
}

export default Button
