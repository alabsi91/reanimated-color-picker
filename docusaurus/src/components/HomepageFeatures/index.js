import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Highly customizable',
    Svg: require('@site/static/img/customization.svg').default,
    description: <>Build your color picker from different components.</>,
  },
  {
    title: 'Supports multiple platforms',
    Svg: require('@site/static/img/platforms.svg').default,
    description: (
      <>
        Supports most popular platforms: <code>IOS</code> <code>Android</code> <code>Expo</code> <code>Web</code>
      </>
    ),
  },
  {
    title: 'Supports right to left (RTL) layout',
    Svg: require('@site/static/img/rtl.svg').default,
    description: (
      <>
       Supports <code>RTL</code> layout for languages like Arabic, Hebrew, Farsi, etc.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
