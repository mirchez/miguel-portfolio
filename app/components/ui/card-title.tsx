import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function CardTitle() {
  const titles = [
    "Welcome!",
    "欢迎",
    "स्वागत है",
    "¡Bienvenido!",
    "أهلا بك",
    "Willkommen!",
    "Bienvenue!",
  ];

  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [titles.length]);

  return (
    <h1 className="text-5xl md:text-7xl tracking-tighter text-center font-regular mb-8">
      <span className="text-spektr-cyan-50">Discover My Work</span>
      <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-4 min-h-[50px]">
        &nbsp;
        <AnimatePresence mode="wait">
          <motion.span
            key={titleNumber} // <- muy importante el key sea dinámico para AnimatePresence
            className="absolute font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {titles[titleNumber]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}

export { CardTitle };
