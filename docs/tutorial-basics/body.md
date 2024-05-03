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
