---
sidebar_position: 1
---

# NFRDI Procurement Intro

import Tag from '/src/components/Tag';
import styles from '/src/css/custom.css';

Let's discover <Tag color="#3b5998">DA-NFRDI Procurement Website Design</Tag>.

### Getting Started

Explore the website to understand its **functionality and benefits**.

![Alt text](/img/Snippets/MainPage.png)

### Website Contents: What's Inside?

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Header" label="Header" default>
  ## Header
    The *upper header* contains buttons for accessibility, home navigation, and admin login, along with the display of the Philippine Standard Time (PST). Positioned in the lower header are the DA-NFRDI text and logo, accompanied by the institute's social media links.

![Alt text](/img/Snippets/Header.png)

```jsx title="Header" showlineNumber
import React, { useState, useEffect } from "react";
import style from "../Components/Header.module.css";
import { RxAccessibility } from "react-icons/rx";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  FaExternalLinkSquareAlt,
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const Header = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const generateMonth = (month) => months[month - 1];
  const generateDay = (day) => daysOfWeek[day];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const day = time.getDate().toString();
  const month = time.getMonth().toString();
  const year = time.getFullYear().toString();
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const daysOftheWeek = time.getDay();

  return (
    <div className={style.headerbkg}>
      <div className={style.headercontent}>
        <div className={style.headercontentspaces}>
          <div className={style.headerAcccessibility}>
            <RxAccessibility color="#69DDFF" size={25} />
            Accessibility
          </div>
        </div>
        <div className={style.headerIcons}>
          <div>
            <a className={style.headerGoBack} href="https://nfrdi.da.gov.ph/">
              <IoArrowBackCircle color="#69DDFF" size={25} />
              Go to Home
            </a>
          </div>
          <div className={style.headerAdminLogin}>
            <FaExternalLinkSquareAlt color="#69DDFF" size={20} />
            Admin login
          </div>
          <div className={style.headerPST}>
            Philippine Standard Time:
            <p>{`${generateDay(daysOftheWeek)}, ${generateMonth(
              month
            )} ${day}, ${year}  ${hours}:${minutes}:${seconds}`}</p>
          </div>
        </div>
      </div>
      <div className={style.headercontentimage}>
        <img
          id={style.imagecontent}
          src="../../public/images/HeaderContentBelow2.svg"
          alt="HomeImage"
        />
        <div className={style.headercontentsocmed}>
          <div>
            <a href="https://www.facebook.com/nfrdiphilippines" target="_blank">
              <FaFacebookSquare
                className={style.SocMedIcons}
                color="#3b5998"
                size={25}
              />
            </a>
          </div>
          <div className={style.Twitter}>
            <a href="https://twitter.com/DA_NFRDI" target="_blank">
              <FaTwitterSquare
                className={style.SocMedIcons}
                color="#1DA1F2"
                size={25}
              />
            </a>
          </div>
          <div className={style.Youtube}>
            <a href="http://www.youtube.com/@DA_NFRDI" target="_blank">
              <FaYoutubeSquare
                className={style.SocMedIcons}
                color="#FF0000"
                size={25}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
```

### Upper Header

    In the *upper header*, you'll find a reserved **'accessibility button'** without function yet. This button serves various website needs, such as enabling features like dark mode or adjusting font size for enhanced readability.

    ![Alt text](/img/Snippets/Accessibility.png)

    Following the accessibility button is the **'Go-to Home' button**, which provides a convenient way to navigate back to the main website of NFRDI.

    ![Alt text](/img/Snippets/GoToHome.png)   ![Alt text](/img/Snippets/NFRDI_MainWebsite.png)

    Next, we have the **'Admin Login' button**, providing access to the backend and essential content management functions of the website.

     ![Alt text](/img/Snippets/AdminLogin.png)

     The final element in the upper header is the **'PST' feature**, which stands for **Philippine Standard Time**. This live display shows the current month, day, year, and time according to the Philippine timezone.

    ![Alt text](/img/Snippets/PST.png)

### Lower Header

    In the *lower header* section, you'll find button for the **DA-NFRDI Logo / Text**. Clicking on this button serves as a home button, redirecting users to the procurement section of the website.

     ![Alt text](/img/Snippets/DA-NFRDI.png)

     Finally, you'll find links to *NFRDI's social media profiles*, including **Facebook**, **Twitter**, and **Youtube**, allowing users to connect with the institute through various platforms.

     ![Alt text](/img/Snippets/NFRDI_SocMeds.png)

  <Tabs>
  <TabItem value="Facebook" label="Facebook" default >
    Visit the [**Facebook**](https://www.facebook.com/nfrdiphilippines) page of the NFRDI Philippines.
     ![Alt text](/img/Snippets/Facebook.png)

  </TabItem>
  <TabItem value="Twitter" label="Twitter"  >
    Visit the [**Twitter**](https://twitter.com/DA_NFRDI) Page of the DA-NFRDI Philippines.
     ![Alt text](/img/Snippets/Twitter.png)

  </TabItem>
  <TabItem value="YouTube" label="YouTube" >

Visit the [**YouTube**](http://www.youtube.com/@DA_NFRDI) channel of the NFRDI Philippines.
![Alt text](/img/Snippets/YouTube.png)

  </TabItem>
  </Tabs>

  </TabItem>
  <TabItem value="Body" label="Body">
  ## Body

    The **Body** features the welcome *Opening Title*, a *SearchBar* for easy navigation, and a *CalendarYear* showcasing all procurement-related content.
    ![Alt text](/img/Snippets/Body.png)

```jsx title="Body" showlineNumbers
    import React, { useState, useRef, useEffect } from "react";

import style from "../Components/CalendarYearCopy.module.css";
import { IoAddCircle } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import { useVisibilityToggles } from "../../src/utils/OngoComFunctions";
import { RxOpenInNewWindow } from "react-icons/rx";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

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
id={style.AlternativeLines} >
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
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [projectList, setProjectList] = useState(
JSON.parse(localStorage.getItem("projects"))
);

const toggleYearContent = (year, section) => {
if (activeYear === year && activeSection === section) {
setActiveYear(null);
setActiveSection(null);
setClickedYear(null);
setCurrentPage(1); // Reset currentPage to 1
} else {
setActiveYear(year);
setActiveSection(section);
setClickedYear(year); // Set the clicked year
setCurrentPage(1); // Reset currentPage to 1
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

const convertDateFormat = (date) => {
const options = { month: "short", day: "2-digit", year: "numeric" };
const finalDate = new Date(date);
return finalDate.toLocaleDateString("en-US", options);
};

const itemsPerPage = 5;

useEffect(() => {
const filteredProjectList = projectList.filter((data) => {
const projectYear = new Date(data.date_published)
.getFullYear()
.toString();
return (
projectYear === clickedYear && // Match the year
((activeSection === "Bidding" && data.type === 1) ||
(activeSection === "Alternative" && data.type === 2)) && // Match the section
((isOngoingActive && data.status.toLowerCase() === "ongoing") ||
(isCompletedActive && data.status.toLowerCase() === "completed"))
); // Match the status
});
const totalPages = Math.ceil(filteredProjectList.length / itemsPerPage);
setTotalPages(totalPages);
}, [
projectList,
clickedYear,
activeSection,
isOngoingActive,
isCompletedActive,
]);

useEffect(() => {
setCurrentPage(1); // Reset currentPage when ongoing/completed toggles are changed
}, [isOngoingActive, isCompletedActive]);

const handleNextPage = () => {
if (currentPage < totalPages) {
setCurrentPage(currentPage + 1);
}
};

const handlePreviousPage = () => {
if (currentPage > 1) {
setCurrentPage(currentPage - 1);
}
};

const startIndex = (currentPage - 1) \* itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, projectList.length);

const renderTableRows = () => {
const filteredProjects = projectList.filter((data) => {
const projectYear = new Date(data.date_published)
.getFullYear()
.toString();
return (
projectYear === clickedYear &&
((activeSection === "Bidding" && data.type === 1) ||
(activeSection === "Alternative" && data.type === 2)) &&
((isOngoingActive && data.status.toLowerCase() === "ongoing") ||
(isCompletedActive && data.status.toLowerCase() === "completed"))
);
});
const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return paginatedProjects.map((data, index) => (
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
                handlePdfView("http://localhost:5000/" + data.bac_resolution)
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
                handlePdfView("http://localhost:5000/" + data.notice_of_award)
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
                handlePdfView("http://localhost:5000/" + data.contract)
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
                handlePdfView("http://localhost:5000/" + data.notice_to_proceed)
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
                  "http://localhost:5000/" + data.philgeps_award_notice
                )
              }
            >
              VIEW
            </button>
          )}
        </td>
        <td>{convertDateFormat(data.date_published)}</td>
      </tr>
    ));

};

return (
<div>
<div className={style.bodyCalendarYear}>
<div className={`${style.txtCalendarYear} ${style.animateCharacter}`}>
Calendar Year
</div>

        <div
          className={style.bodyContentCY}
          id={style.Lines}
          ref={containerRef}
        >
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

      {pdfUrl && (
        <div className={style.pdfViewerContainer}>
          <div className={style.closeButton} onClick={closePdfViewer}>
            <FaWindowClose size={20} />
          </div>
          <div
            className={style.viewInNewTabButton}
            onClick={() => window.open(pdfUrl)}
          >
            <RxOpenInNewWindow size={15} />
            View PDF on a New Tab
          </div>
          <iframe src={pdfUrl} title="PDF Viewer"></iframe>
        </div>
      )}
      {(activeSection === "Bidding" || activeSection === "Alternative") && ( // Only render the table if activeSection is Bidding or Alternative
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
                <div className={style.Choose}>
                  {!isOngoingActive &&
                    !isCompletedActive &&
                    "Please select what you would like to display: 'Ongoing' or 'Completed'."}
                </div>
                <>
                  {(isOngoingActive || isCompletedActive) && (
                    <>
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
                        {renderTableRows()}
                      </tbody>
                      <div className={style.tablePage}>
                        <div className={style.tablePageNumber}>
                          {totalPages > 0
                            ? `Page ${currentPage} of ${totalPages}`
                            : "No PROCUREMENTS available as of the moment."}
                        </div>
                        {currentPage > 1 && (
                          <div
                            className={style.tablePreviousPage}
                            onClick={handlePreviousPage}
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
                            onClick={handleNextPage}
                          >
                            Next Page
                            <div className={style.tableNextIcon}>
                              <GrFormNext size={25} />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              </table>
            </div>
          )}

          {activeSection === "Alternative" && (
            <div className={style.tablealternativecontainer}>
              <h2>List of Alternative / {clickedYear}</h2>

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
                <div className={style.Choose}>
                  {!isOngoingActive &&
                    !isCompletedActive &&
                    "Please select what you would like to display: 'Ongoing' or 'Completed'."}
                </div>
                <>
                  {(isOngoingActive || isCompletedActive) && (
                    <>
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
                        {renderTableRows()}
                      </tbody>
                      <div className={style.tablePage}>
                        <div className={style.tablePageNumber}>
                          {totalPages > 0
                            ? `Page ${currentPage} of ${totalPages}`
                            : "No PROCUREMENTS available as of the moment."}
                        </div>
                        {currentPage > 1 && (
                          <div
                            className={style.tablePreviousPage}
                            onClick={handlePreviousPage}
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
                            onClick={handleNextPage}
                          >
                            Next Page
                            <div className={style.tableNextIcon}>
                              <GrFormNext size={25} />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              </table>
            </div>
          )}
        </div>
      )}
    </div>

);
};

export default CalendarYear;
```

     ### Opening Title
     The opening title dynamically displays *'Welcome to the* **"DA-NFRDI | National Fisheries Research and Development Institute | Procurement'** *Reports*,' with text interchanging to provide relevant information.
     ![Alt text](/img/Snippets/Welcome.png)

    ### Search Bar
    The *SearchBar* offers functionality for searching by various criteria including Title of the Procurement, PR Number, Bidding/Alternative, Completion Status (Completed/Ongoing), and Year.
      ![Alt text](/img/Snippets/SearchBar.png)

    ### Search Content
    The *SearchContent* displays search results with five items per page. Each item includes the Title of the Procurement, PR Number, Bidding/Alternative status, Completion Status, and Year.
      ![Alt text](/img/Snippets/SearchContent.png)

    ### Search Result
    When a *SearchContent* item is clicked, it presents comprehensive information on the procurement. In addition to the details displayed in the content, the *SearchResult* includes the Title/Project name, Contractor, Contract Amount, Date Published, and links to PDF files for the BAC Resolution, Notice of Award, Contract, Notice to Proceed, and PhilGeps Award Notice.
      ![Alt text](/img/Snippets/SearchResult.png)
    Additionally, there is a **'View'** button provided for each PDF file. Clicking on this button opens the PDF and has also a button for *viewing on a new tab*, allowing for a larger viewing size.
      ![Alt text](/img/Snippets/SearchResult_pdf.png)

    ### Calendar Year

Within the sidebar, you'll encounter the calendar year feature. It presents years ranging from 2024 to 2015. Upon selecting a specific year, you'll be presented with two options: Bidding and Alternative Procurements.

![Alt text](/img/Snippets/SideBar.png) → → → ![Alt text](/img/Snippets/SideBar-Opt.png)

    ### Calendar Year Contents
    Moving on to the content section, selecting either Bidding or Alternative will prompt a menu for further selection. You can choose to display either Ongoing or Completed procurements.
      ![Alt text](/img/Snippets/Ca_Bidding.png)

After selecting, for example, 'Completed,' the interface will display five procurements per page, if available. The contents include the PR Number, Title/Project, Contractor, Contract Amount, BAC Resolution, Notice of Awards, Contract, Notice to Proceed, Philgeps Award Notice, and Date Published.
![Alt text](/img/Snippets/Ca_Bidding-Contents.png)

Upon clicking the 'View' button, the interface will display the PDF content corresponding to the specific category you selected. Additionally, there is an option to 'View PDF' in a new tab for a larger viewing experience.
![Alt text](/img/Snippets/Ca_Bidding-ContentsPDF.png)

  </TabItem>
  <TabItem value="Footer" label="Footer">
  ## Footer
    All content herein pertains to public domains of the Republic of the Philippines, unless explicitly stated otherwise. Government links provided include those of the Office of the President, Vice President, Senate of the Philippines, House of Representatives, Supreme Court, Court of Appeals, and Sandiganbayan.

    ![Alt text](/img/Snippets/Footer.png)

```html title="Footer"
<div id="gwt-standard-footer"></div>
<script type="text/javascript">
  (function (d, s, id) {
    var js,
      gjs = d.getElementById("gwt-standard-footer");

    js = d.createElement(s);
    js.id = id;
    js.src = "//gwhs.i.gov.ph/gwt-footer/footer.js";
    gjs.parentNode.insertBefore(js, gjs);
  })(document, "script", "gwt-footer-jsdk");
</script>
```

  </TabItem>
</Tabs>
