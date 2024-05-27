import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function LoadingSpinners(props) {
  return (
    <div className={'flex items-center justify-center '  +props.className}>
      <ScaleLoader radius={10} height={17.5*props.size} width={2*props.size} color="#36d7b7" />

    </div>
  )
}

export default LoadingSpinners
