import React, { PropTypes } from 'react';

import styles from './heading.css';

const Heading = (props) => {
  const H = props.heading || 'h1';
  return (
    <H className={ styles[H] }>
      { props.children }
    </H>
  );
};

Heading.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

const HeadingOne = (props) => Heading({
  ...props,
  heading: 'h1'
});

const HeadingTwo = (props) => Heading({
  ...props,
  heading: 'h2'
});

const HeadingThree = (props) => Heading({
  ...props,
  heading: 'h3'
});

const HeadingFour = (props) => Heading({
  ...props,
  heading: 'h4'
});

const HeadingFive = (props) => Heading({
  ...props,
  heading: 'h5'
});

const HeadingSix = (props) => Heading({
  ...props,
  heading: 'h6'
});

export {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
  HeadingSix
};
