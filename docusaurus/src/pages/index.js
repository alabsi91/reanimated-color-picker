import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description='Pure JavaScript color picker for react-native'>
      <header className={styles.heroBanner}>
        <div className='container'>
          <h1 className='hero__title' style={{ textShadow: '0px 0px 5px rgb(0,0,0,0.3)' }}>
            {siteConfig.title}
          </h1>
          <p className='hero__subtitle' style={{ textShadow: '0px 0px 5px rgb(0,0,0,0.3)' }}>
            {siteConfig.tagline}
          </p>
          <Link className={styles.button} to='/docs/intro'>
            Documentation
          </Link>
        </div>
      </header>
    </Layout>
  );
}
