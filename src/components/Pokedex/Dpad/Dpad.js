import React from 'react';
import PropTypes from 'prop-types';
import './Dpad.css';

const Dpad = (props) => {
  return (
    <div className="dpad">
        <button className="dpad-btn up" onClick={props.up} />
        <button className="dpad-btn down" onClick={props.down} />
        <button className="dpad-btn left" onClick={props.left} />
        <button className="dpad-btn right" onClick={props.right} />
        <button className="dpad-btn center" />
    </div>
  );
};

Dpad.propTypes = {
  up: PropTypes.func,
  down: PropTypes.func,
  left: PropTypes.func,
  right: PropTypes.func
};

export default Dpad;