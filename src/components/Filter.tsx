import reset from '../assets/reset.svg';

type Years = number[];
interface Props {
  movieYears: Years;
  handleSortRevenue: () => void;
  handleReset: () => void;
  handleFocus: () => void;
  handleYearSelection: (selectedYear: number) => void;
  handleClicked: () => void;
  handleClickedYear: () => void;
  handleSortYearAndRevenue: (year: number) => void;
  toggleSidebar: () => void;
  isFocused: boolean;
  selectedYear: number | null;
  clicked: boolean;
  clickedYear: boolean;
}

const Filter: React.FC<Props> = ({
  handleSortRevenue,
  handleSortYearAndRevenue,
  handleReset,
  handleFocus,
  handleYearSelection,
  handleClicked,
  handleClickedYear,
  toggleSidebar,
  clicked,
  clickedYear,
  movieYears,
  isFocused,
  selectedYear,
}) => {
  return (
    <>
      <div className="filter-container">
        <button
          disabled={clickedYear}
          onClick={() => {
            handleClicked();
            handleSortRevenue();
          }}
          className={clicked ? 'clicked' : 'filter-btn'}
        >
          Top 10 Revenue
        </button>

        {selectedYear ? (
          <button
            onClick={handleClickedYear}
            className={clickedYear ? 'clicked' : 'filter-btn-year'}
          >
            {' '}
            Top 10 Revenue {selectedYear}
          </button>
        ) : (
          <button
            disabled={clicked}
            className={clickedYear ? 'clicked' : 'filter-btn-year'}
            onClick={() => {
              handleFocus();
              handleClickedYear();
              toggleSidebar();
            }}
          >
            Top 10 Revenue per Year
          </button>
        )}
        {isFocused && (
          <>
            {movieYears.length > 1 ? (
              <div className="container-overlay">
                <div className="years-container">
                  <h5>Select Year</h5>
                  {movieYears.map((movie, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        handleYearSelection(movie);
                        handleSortYearAndRevenue(movie);
                        toggleSidebar();
                      }}
                    >
                      {movie}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="filter-img">
                <img
                  src={reset}
                  onClick={() => {
                    handleReset();
                  }}
                />
              </div>
            )}
          </>
        )}
        {clickedYear && !isFocused && (
          <div className="filter-img">
            <img
              src={reset}
              onClick={() => {
                handleReset();
              }}
            />
          </div>
        )}
        {clicked && !isFocused && (
          <div className="filter-img">
            <img
              src={reset}
              onClick={() => {
                handleReset();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
