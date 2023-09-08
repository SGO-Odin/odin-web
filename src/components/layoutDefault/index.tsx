import { Aside } from './aside';
import './layoutDefault.scss'
import { Menu } from './menu';

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <section className="layoutDefault">
      <Aside/>
      <div className="layoutDefault__content">
        <Menu/>
        {children}
      </div>
    </section>
  )
}
