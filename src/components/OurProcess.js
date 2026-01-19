import React, { useEffect, useRef, useState } from 'react';

const OurProcess = () => {
  const [fillHeight, setFillHeight] = useState(232);
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const items = itemsRef.current;
    const fill = document.querySelector('.timeline-fill');
    const timeline = timelineRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target) + 1;
            entry.target.classList.add('active');

            if (timeline) {
              const height = (index / items.length) * timeline.scrollHeight;
              setFillHeight(height);
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    items.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-5 bg-light position-relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">Our Process</h2>
          <p className="text-muted mt-2 text-center">From first meeting to final delivery</p>
        </div>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-fill" style={{ height: `${fillHeight}px` }}></div>

          {/* Item 1 */}
          <div
            className="timeline-item left mb-5"
            data-step="1"
            ref={(el) => (itemsRef.current[0] = el)}
          >
            <div className="timeline-icon bg-gradient-green">
              <i className="bi bi-tree"></i>
            </div>
            <div className="timeline-content card border-0 shadow-sm rounded-4 p-4" data-aos="fade-down">
              <h5 className="fw-semibold mb-2">Meet &amp; Greet</h5>
              <p className="text-muted mb-0 small">
                Understanding your vision, lifestyle, and expectations.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div
            className="timeline-item right mb-5"
            data-step="2"
            ref={(el) => (itemsRef.current[1] = el)}
          >
            <div className="timeline-icon bg-gradient-blue">
              <i className="bi bi-lightbulb"></i>
            </div>
            <div className="timeline-content card border-0 shadow-sm rounded-4 p-4" data-aos="fade-down">
              <h5 className="fw-semibold mb-2">Idea to Reality</h5>
              <p className="text-muted mb-0 small">
                Turning concepts into workable plans and solutions.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div
            className="timeline-item left mb-5"
            data-step="3"
            ref={(el) => (itemsRef.current[2] = el)}
          >
            <div className="timeline-icon bg-gradient-orange">
              <i className="bi bi-brush"></i>
            </div>
            <div className="timeline-content card border-0 shadow-sm rounded-4 p-4" data-aos="fade-down">
              <h5 className="fw-semibold mb-2">Design &amp; Create</h5>
              <p className="text-muted mb-0 small">
                Detailed designs crafted with precision and creativity.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div
            className="timeline-item right mb-5"
            data-step="4"
            ref={(el) => (itemsRef.current[3] = el)}
          >
            <div className="timeline-icon bg-gradient-dark">
              <i className="bi bi-building"></i>
            </div>
            <div className="timeline-content card border-0 shadow-sm rounded-4 p-4" data-aos="fade-down">
              <h5 className="fw-semibold mb-2">Build &amp; Install</h5>
              <p className="text-muted mb-0 small">
                Quality construction delivered on time and on budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;