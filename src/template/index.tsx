import ButtonsPrimary from '@/src/components/buttons/primary'
import './dashboard.scss'

interface IDashboard {
  text: string
}

export function Dashboard({text} : IDashboard) {
  return (
    <div>
      <h1 className="title">{text}</h1>
      <ButtonsPrimary>
        Click Here!
      </ButtonsPrimary>
    </div>
  )
}
