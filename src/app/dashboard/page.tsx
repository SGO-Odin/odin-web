import ButtonsPrimary from '@/src/components/buttons/primary'

export default function Dashboard({text}) {
  return (
    <div>
      <h1>{text}</h1>
      <ButtonsPrimary>
        Click Here!
      </ButtonsPrimary>
    </div>
  )
}
