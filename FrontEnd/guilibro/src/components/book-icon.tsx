interface BookIconProps {
    className?: string
  }
  
  export default function BookIcon({ className = "" }: BookIconProps) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 4.53l2.76 1.84C17.82 8.14 19 8.45 19 12c0 3.55-1.18 3.86-4.24 5.63L12 19.47l-2.76-1.84C6.18 15.86 5 15.55 5 12c0-3.55 1.18-3.86 4.24-5.63L12 4.53z" />
      </svg>
    )
  }
  