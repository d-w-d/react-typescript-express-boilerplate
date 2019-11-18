import * as React from 'react';

export const ErrorMessage: React.FC<{ errorMessage: string | null }> = ({ errorMessage }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: 10,
        color: '#ff0000'
      }}
    >
      {errorMessage}
    </div>
  );
};
