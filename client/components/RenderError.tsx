import React from 'react';

const RenderError = ({ error, isValid }: { error: { [key: string]: string }; isValid: boolean }) => {
  let body = null;
  for (let i in error) {
    if (isValid) return body;
    body = (
      <div className="my-4">
        <h4 className="text-red-600">{error[i]}</h4>
      </div>
    );
  }
  return body;
};

export default RenderError;
