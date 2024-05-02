import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    Svg: require("/static/img/Snippets/Node.js_logo.svg").default,
    description: "Node.js",
  },
  {
    Svg: require("/static/img/Snippets/Npm-logo.svg").default,
    description: "npm",
  },
  {
    Svg: require("/static/img/Snippets/Javascript_logo.svg").default,
    description: "JavaScript",
  },
  {
    Svg: require("/static/img/Snippets/VSCode_logo.svg").default,
    description: "Visual Studio Code",
  },
  {
    title: "Before we start",
    Svg: require("/static/img/Snippets/Install_logo.svg").default,
    description: (
      <>
        <p>Let's install some things first:</p>

        <div className="installation-step">
          <h2>1. Install Node.js and npm</h2>
          <p>
            Node.js is a JavaScript runtime environment, and npm is a package
            manager for Node.js.
          </p>
          <ul>
            <li>
              Go to the Node.js website:{" "}
              <a href="https://nodejs.org/" target="_blank">
                https://nodejs.org/
              </a>
            </li>
            <li>
              Download and install the latest LTS version of Node.js for your
              operating system.
            </li>
            <li>
              npm is included with Node.js, so once you install Node.js, npm
              will be installed automatically.
            </li>
          </ul>
        </div>

        <div className="installation-step">
          <h2>2. Install Visual Studio Code (VSCode)</h2>
          <p>
            VSCode is a lightweight and powerful source code editor developed by
            Microsoft.
          </p>
          <p>
            You can download and install VSCode for free from the official
            website:{" "}
            <a href="https://code.visualstudio.com/" target="_blank">
              https://code.visualstudio.com/
            </a>
          </p>
        </div>

        <div className="installation-step">
          <h2>3. Install Create React App (Optional)</h2>
          <p>
            Create React App is a tool that helps you quickly set up a new
            React.js project with a pre-configured development environment.
          </p>
          <p>
            To install Create React App globally, run the following command:
          </p>
          <pre>
            <code>npm install -g create-react-app</code>
          </pre>
        </div>
      </>
    ),
  },
  {
    Svg: require("/static/img/Snippets/Xampp_logo.svg").default,
    description: "XAMPP",
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
