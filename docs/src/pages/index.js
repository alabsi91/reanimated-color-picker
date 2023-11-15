import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description='A Pure JavaScript Color Picker for React Native'>
      <header className={styles.heroBanner}>
        <div className='container'>
          <h1 className='hero__title' style={{ color: 'black', textShadow: '0px 0px 5px rgb(250,250,250,1)' }}>
            {siteConfig.title}
          </h1>
          <p className='hero__subtitle' style={{ color: 'black', textShadow: '0px 0px 5px rgb(250,250,250,1)' }}>
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
