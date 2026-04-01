import React, { useRef, useEffect, useState, useLayoutEffect } from "react";

/**
 * Robust Seamless Marquee
 * - speed: px/sec
 * - gap: spacing between items inside one copy (CSS gap value, e.g., "1rem" or 16)
 * - pauseOnHover: boolean
 *
 * Use by passing the image elements as children (same as before).
 */
export default function RobustSeamlessMarquee({
  speed = 100,
  pauseOnHover = true,
  gap = "1.5rem",
  children,
  className = "",
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const sampleRef = useRef(null); // measure this single copy
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  const [singleWidth, setSingleWidth] = useState(0);
  const [copies, setCopies] = useState(2); // number of copies to render
  const [ready, setReady] = useState(false);

  // helper: wait for images in a node to load (or error)
  const waitImagesLoaded = (node) =>
    new Promise((resolve) => {
      if (!node) return resolve();
      const imgs = Array.from(node.querySelectorAll("img"));
      if (imgs.length === 0) return resolve();

      let remaining = imgs.length;
      const done = () => {
        remaining -= 1;
        if (remaining <= 0) resolve();
      };

      imgs.forEach((img) => {
        if (img.complete && img.naturalWidth !== 0) {
          done();
        } else {
          const onLoad = () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onErr);
            done();
          };
          const onErr = () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onErr);
            done();
          };
          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onErr, { once: true });
        }
      });
    });

  // Measure single copy width precisely and decide how many copies needed
  const measureAndCompute = async () => {
    if (!containerRef.current || !sampleRef.current || !trackRef.current) return;
    await waitImagesLoaded(sampleRef.current);

    // hide any transform to get accurate rect
    trackRef.current.style.transform = "none";

    // subpixel-accurate
    const rect = sampleRef.current.getBoundingClientRect();
    const one = rect.width;

    // fallback in pathological case
    const fallbackOne = trackRef.current.scrollWidth / Math.max(1, copies);
    const final = one && one > 1 ? one : fallbackOne;

    // ensure images inside behave (avoid inline whitespace)
    sampleRef.current.querySelectorAll("img").forEach((img) => {
      img.style.display = "block";
    });

    // container width
    const containerWidth = containerRef.current.getBoundingClientRect().width;

    // compute required copies so trackWidth >= containerWidth + singleWidth (buffer)
    // Add +2 extra copies to be extra safe on high DPR/responsive changes
    const needed = Math.max(
      2,
      Math.ceil((containerWidth + final) / final) + 2
    );

    setSingleWidth(final);
    setCopies(needed);

    // mark ready after next tick (layout settled)
    requestAnimationFrame(() => setReady(true));
  };

  // On first mount and when children change, re-measure
  useLayoutEffect(() => {
    measureAndCompute();

    const ro = new ResizeObserver(() => {
      setReady(false);
      // debounce a little to allow font/image/layout to settle
      clearTimeout(measureAndCompute._t);
      measureAndCompute._t = setTimeout(() => measureAndCompute(), 80);
    });

    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("load", measureAndCompute);
    window.addEventListener("orientationchange", measureAndCompute);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measureAndCompute);
      window.removeEventListener("orientationchange", measureAndCompute);
      clearTimeout(measureAndCompute._t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // Animation loop — uses modulo wrap on exact singleWidth
  useEffect(() => {
    if (!singleWidth || !ready) return;

    const step = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        posRef.current -= speed * delta;

        // modulo wrap in range [-singleWidth, 0)
        const m = singleWidth;
        let wrapped = ((posRef.current % m) + m) % m;
        wrapped = wrapped === 0 ? 0 : wrapped - m;

        if (trackRef.current) {
          // round to 3 decimals to avoid extremely long float strings
          trackRef.current.style.transform = `translate3d(${wrapped.toFixed(
            3
          )}px, 0, 0)`;
        }
        posRef.current = wrapped;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [singleWidth, speed, ready]);

  // Pause handlers
  const onEnter = () => {
    if (pauseOnHover) pausedRef.current = true;
  };
  const onLeave = () => {
    if (pauseOnHover) pausedRef.current = false;
  };

  // inline styles — no global CSS
  const containerStyle = { overflow: "hidden", width: "100%" };
  const trackStyle = {
    display: "flex",
    whiteSpace: "nowrap",
    willChange: "transform",
    alignItems: "center",
  };
  const copyStyle = {
    display: "flex",
    gap: gap,
    alignItems: "center",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    // ensure copy doesn't create outside spacing
  };

  // Children wrapper that forces images to be display:block to avoid whitespace
  const normalizeChildren = (childElements) =>
    React.Children.map(childElements, (child) => {
      if (!React.isValidElement(child)) return child;
      // if it's an <img>, clone with display:block style
      if (child.type === "img") {
        return React.cloneElement(child, {
          style: { ...(child.props.style || {}), display: "block" },
          decoding: child.props.decoding || "async",
        });
      }
      // else, return as-is
      return child;
    });

  // Render N copies (sampleRef only on first one)
  const copiesArray = Array.from({ length: copies }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
    >
      <div ref={trackRef} style={trackStyle}>
        {copiesArray.map((n) => (
          <div
            key={n}
            ref={n === 0 ? sampleRef : null}
            style={copyStyle}
            aria-hidden
          >
            {normalizeChildren(children)}
          </div>
        ))}
      </div>
    </div>
  );
}
