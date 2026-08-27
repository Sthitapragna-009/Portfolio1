export default function PullQuote({ text, attribution }) {
  return (
    <div className="pull-quote">
      <span className="pull-quote__mark" aria-hidden="true">“</span>
      <p>{text}</p>
      {attribution && <span className="pull-quote__attribution">{attribution}</span>}
    </div>
  );
}
