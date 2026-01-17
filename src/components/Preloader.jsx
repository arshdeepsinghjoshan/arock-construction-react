import { useEffect, useRef } from "react";

const Preloader = ({ onFinish }) => {
  const preloaderRef = useRef(null);
  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);

  useEffect(() => {
    const logo1 = logo1Ref.current;
    const logo2 = logo2Ref.current;
    const preloader = preloaderRef.current;

    // Logo 1 zoom-in
    logo1.classList.remove("d-none");
    logo1.classList.add("zoom-in");

    // Logo 2 slide-up
    const t1 = setTimeout(() => {
      logo2.classList.remove("d-none");
      logo2.classList.add("slide-up");
    }, 1600);

    // Shatter + text animation
    const t2 = setTimeout(() => {
      preloader.classList.add("shatter-open");

      document.querySelectorAll(".animated-text").forEach((el) => {
        const delay = el.dataset.delay || "0s";
        el.style.animationDelay = delay;
        el.classList.add("animate");
      });
    }, 3500);

    // Remove preloader
    const t3 = setTimeout(() => {
      onFinish(); // 🔥 tell Home to show content
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <section
      ref={preloaderRef}
      className="d-flex flex-column align-items-center justify-content-center
                 position-fixed top-0 start-0 w-100 h-100 preloader-bg z-3"
    >
      <img
        ref={logo1Ref}
        src="/assets/images/ALogo.png"
        className="img-fluid w-25 d-none"
        alt="logo1"
      />

      <img
        ref={logo2Ref}
        src="/assets/images/AROCK.png"
        className="img-fluid w-20 mt-2 mw-369 d-none"
        alt="logo2"
      />
    </section>
  );
};

export default Preloader;
