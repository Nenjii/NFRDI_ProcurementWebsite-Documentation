---
sidebar_position: 3
---

# Body

The body consists of the _Opening Title, Search Bar, Search Content, Search Result_, and a sidebar. The sidebar includes the _Calendar Year_ for procurement, as well as options to filter by Bidding/Alternative status and further by Ongoing/Completed status.

![Alt text](/img/Snippets/Body.png)

**Welcome Title**

![Alt text](/img/Snippets/Welcome.png)

```jsx title="Welcome Title Content"
<div className={style.bodyTitle}>
  <div className={style.bodyContentTitle1}>Welcome to the</div>
  <ReactTyped
    className={style.bodyContentTitle2}
    strings={[
      "Procurement Monitoring",
      "DA-NFRDI",
      "National Fisheries Research and Development Institute",
    ]}
    typeSpeed={40}
    backSpeed={40}
    loop
  ></ReactTyped>
  <div className={style.bodyContentTitle3}>Reports</div>
</div>
```

**Search Bar**

![Alt text](/img/Snippets/SearchBar.png)

```jsx title="Search Bar Content"
<div className={style.bodySearchBar}>
  <input
    type="text"
    className={style.placeholdercolor}
    placeholder="Procurement search here..."
    value={searchValue}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    title="Please search here for the procurement title, PR number, bidding/alternative method (if applicable), status (ongoing or completed), or simply the year."
  />
  <div onClick={handleSearch}>
    <BsSearch
      color="#f5f5f5"
      size={36}
      className={style.bodySearchButton}
      title="Search"
    />
  </div>
</div>
```

```jsx title="Search Bar [javascript]"
const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      if (searchValue.trim() === "" && e.key === "Backspace") {
        onSearch(""); // Call onSearch with empty string when backspace is pressed and searchValue is empty
      } else if (e.key === "Enter") {
        onSearch(searchValue);
      }
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

```

**Search Content**

![Alt text](/img/Snippets/SearchContent.png)

```jsx title="Search Content"
return isVisible ? ( // Render only when isVisible is true
  <div className={style.container}>
    <div className={style.content}>
      {searchTerm && filteredData.length === 0 ? (
        <p className={style.Shows}>
          No results found for:{" "}
          <span className={style.Highlight}>{searchTerm}</span>
        </p>
      ) : (
        <p className={style.Shows}>
          Showing results of:{" "}
          <span className={style.Highlight}>{searchTerm}</span>
        </p>
      )}
      <div className={style.Line}></div>
    </div>

    {filteredData.slice(startIndex, endIndex).map((item, index) => (
      <div
        key={index}
        className={style.SearchContainer}
        onClick={() => onContentClick(item)}
      >
        <div className={style.Searches} title={item.title}>
          {item.title.length > 145
            ? `${item.title.substring(0, 145)} . . .`
            : item.title}
        </div>

        <div className={style.SearchBoxes}>
          <div className={style.Boxes}>{"PR Number: " + item.pr_no}</div>
          <div className={style.Boxes}>{getTypeString(item.type)}</div> {/* Use the function here */}
          <div className={style.Boxes}>{item.status}</div>
          <div className={style.Boxes}>
            {convertDateFormat(item.date_published)}
          </div>
        </div>
      </div>
    ))}

    <div className={style.tablePage}>
      <div className={style.tablePageNumber}>
        Page {currentPage} of {totalPages}
      </div>
      {currentPage > 1 && (
        <div
          className={style.tablePreviousPage}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          Previous Page
          <div className={style.tableNextIcon}>
            <GrFormPrevious size={25} />
          </div>
        </div>
      )}
      {currentPage < totalPages && (
        <div
          className={style.tableNextPage}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next Page
          <div className={style.tableNextIcon}>
            <GrFormNext size={25} />
          </div>
        </div>
      )}
    </div>
  </div>
) : null; // Return null when isVisible is false
```

```jsx title="Search Content [javascript]"
const SearchContent = ({ searchTerm, onContentClick }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  useEffect(() => {
    if (searchTerm) {
      getSearch();
      setIsVisible(true); // Show the SearchContent
    } else {
      setFilteredData([]); // Reset filtered data if search term is empty
      setIsVisible(false); // Hide the SearchContent
    }
  }, [searchTerm]);

  function getSearch() {
    axios.get("http://localhost:5000/getProject").then(function (response) {
      const searchData = response.data.filter((item) => {
        // Convert item.type to its string representation
        let itemType = "";
        if (item.type === 1) {
          itemType = "bidding";
        } else if (item.type === 2) {
          itemType = "alternative";
        }

        // Filter by title, pr_no, status, date_published, and type
        const titleMatch = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const prNoMatch = item.pr_no
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const statusMatch =
          item.status.toLowerCase() === searchTerm.toLowerCase();
        const dateMatch = item.date_published
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const typeMatch = itemType.includes(searchTerm.toLowerCase()); // New condition for type

        return titleMatch || prNoMatch || statusMatch || dateMatch || typeMatch;
      });
      setFilteredData(searchData);

      // Calculate total pages based on the number of filtered data
      setTotalPages(Math.ceil(searchData.length / 6));
      setCurrentPage(1); // Reset current page to 1
    });
  }

  const convertDateFormat = (date) => {
    const options = { year: "numeric" };
    const finalDate = new Date(date);
    return finalDate.toLocaleDateString("en-US", options);
  };

  const getTypeString = (type) => {
    switch (type) {
      case 1:
        return "Bidding";
      case 2:
        return "Alternative";
      default:
        return "Unknown Type"; // Fallback for unexpected type values
    }
  };

  // Calculate the start and end index of contents for the current page
  const startIndex = (currentPage - 1) * 5;
  let endIndex = startIndex + 5; // Default end index

  // Check if any content's title exceeds 145 characters
  if (
    filteredData
      .slice(startIndex, startIndex + 5)
      .some((item) => item.title.length > 145)
  ) {
    endIndex = startIndex + 5; // Adjust end index to 5 if condition is met
  }
```

**Search Result**

![Alt text](/img/Snippets/SearchResult.png)

```jsx title="Search Result Content"
<div className={style.bodySearchBar}>
  <input
    type="text"
    className={style.placeholdercolor}
    placeholder="Procurement search here..."
    value={searchValue}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    title="Please search here for the procurement title, PR number, bidding/alternative method (if applicable), status (ongoing or completed), or simply the year."
  />
  <div onClick={handleSearch}>
    <BsSearch
      color="#f5f5f5"
      size={36}
      className={style.bodySearchButton}
      title="Search"
    />
  </div>
</div>
```

![Alt text](/img/Snippets/SearchResult_pdf.png)

```jsx title="Search Result [javascript]"
return isVisible ? ( // Render only when isVisible is true
  <div className={style.container}>
    <div className={style.content}>
      {searchTerm && filteredData.length === 0 ? (
        <p className={style.Shows}>
          No results found for:{" "}
          <span className={style.Highlight}>{searchTerm}</span>
        </p>
      ) : (
        <p className={style.Shows}>
          Showing results of:{" "}
          <span className={style.Highlight}>{searchTerm}</span>
        </p>
      )}
      <div className={style.Line}></div>
    </div>

    {filteredData.slice(startIndex, endIndex).map((item, index) => (
      <div
        key={index}
        className={style.SearchContainer}
        onClick={() => onContentClick(item)}
      >
        <div className={style.Searches} title={item.title}>
          {item.title.length > 145
            ? `${item.title.substring(0, 145)} . . .`
            : item.title}
        </div>

        <div className={style.SearchBoxes}>
          <div className={style.Boxes}>{"PR Number: " + item.pr_no}</div>
          <div className={style.Boxes}>{getTypeString(item.type)}</div> {/* Use the function here */}
          <div className={style.Boxes}>{item.status}</div>
          <div className={style.Boxes}>
            {convertDateFormat(item.date_published)}
          </div>
        </div>
      </div>
    ))}

    <div className={style.tablePage}>
      <div className={style.tablePageNumber}>
        Page {currentPage} of {totalPages}
      </div>
      {currentPage > 1 && (
        <div
          className={style.tablePreviousPage}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          Previous Page
          <div className={style.tableNextIcon}>
            <GrFormPrevious size={25} />
          </div>
        </div>
      )}
      {currentPage < totalPages && (
        <div
          className={style.tableNextPage}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next Page
          <div className={style.tableNextIcon}>
            <GrFormNext size={25} />
          </div>
        </div>
      )}
    </div>
  </div>
) : null; // Return null when isVisible is false
```

**Calendar Year** | _sidebar_

![Alt text](/img/Snippets/SideBar.png) → → → ![Alt text](/img/Snippets/SideBar-Opt.png)

```jsx title="Sidebar Content"
<div className={style.bodyCalendarYear}>
  <div className={`${style.txtCalendarYear} ${style.animateCharacter}`}>
    Calendar Year
  </div>

  <div className={style.bodyContentCY} id={style.Lines} ref={containerRef}>
    <YearContent
      year="2024"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2023"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2022"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2021"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2020"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2019"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2018"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2017"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2016"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
    <YearContent
      year="2015"
      activeYear={activeYear}
      activeSection={activeSection}
      toggleYearContent={toggleYearContent}
    />
  </div>
  {/* Repeat for other years */}
  <div className={style.CYotherYears} onClick={scrollToBottom}>
    <IoAddCircle className={style.Add} color="#1DA1F2" size={25} />
    <div>browse other years...</div>
  </div>
</div>
```

**Calendar Year** | _example: Bidding_

![Alt text](/img/Snippets/CA_Bidding.png)
![Alt text](/img/Snippets/CA_Bidding-Contents.png)

```jsx title="Bidding Content"
{
  (activeSection === "Bidding" || activeSection === "Alternative") && ( // Only render the table if activeSection is Bidding or Alternative
    <div className={style.tablecontainer}>
      {activeSection === "Bidding" && (
        <div className={style.tablebiddingcontainer}>
          <h2>List of Bidding / {clickedYear}</h2>

          <table className={style.TableContent}>
            <thead>
              <tr>
                {/* Ongoing button */}
                <th
                  className={`${style.Ongoing} ${
                    isOngoingActive && style.active
                  }`}
                  colSpan="5"
                  onClick={toggleOngoingVisibility}
                >
                  {" "}
                  Ongoing{" "}
                </th>
                {/* Completed button */}
                <th
                  className={`${style.Completed} ${
                    isCompletedActive && style.active
                  }`}
                  colSpan="5"
                  onClick={toggleCompletedVisibility}
                >
                  {" "}
                  Completed{" "}
                </th>
              </tr>
            </thead>
            <thead className={style.TableColumnColor}>
              <tr>
                <th>PR Number</th>
                <th>Title / Project</th>
                <th>Contractor</th>
                <th>Contract Amount</th>
                <th>BAC Resolution</th>
                <th>Notice of Award</th>
                <th>Contract</th>
                <th>Notice to Proceed</th>
                <th>Philgeps Award Notice</th>
                <th>Date Published</th>
              </tr>
            </thead>
            <tbody className={style.TableRowColor}>
              {projectList &&
                projectList.map((data, index) => (
                  <tr key={index}>
                    <td>{data.pr_no}</td>
                    <td>{data.title}</td>
                    <td>{data.contractor}</td>
                    <td>{data.contract_amount}</td>
                    <td>
                      {data.bac_resolution && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.bac_resolution
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.notice_of_award && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.notice_of_award
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.contract && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.contract
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.notice_to_proceed && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.notice_to_proceed
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.philgeps_award_notice && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" +
                                data.philgeps_award_notice
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>{convertDateFormat(data.date_published)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            <NextPages />
          </div>
        </div>
      )}
      {activeSection === "Alternative" && (
        <div className={style.tablealternativecontainer}>
          <h2>List of Alternative / {clickedYear}</h2>

          <table className={style.table}>
            <thead>
              <tr>
                <th
                  className={`${style.Ongoing} ${
                    activeSection === "Ongoing" ? style.active : ""
                  }`}
                  colSpan="5"
                >
                  Ongoing
                </th>
                <th
                  className={`${style.Completed} ${
                    activeSection === "Completed" ? style.active : ""
                  }`}
                  colSpan="5"
                >
                  Completed
                </th>
              </tr>
            </thead>
            <thead className={style.TableColumnColor}>
              <tr>
                <th>PR Number</th>
                <th>Title / Project</th>
                <th>Contractor</th>
                <th>Contract Amount</th>
                <th>BAC Resolution</th>
                <th>Notice of Award</th>
                <th>Contract</th>
                <th>Notice to Proceed</th>
                <th>Philgeps Award Notice</th>
                <th>Date Published</th>
              </tr>
            </thead>
            <tbody className={style.TableRowColor}>
              {projectList &&
                projectList.map((data, index) => (
                  <tr key={index}>
                    <td>{data.pr_no}</td>
                    <td>{data.title}</td>
                    <td>{data.contractor}</td>
                    <td>{data.contract_amount}</td>
                    <td>
                      {data.bac_resolution && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.bac_resolution
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.notice_of_award && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.notice_of_award
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.contract && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.contract
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.notice_to_proceed && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" + data.notice_to_proceed
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>
                      {data.philgeps_award_notice && (
                        <button
                          className={style.viewbutton}
                          onClick={() =>
                            handlePdfView(
                              "http://localhost:5000/" +
                                data.philgeps_award_notice
                            )
                          }
                        >
                          VIEW
                        </button>
                      )}
                    </td>
                    <td>{convertDateFormat(data.date_published)}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className={style.tablePage}>
            <div className={style.tablePageNumber}>Page 1 of 2</div>
            <div className={style.tableNextPage}>
              Next Page
              <div className={style.tableNextIcon}>
                <GrFormNext size={25} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

![Alt text](/img/Snippets/CA_Bidding-ContentsPDF.png)

```jsx title="PDF"
{
  pdfUrl && (
    <div className={style.pdfViewerContainer}>
      <div className={style.closeButton} onClick={closePdfViewer}>
        <FaWindowClose size={23} />
      </div>
      <iframe src={pdfUrl} title="PDF Viewer"></iframe>
    </div>
  );
}
```

```jsx title="Calendar Year [javascript]"
const YearContent = ({
  year,
  activeYear,
  activeSection,
  toggleYearContent,
}) => (
  <>
    <div
      className={`${style[`CY${year}`]} ${
        activeYear === year ? style.active : ""
      }`}
      onClick={() => toggleYearContent(year, null)}
      id={style.YearLines}
    >
      {year}{" "}
    </div>
    {activeYear === year && (
      <div className={`${style[`CYContent${year}`]} ${style.active}`}>
        <div
          className={`${style[`Bidding${year}`]} ${
            activeSection === "Bidding" ? style.active : ""
          }`}
          onClick={() => toggleYearContent(year, "Bidding")}
          id={style.BiddingLines}
        >
          Bidding
        </div>
        <div
          className={`${style[`Alternative${year}`]} ${
            activeSection === "Alternative" ? style.active : ""
          }`}
          onClick={() => toggleYearContent(year, "Alternative")}
          id={style.AlternativeLines}
        >
          Alternative
        </div>
      </div>
    )}
  </>
);

const CalendarYear = () => {
  const [activeYear, setActiveYear] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [clickedYear, setClickedYear] = useState(null);

  const toggleYearContent = (year, section) => {
    if (activeYear === year && activeSection === section) {
      setActiveYear(null);
      setActiveSection(null);
      setClickedYear(null);
    } else {
      setActiveYear(year);
      setActiveSection(section);
      setClickedYear(year); // Set the clicked year
    }
  };

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL

  const handlePdfView = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  const {
    isOngoingActive,
    isCompletedActive,
    toggleOngoingVisibility,
    toggleCompletedVisibility,
  } = useVisibilityToggles(); // OngoCom Visibility when it is clicked

  const [projectList, setprojectList] = useState(
    JSON.parse(localStorage.getItem("projects"))
  );

  const convertDateFormat = (date) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const finalDate = new Date(date);
    return finalDate.toLocaleDateString("en-US", options);
  };
```

```jsx title="Calendar Year [OngoComFunction.js]"
// VisibilityToggles.js
import { useState } from "react";

export const useVisibilityToggles = () => {
  const [isOngoingActive, setIsOngoingActive] = useState(false);
  const [isCompletedActive, setIsCompletedActive] = useState(false);

  const toggleOngoingVisibility = () => {
    setIsOngoingActive(!isOngoingActive);
    setIsCompletedActive(false); // Deactivate completed when ongoing is clicked
  };

  const toggleCompletedVisibility = () => {
    setIsCompletedActive(!isCompletedActive);
    setIsOngoingActive(false); // Deactivate ongoing when completed is clicked
  };

  return {
    isOngoingActive,
    isCompletedActive,
    toggleOngoingVisibility,
    toggleCompletedVisibility,
  };
};
```
