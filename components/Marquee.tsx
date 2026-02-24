const techs = [
  'Spark', 'Airflow', 'dbt', 'Snowflake', 'AI Agents', 'MCP',
  'BigQuery', 'Kafka', 'Terraform', 'LangChain', 'Kubernetes',
  'Python', 'Databricks', 'Fivetran',
];

function TrackItems() {
  return (
    <>
      {techs.map((t, i) => (
        <span key={`${t}-${i}`}>
          {i > 0 && <span className="marquee-dot" />}
          <span>{t}</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <section className="marquee-section">
      <div className="marquee">
        <div className="marquee-track">
          <TrackItems />
          <TrackItems />
        </div>
      </div>
    </section>
  );
}
