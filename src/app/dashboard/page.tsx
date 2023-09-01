import ButtonsPrimary from '@/src/components/buttons/primary'
import './dashboard.scss'

export default function Dashboard({text}) {
  return (
    <div>
      <h1 className="title">{text}</h1>
      <ButtonsPrimary>
        Click Here!
      </ButtonsPrimary>
    </div>
  )
}
