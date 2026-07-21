import LeadForm from "./lead-form";
import Link from "next/link";

type EntryLandingProps = {
  eyebrow: string;
  title: string;
  lead: string;
  source: string;
  result: string;
  format: string;
  duration: string;
  situations: string[];
  deliverables: Array<{ title: string; text: string }>;
  steps: string[];
  boundary: string;
  image: string;
  imageAlt: string;
};

export default function EntryLanding(props: EntryLandingProps) {
  return (
    <main className="entry-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="LEONTIEVA — на главную"><img src="/lm-icon.jpg" alt="" /><span><strong>LEONTIEVA</strong><small>ПРОДЮСЕРСКИЙ ЦЕНТР</small></span></Link>
        <nav aria-label="Навигация"><a href="#situation">Когда полезно</a><a href="#result">Результат</a><a href="#process">Как работаем</a></nav>
        <a className="header-cta" href="#contact">Обсудить задачу</a>
      </header>

      <section className="entry-hero" id="top">
        <div className="entry-hero-copy"><p className="eyebrow">{props.eyebrow}</p><h1>{props.title}</h1><p className="hero-lead">{props.lead}</p><div className="hero-actions"><a className="button button-gold" href="#contact">Проверить, подходит ли формат</a><a className="text-link text-link-light" href="#result">Что вы получите <span>↘</span></a></div><p className="hero-note">Первый разговор — 20 минут на взаимную квалификацию задачи, не бесплатная консультация.</p></div>
        <figure className="entry-hero-media"><img src={props.image} alt={props.imageAlt} /><figcaption><span>Результат</span><strong>{props.result}</strong></figcaption></figure>
      </section>

      <section className="entry-summary" aria-label="Условия формата"><div><span>Формат</span><b>{props.format}</b></div><div><span>Срок</span><b>{props.duration}</b></div><div><span>Стоимость</span><b>После квалификации; фиксируется в предложении</b></div></section>

      <section className="entry-situations" id="situation"><div className="section-heading"><div><p className="section-kicker">Когда формат особенно полезен</p><h2>Есть реальная задача,<br />а не запрос «хотим PR»</h2></div><p>На входе нужны факты, ответственный человек и понимание, к какому решению или изменению мы идём.</p></div><div className="entry-situation-grid">{props.situations.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></section>

      <section className="entry-result" id="result"><div className="entry-result-intro"><p className="section-kicker">Что вы получаете</p><h2>Не рекомендации,<br />а готовый продукт</h2><p>Состав, границы и критерии приёмки фиксируются до старта. Внешние расходы и новые контуры согласовываются отдельно.</p></div><div className="entry-deliverables">{props.deliverables.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

      <section className="entry-process" id="process"><div><p className="section-kicker">Рабочий маршрут</p><h2>От вводных<br />до применения</h2></div><ol>{props.steps.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>

      <section className="entry-boundary"><p className="section-kicker">Граница ответственности</p><h2>{props.boundary}</h2><p>Мы отвечаем за согласованный продукт, качество подготовки и управление процессом. Решения редакций, органов власти, партнёров и аудитории остаются решениями третьих лиц.</p></section>

      <section className="contact-section entry-contact" id="contact"><div className="contact-copy"><p className="section-kicker">Первый шаг</p><h2>Проверим задачу и предложим следующий формат</h2><p>Если по итогам короткого разговора видим совпадение, запрашиваем вводные и готовим предложение: продукт, границы, сроки, стоимость и приёмка.</p><a className="contact-email contact-email-light" href="mailto:pr@leontieva-media.ru">pr@leontieva-media.ru</a></div><LeadForm source={props.source} /></section>

      <footer><Link className="brand footer-brand" href="/"><img src="/lm-icon.jpg" alt="" /><span><strong>LEONTIEVA</strong><small>ПРОДЮСЕРСКИЙ ЦЕНТР</small></span></Link><div className="footer-links"><Link href="/strategy/">Стратегия</Link><Link href="/interview/">Интервью</Link><Link href="/support/">Сопровождение</Link></div><p>© 2026 LEONTIEVA</p></footer>
    </main>
  );
}
