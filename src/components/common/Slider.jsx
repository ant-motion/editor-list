/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Slider from 'antd/lib/slider';

export default ({ value: v, onChange, ...props }) => {
  const [value, setValue] = useState(v);
  useEffect(() => {
    setValue(v);
  }, [v]);
  return (
    <Slider
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e);
        onChange('opacity', e, true);
      }}
      onAfterChange={(e) => {
        setValue(e);
        onChange('opacity', e);
      }}
    />
  );
}