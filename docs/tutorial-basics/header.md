---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Header

The **Header** consists of two sections: the upper header and the lower header. The _upper header_ features the Accessibility Button, Go-to-Home Button, Admin-Login Button, and the Philippine Standard Time (PST) display. Meanwhile, the _lower header_ includes the NFRDI Logo/Text and links to its social media platforms.

![Alt text](/img/Snippets/Header.png)

## Upper Header

**Accessibility Button**

![Alt text](/img/Snippets/Accessibility.png)

```jsx title="Accessibility Button"
<div className={style.headerAcccessibility}>
  <RxAccessibility color="#69DDFF" size={25} />
  Accessibility
</div>
```

**Go-to-Home Button**

![Alt text](/img/Snippets/GoToHome.png)

```jsx title="Go-to-Home Button"
<div>
  <a className={style.headerGoBack} href="https://nfrdi.da.gov.ph/">
    <IoArrowBackCircle color="#69DDFF" size={25} />
    Go to Home
  </a>
</div>
```

**Admin Login Button**

![Alt text](/img/Snippets/AdminLogin.png)

```jsx title="Admin Login Button"
<div className={style.headerAdminLogin}>
  <FaExternalLinkSquareAlt color="#69DDFF" size={20} />
  Admin login
</div>
```

**PST - Philippine Standard Time**

![Alt text](/img/Snippets/PST.png)

```jsx title="Philippine Standard Time"
<div className={style.headerPST}>
  Philippine Standard Time:
  <p>{`${generateDay(daysOftheWeek)}, ${generateMonth(
    month
  )} ${day}, ${year}  ${hours}:${minutes}:${seconds}`}</p>
</div>
```

```jsx title="Philippine Standard Time [javascript]"
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
```

## Lower Header

**NFRDI Home Button**

![Alt text](/img/Snippets/DA-NFRDI.png)

```jsx title="DA-NFRDI Image"
<img
  id={style.imagecontent}
  src="../../public/images/HeaderContentBelow2.svg"
  alt="HomeImage"
/>
```

**NFRDI Social Media**

![Alt text](/img/Snippets/NFRDI_SocMeds.png)

  <Tabs>
  <TabItem value="Facebook" label="Facebook" default  >
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
