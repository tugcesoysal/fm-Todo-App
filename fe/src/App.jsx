import { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import TodoCard from "./components/TodoCard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="font-sans text-[12px] sm:text-body relative h-full bg-lightTheme-veryLightGray dark:bg-darkTheme-veryDarkBlue ">
      <div className="bg-[url('/images/bg-mobile-light.jpg')] sm:bg-[url('/images/bg-desktop-light.jpg')] bg-cover bg-top h-64 w-full absolute top-0 left-0"></div>
      <header className="relative pt-12 sm:pt-16 pb-10 mx-auto flex justify-between w-2/3 max-w-[540px] z-10">
        <h1 className="text-white text-2xl tracking-[12px] sm:text-[40px] sm:tracking-[15px]">
          TODO
        </h1>
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </header>
      <TodoCard />
    </div>
  );
}

export default App;
