import { useEffect } from "react";
import watchLogo from "../../assets/logo_watch_series_8.png";
import "./hero.scss";

export default function hero() {
    useEffect(() => {
        const fadeInOut = document.querySelectorAll("[data-animation='fadeInOut']");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.add("show");
                });
            },
            { threshold: 1, rootMargin: "-50px" }
        );

        fadeInOut.forEach((item) => {
            observer.observe(item);
        });

        const html = document.documentElement;
        const canvas = document.getElementById("seriesE");
        const context = canvas.getContext("2d");
        const frameCount = 478;
        const currentFrame = (index) => {
            return `/src/assets/pic/Screen Recording 2023-03-02 at 13.53.22-1_${index.toString().padStart(5, "0")}.png`;
        };

        const img = new Image();
        img.src = currentFrame(0);
        img.onload = function () {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        const preloadImages = () => {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
            }
        };

        const updateImage = (index) => {
            img.src = currentFrame(index);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        const wrap = document.querySelector(".heroWrap");

        window.addEventListener("scroll", () => {
            const scrollTop = html.scrollTop;
            const maxScrollTop = wrap.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
            requestAnimationFrame(() => updateImage(frameIndex + 1));

            if (scrollTop > 10) {
                console.log("dhbj");
                document.querySelector(".heroWrap_sticky").classList.add("fixed");
            } else {
                document.querySelector(".heroWrap_sticky").classList.toggle("fixed");
            }
        });

        preloadImages();
    }, []);

    return (
        <div className="heroWrap">
            <div className="heroWrap_sticky">
                <div className="heroWrap_sticky_container child_wrap">
                    <h3>Apple Watch Series 8</h3>
                    <nav>
                        <ul>
                            <li>Overview</li>
                            <li>Why Apple Watch</li>
                            <button>Buy</button>
                        </ul>
                    </nav>
                </div>
            </div>
            <canvas width={window.innerWidth} height={window.innerHeight} data-pin-scroll className="heroWrap_canvas" id="seriesE"></canvas>
            <div className="heroWrap_txt">
                <img data-animation="fadeInOut" src={watchLogo} alt="" />
                <h1 data-animation="fadeInOut">A healthy leap ahead.</h1>
            </div>
        </div>
    );
}
