import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Anchor } from '../components/vanilla/button';
import { HeadingOne } from '../components/vanilla/heading';
import { ListDividedState } from '../components/vanilla/list';

import containerStyles from './container.css';
import styles from './landing.css';

import * as images from '../images';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className={ containerStyles.lightStrip }>
          <div>
            <div className={ containerStyles.wrapper }>
              <HeadingOne>
                Auto-build and publish software for any Linux system or device
              </HeadingOne>

              <ul className={ styles.banner }>
                <li className={ styles.bannerImage }>
                  <img src={images.banner} />
                </li>

                <li className={ styles.bannerLabel }>
                  Push to GitHub
                </li>
                <li className={ styles.bannerLabel }>
                  Built automatically
                </li>
                <li className={ styles.bannerLabel }>
                  Published for your users
                </li>
              </ul>

              <div className={ styles.bannerButton }>
                <Anchor  href="/auth/authenticate">Set up in minutes</Anchor>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={ `${styles.row} ${containerStyles.wrapper}` }>
            <ListDividedState className={ styles.rowItemGrow }>
              <li>Scale to millions of installs</li>
              <li>Available on all clouds and Linux OSes</li>
              <li>No need for build infrastructure</li>
            </ListDividedState>

            <ListDividedState className={ styles.rowItemGrow }>
              <li>Automatic updates for everyone</li>
              <li>Roll back versions effortlessly</li>
              <li>FREE for open source projects</li>
            </ListDividedState>
          </div>
        </section>

        <section className={styles.section}>
          <div className={ `${styles.row} ${containerStyles.wrapper}` }>
            <img className={ styles.brandLogo } src={images.ubuntu} />
            <img className={ styles.brandLogo } src={images.archlinux} />
            <img className={ styles.brandLogo } src={images.debian} />
            <img className={ styles.brandLogo } src={images.gentoo} />
            <img className={ styles.brandLogo } src={images.fedora} />
            <img className={ styles.brandLogo } src={images.opensuse} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={containerStyles.wrapper}>
            {/* TODO put in actual workflow image */}
            <img className={ styles.workflowImage} src='http://placehold.it/1030x480?text=WORKFLOW' />
            <div className={ styles.centeredButton }>
              <Anchor  href="/auth/authenticate">Get started now</Anchor>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={ `${styles.row} ${containerStyles.wrapper}` }>


            <div className={styles.rowItemTwoThirds}>
              <p className={styles.snaps}>Snaps are secure, sandboxed, containerised applications, packaged with their dependencies for predictable behavior. With the Snap Store, people can safely install apps from any vendor on mission-critical devices and PCs.</p>
              <Anchor href="https://snapcraft.io">More about snaps</Anchor>
            </div>

            <img className={ styles.rowItem } src='http://placehold.it/200x200?text=SNAP' />
          </div>
        </section>

        {/* TODO testimonials */}
      </div>
    );
  }

}

Landing.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object
};

function mapStateToProps(state) {
  const {
    auth
  } = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(Landing);
