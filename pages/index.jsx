import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import CategoryCard from "@/components/CategoryCard";
import ProgressBar from "@/components/ProgressBar"; // Import the ProgressBar component
import Flash from "@/public/Flash.svg";
import Hero from "@/public/hero.jpg";
import Rocket from "@/public/Rocket.svg";
import Sparkles from "@/public/Sparkles.svg";

export default function About() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const maxStars = 100; // Number of stars
    const starColor = "#FFD700"; // Yellow color for stars

    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.speed = Math.random() * 1 + 0.5;

      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = starColor;
        ctx.fill();
        ctx.closePath();
      };

      this.update = function () {
        this.y += this.speed;

        if (this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = 0 - this.radius;
        }

        this.draw();
      };
    }

    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.update());
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.clear();
    console.log.apply(console, [
      "%c A brief intro about my self. Well a little brag about myself. 🐼\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
    ]);
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      ></canvas>

      <div className="px-10 sm:px-20 md:px-32 lg:mb-12 lg:px-60 mx-auto max-w-[75rem]">
        <Head>
          <title>Index ✦ Resume</title>
          <link rel="icon" href="/Avatar-white.svg" />
        </Head>
        <main className="max-w-screen">
          <div className="mx-auto pt-16 -pb-10 max-w-7xl">
            <div className="mx-auto flex flex-col">
              <h1
                className={`mt-6 mb-12 bg-gradient-to-br to-blue-500 via-red-400/90 from-yellow-500 bg-clip-text text-transparent selection:text-gray-700 dark:selection:text-white/90 items-center mx-auto text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold`}
              >
                About
              </h1>
              <div className="mx-auto transition-all duration-1000 ease-in-out -mt-8">
                <Image
                  src={Hero}
                  height={800}
                  width={800}
                  className="select-none h-40 w-40 rounded-full shadow-lg"
                  alt="phosuphong jonganurak"
                  priority
                />
              </div>
              <p className="mt-8 max-w-xl text-center md:w-[70%] mx-auto text-sm md:text-base lg:text-xl mb-2 px-2">
                Name : phosuphong jonganurak
                <br />
                ordinary student
              </p>
            </div>
            <CategoryCard />
            <div className="text-[0.92rem] text-base mx-12 font-light dark:text-white text-gray-900">
              <p className="mt-6 mb-12 font-normal">
                Hi, I’m Ken, a third-year student age 20 studying computer
                engineering at Khon Kaen University.{" "}
                <span className="inline-flex items-baseline">
                  <Image
                    src={Rocket}
                    alt="rocket"
                    className="self-center w-5 h-5 mx-1"
                  />
                </span>{" "}
                I’m a motivated and quick-learning aspiring back-end developer
                with introductory basic knowledge of programming skills{" "}
                <span className="inline-flex items-baseline">
                  <Image
                    src={Sparkles}
                    alt="sparkles"
                    className="self-center w-5 h-5 mx-1"
                  />
                </span>{" "}
                for back-end developers. Although new to the field, I am eager
                to apply my skills in real-world projects and grow my expertise
                in database management, API development, and server-side
                programming.{" "}
                <span className="inline-flex items-baseline">
                  <Image
                    src={Flash}
                    alt="flash"
                    className="self-center w-5 h-5 mx-1"
                  />
                </span>{" "}
              </p>
              <p className="bg-gradient-to-r from-emerald-500 to-yellow-500 bg-clip-text text-transparent select-none font-semibold mb-1 dark:from-emerald-600 dark:to-yellow-600 flex justify-center">
                skills
              </p>
              <div class="grid grid-cols-2 gap-4">
                <ProgressBar current={565} total={990} label="TOEIC" />
                <ProgressBar current={2.86} total={4} label="GPA" />
              </div>
              <p className="text-gray-400 select-none font-semibold mb-1 dark:text-white/30 flex justify-center">
                Contact
              </p>
              <p className="">
                <span className="text-red-700 font-bold flex justify-center">
                  Gmail
                </span>
                <a
                  onClick={() =>
                    navigator.clipboard.writeText("kjonganurak@gmail.com")
                  }
                  className="flex justify-center underline underline-offset-4 decoration-2 decoration-purple-400 group select-all font-semibold dark:hover:text-purple-400 hover:text-purple-700 cursor-pointer"
                  href="mailto:kjonganurak@gmail.com"
                >
                  kjonganurak@gmail.com
                </a>
                <br />{" "}
                <span className="text-blue-700 font-bold flex justify-center">
                  LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/phosuphong-jonganurak-a1a646336/"
                  className="flex justify-center underline underline-offset-4 decoration-2 decoration-purple-400 font-semibold dark:hover:text-purple-400 hover:text-purple-700 cursor-pointer"
                  rel="noopener noreferrer"
                  target="blank"
                >
                  phosuphong
                </a>
                <br />
                <span className="text-orange-500 font-bold flex justify-center">
                  Instagram
                </span>{" "}
                <a
                  href="https://instagram.com/k.pj6299"
                  target="blank"
                  rel="kp"
                  className="flex justify-center font-semibold underline underline-offset-4 decoration-2 decoration-purple-400 dark:hover:text-purple-400 hover:text-purple-700 cursor-pointer"
                >
                  k.pj6299
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
