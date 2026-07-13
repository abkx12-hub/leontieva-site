import { headers } from "next/headers";
import { redirect } from "next/navigation";

const redirectHosts = new Set([
  "www.leontieva.media",
  "leontievamedia.ru",
  "www.leontievamedia.ru",
]);

const services = [
  {
    number: "01",
    label: "Начать отсюда",
    title: "Медиадиагностика",
    text: "Разбираем текущий публичный образ, материалы, задачу и ограничения. Показываем, что усиливать и в какой последовательности.",
    points: ["разбор позиционирования", "сильные темы и риски", "варианты первого маршрута"],
    link: "Запросить диагностику →",
  },
  {
    number: "02",
    title: "Стратегическая сессия",
    text: "Собираем цель, аудитории, роль, доказательства и направления развития в единую рабочую карту.",
    points: ["протокол решений", "карта смыслов", "дорожная карта"],
    link: "Обсудить задачу →",
  },
  {
    number: "03",
    title: "Продюсерское сопровождение",
    text: "Управляем медиапланом, подготовкой активностей, командой и регулярной корректировкой стратегии.",
    points: ["календарь и медиаплан", "подготовка к выходам", "анализ и следующий шаг"],
    link: "Узнать о формате →",
  },
];

const cases = [
  {
    type: "Производственная компания",
    title: "От отдельных выходов — к сопровождению первого лица",
    rows: [
      ["Задача", "Собрать образ предпринимателя и связать его с реальными достижениями бизнеса."],
      ["Работа", "Позиционирование, темы, медиаплан, календарь, подготовка интервью."],
      ["Результат", "Единая модель регулярного сопровождения вместо разовых PR-активностей."],
    ],
  },
  {
    type: "Экспертный проект",
    title: "Подготовка к ТВ, интервью и публичным выступлениям",
    rows: [
      ["Задача", "Сделать экспертизу понятной редакции и аудитории."],
      ["Работа", "Темы, тезисы, сложные вопросы, репетиция подачи и материалы."],
      ["Результат", "Готовность к выходам и материалы, которые можно использовать повторно."],
    ],
  },
  {
    type: "Стратегический контур",
    title: "Когда медийная задача связана с бизнесом и партнёрствами",
    rows: [
      ["Задача", "Разделить несколько целей и не смешать их в одном медиаплане."],
      ["Работа", "Стратегическая сессия, сценарии, риски, роли и контрольные точки."],
      ["Результат", "Маршрутная карта и отдельные проекты с понятными границами."],
    ],
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("host") ?? "").split(":")[0].toLowerCase();

  if (redirectHosts.has(host)) {
    redirect("https://leontieva.media");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LEONTIEVA — продюсерский центр, на главную">
          <img src="/lm-icon.jpg" alt="" />
          <span><strong>LEONTIEVA</strong><small>ПРОДЮСЕРСКИЙ ЦЕНТР</small></span>
        </a>
        <nav aria-label="Навигация">
          <a href="#services">Форматы</a><a href="#approach">Подход</a><a href="#cases">Кейсы</a><a href="#team">Команда</a>
        </nav>
        <a className="header-cta" href="#contact">Обсудить задачу</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Продюсерский центр для бизнеса и экспертов</p>
          <h1>Выводим бизнес и основателей <em>в публичное поле</em></h1>
          <p className="hero-lead">Строим не набор публикаций, а систему: позиционирование, сильные темы, подготовка к СМИ, календарь активностей и анализ результата.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#contact">Получить медиаразбор</a>
            <a className="text-link text-link-light" href="#cases">Посмотреть, как мы работаем <span>↘</span></a>
          </div>
          <p className="hero-note">Без обещаний «гарантированного эфира». Сначала — задача, факты и подходящий маршрут.</p>
        </div>
        <div className="hero-media">
          <img src="/lm-brand-panel.png" alt="LEONTIEVA — стратегия, медиа, доверие" />
          <div className="hero-media-caption"><span>Стратегия</span><span>Медиа</span><span>Доверие</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Основные направления">
        <div><strong>01</strong><span>Медиастратегия</span></div><div><strong>02</strong><span>СМИ и ТВ</span></div><div><strong>03</strong><span>Продюсирование</span></div><div><strong>04</strong><span>Публичный образ</span></div>
      </section>

      <section className="intro-section">
        <div className="section-title"><p className="section-kicker">Когда нужен продюсерский подход</p><h2>Экспертиза уже есть.<br />Её нужно правильно показать.</h2></div>
        <div className="intro-copy">
          <p className="lead-paragraph">Мы подключаемся, когда отдельные интервью, соцсети и публикации не складываются в убедительный образ человека или бизнеса.</p>
          <ul className="check-list"><li>непонятно, с какой темой выходить в публичное поле;</li><li>много материалов, но нет единой линии и календаря;</li><li>есть страх камеры или сложных вопросов;</li><li>подрядчики предлагают размещения, но не объясняют общую стратегию.</li></ul>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading"><div><p className="section-kicker">Три формата работы</p><h2>Понятный первый шаг.<br />Без лишнего объёма.</h2></div><p>Начинаем с минимального формата, который помогает принять решение. Большое сопровождение предлагаем только когда оно действительно нужно.</p></div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card ${index === 0 ? "service-card-featured" : ""}`} key={service.number}>
              {service.label && <span className="card-label">{service.label}</span>}
              <p className="service-number">{service.number}</p><h3>{service.title}</h3><p>{service.text}</p>
              <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul><a href="#contact">{service.link}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="approach-copy"><p className="section-kicker">Почему это не обычный PR</p><h2>Система вместо случайных активностей</h2><p>Каждый выход должен быть связан с ролью клиента, задачей бизнеса и следующим шагом. Поэтому мы фиксируем решения, зависимости и результат — не держим проект в переписках и обещаниях.</p><ol className="mini-process"><li><b>Диагностика</b><span>цель, факты, ограничения</span></li><li><b>Стратегия</b><span>роль, темы, маршрут</span></li><li><b>Подготовка</b><span>календарь, материалы, площадки</span></li><li><b>Результат</b><span>выходы, анализ, корректировка</span></li></ol></div>
        <figure className="process-figure"><img src="/process-example.png" alt="Пример карты продюсерского процесса" /><figcaption>Пример рабочей карты: от входных данных до контрольной точки и следующего решения.</figcaption></figure>
      </section>

      <section className="cases-section" id="cases">
        <div className="section-heading"><div><p className="section-kicker">Примеры задач</p><h2>Не обещания.<br />Логика реальной работы.</h2></div><p>Публичные версии кейсов пока обезличены. После согласования добавим имена, фотографии, площадки и подтверждённые результаты.</p></div>
        <div className="case-grid">
          {cases.map((item) => <article className="case-card" key={item.title}><p className="case-type">{item.type}</p><h3>{item.title}</h3><dl>{item.rows.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></article>)}
        </div>
      </section>

      <section className="scope-section">
        <div><p className="section-kicker">Больше, чем PR</p><h2>Дополнительные контуры — только когда они нужны</h2></div>
        <div className="scope-grid"><article><b>Стратегический офис</b><p>Сведение публичных, бизнес- и репутационных задач в одну управленческую карту.</p></article><article><b>Книга и собственное медиа</b><p>Отдельные редакционные проекты с собственной целью, командой и бюджетом.</p></article><article><b>Переговорная архитектура</b><p>Подготовка сложных встреч, рамок, вопросов, решений и следующих шагов.</p></article><article><b>Специальные проекты</b><p>Партнёрские, общественные и репутационные инициативы после отдельной диагностики.</p></article></div>
      </section>

      <section className="fit-section">
        <div className="fit-card fit-card-positive"><p className="section-kicker">Подойдём, если</p><h3>У вас есть факты, опыт и готовность участвовать</h3><p>Вы хотите выстроить долгосрочное доверие, готовы давать материалы, выделять время и принимать решения по этапам.</p></div>
        <div className="fit-card"><p className="section-kicker">Не подойдём, если</p><h3>Нужна известность «быстро и гарантированно»</h3><p>Мы не продаём обещания конкретного эфира, искусственный хайп, скрытое влияние и публикации ради количества.</p></div>
      </section>

      <section className="team-section" id="team">
        <div className="section-heading"><div><p className="section-kicker">Кто ведёт проект</p><h2>Личное внимание.<br />Подключаемая команда.</h2></div><p>Ключевые решения не передаются младшему менеджеру. Подрядчиков подключаем только под согласованный объём.</p></div>
        <div className="team-grid"><article><span className="monogram">ЕЛ</span><div><p className="person-role">Главный продюсер</p><h3>Елена Леонтьева</h3><p>Медийная стратегия, публичный образ, раскрытие экспертности, подготовка подачи и контроль качества.</p></div></article><article><span className="monogram">П</span><div><p className="person-role">Стратегический партнёр</p><h3>Павел</h3><p>Стратегические сессии, переговоры, дорожные карты, операционная система, риски и следующий шаг.</p></div></article></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy"><p className="section-kicker">Первый шаг</p><h2>Начнём с короткого медиаразбора</h2><p>Опишите задачу в нескольких предложениях. На первом разговоре определим, есть ли смысл в диагностике, стратегической сессии или сопровождении.</p><div className="contact-prompts"><span>Кто вы и чем занимаетесь?</span><span>Какую публичную задачу хотите решить?</span><span>Что уже пробовали?</span></div></div>
        <div className="contact-card">
          <p className="contact-label">Напишите нам</p>
          <a className="contact-email" href="mailto:hello@leontieva.media?subject=Запрос%20на%20медиаразбор">hello@leontieva.media</a>
          <p>Коротко расскажите о себе, публичной задаче и о том, что уже пробовали. Ответим и предложим подходящий первый шаг.</p>
          <a className="button button-gold contact-button" href="mailto:hello@leontieva.media?subject=Запрос%20на%20медиаразбор">Написать на почту</a>
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><img src="/lm-icon.jpg" alt="" /><span><strong>LEONTIEVA</strong><small>ПРОДЮСЕРСКИЙ ЦЕНТР</small></span></a><p>Стратегия · Медиа · Доверие</p><p>© 2026 LEONTIEVA</p></footer>
    </main>
  );
}
