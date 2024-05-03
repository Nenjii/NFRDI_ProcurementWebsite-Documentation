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
        <a href="/tutorial-basics/configurations"> Click me First! </a>
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
