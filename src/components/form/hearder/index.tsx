import './header.scss'

interface IHeader {
  title: string;
  span: string;
}

export function HeaderForm({ title, span }: IHeader) {
  return (
    <header className="header">
      <h2 className="header__title">{title}</h2>
      <span className="header__paragraph">{span}</span>
    </header>
  );
}