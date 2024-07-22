function Buttons({ filter, setFilter }) {
  const filters = ["All", "Active", "Completed"];

  const handleFilterClick = (value) => {
    setFilter(value);
  };

  return (
    <div className="flex gap-4 items-center justify-center dark:bg-darkTheme-veryDarkDesaturatedBlue">
      {filters.map((i, index) => (
        <button
          onClick={() => handleFilterClick(i)}
          key={index}
          className={`${
            filter === i
              ? "text-brightBlue"
              : "text-lightTheme-darkGrayishBlue dark:text-darkTheme-darkGrayishBlue"
          } font-bold  hover:text-lightTheme-veryDarkGrayishBlue dark:hover:text-darkTheme-lightGrayishBlueHover `}
        >
          {i}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
