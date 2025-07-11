// ForcastChart.jsx
import React from "react";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";

const ForcastChart = ({ data, isBlack }) => {
  function getDailyAverageTemps(data) {
    const groupedByDay = {};

    data.forEach((item) => {
      const day = item.dt_txt.split(" ")[0];
      if (!groupedByDay[day]) groupedByDay[day] = [];
      groupedByDay[day].push(item.main.temp);
    });

    return Object.entries(groupedByDay).map(([day, temps]) => {
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      return {
        day,
        avgTemp: avgTemp.toFixed(1),
      };
    });
  }

  const dayWiseData = data && getDailyAverageTemps(data).slice(0, 5);

  return (
    <motion.div
      className="w-full grid grid-cols-[repeat(auto-fit,minmax(60px,1.5fr))] justify-center gap-2 pt-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {dayWiseData?.map((val) => (
        <motion.div
          key={nanoid()}
          variants={card}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 w-full shadow-lg rounded-xl p-2 flex flex-col items-center"
        >
          <h2
            className="text-white text-center font-semibold"
            style={{ fontSize: "clamp(6px,2vw,1rem)" }}
          >
            <span style={{ fontSize: "clamp(6px,2vw,.8rem)" }}>Avg. Temp</span>
            <br /> {val.avgTemp}°C
          </h2>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-inner ${
              !isBlack
                ? "bg-white/30 backdrop-blur-md"
                : "bg-gradient-to-br from-indigo-300 to-blue-400"
            }`}
          >
            <span role="img" aria-label="weather" className="text-xl">
              🌤️
            </span>
          </motion.div>

          <p
            className="text-blue-100"
            style={{ fontSize: "clamp(6px,2vw,.8rem)" }}
          >
            {val.day}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ForcastChart;

/* ---------------- Animation Variants ---------------- */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
