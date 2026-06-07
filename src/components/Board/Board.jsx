import { useState, useEffect, useRef } from "react";
import "./Board.scss";
import { videos } from "../../utils/helpers.js";

const Board = () => {
    const [activeVideo, setActiveVideo] = useState(null);
    const [played, setPlayed] = useState(new Set());

    const cacheRef = useRef(new Map());
    const startedRef = useRef(new Map());
    const containerRef = useRef(null);

    const preloadVideo = (src, time) => {
        if (cacheRef.current.has(src)) return;

        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;
        video.currentTime = time || 0;
        cacheRef.current.set(src, video);
        video.load();
    };

    const handleOpen = (v) => {
        setActiveVideo(v);
    };


    const handleClose = () => {
        const id = activeVideo?.id;

        const video = cacheRef.current.get(activeVideo?.src);
        if (video) {
            video.pause();
        }

        setPlayed((prev) => {
            const next = new Set(prev);
            if (id != null && startedRef.current.get(id)) {
                next.add(id);
            }

            return next;
        });

        setActiveVideo(null);
    };

    useEffect(() => {
        if (!activeVideo || !containerRef.current) return;

        const container = containerRef.current;
        container.innerHTML = "";

        const loader = document.createElement("div");
        loader.className = "overlay__loading";
        loader.textContent = "Загрузка...";
        container.appendChild(loader);


        let video = cacheRef.current.get(activeVideo.src);

        const start = () => {
            const id = activeVideo.id;
            startedRef.current.set(id, true);

            // video.currentTime = activeVideo.time || 0;
            video.controls = true;
            video.muted = false;
            container.innerHTML = "";
            container.appendChild(video);

            video.play().catch(() => {});
            video.tabIndex = -1;
            video.focus();
        };

        if (video.readyState >= 3) {
            start();
        } else {
            video.addEventListener("canplay", start, { once: true });
        }

        return () => {
            video.removeEventListener("canplay", start);
        };
    }, [activeVideo]);

    return (
        <>
            <section className="board">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className={`board__tile ${
                            played.has(video.id) ? "board__tile--played" : ""
                        }`}
                        onMouseEnter={() => preloadVideo(video.src, video.time)}
                        onClick={() => handleOpen(video)}
                    >
                        {video.id}
                    </div>
                ))}
            </section>

            {activeVideo && (
                <div className="overlay" onClick={handleClose}>
                    <div
                        className="overlay__tile"
                        ref={containerRef}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default Board;