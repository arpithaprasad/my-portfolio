import { anniversary } from "../../data/anniversary";

export default function PerformanceReview() {
  const { review, boyfriendName } = anniversary;

  return (
    <section id="review" className="section" aria-labelledby="review-heading">
      <div className="section-inner">
        <div className="review-sheet">
          <p className="review-kicker">Confidential · Internal use only</p>
          <h2 id="review-heading" className="review-title">
            {review.heading}
          </h2>
          <p className="review-meta">
            {review.employeeLabel}: {boyfriendName}
            <br />
            {review.period}
          </p>

          <div className="mt-6">
            {review.categories.map((category) => (
              <div key={category.id} className="review-row">
                <span>{category.label}</span>
                <Stars value={category.stars} />
              </div>
            ))}
          </div>

          <p className="review-overall">
            <strong>OVERALL PERFORMANCE:</strong> {review.overall}
          </p>

          <div className="stamp" aria-hidden="true">
            {review.stamp}
          </div>

          <p className="review-note">{review.note}</p>
        </div>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < value ? "" : "stars-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}
