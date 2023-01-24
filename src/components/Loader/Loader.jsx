import React from 'react';

import {LoaderStyled} from './Loader.styled'

export const Loader = () => {
  return (
    <LoaderStyled
      className="Loader"
      height="60"
      width="60"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      wrapperClass=""
      visible={true}
    />
  );
};
