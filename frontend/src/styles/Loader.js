import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
.Loader-ctl {
  display: inline-block;
}
.doSymbol {
    width: 25px;
    height: 25px;
}
.Loader {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
    align-content: center;
    align-items: center;
    justify-content: center;
    background: #296ccc;
  }
  
  .doSymbol {
    animation: rotate 6s infinite linear;
    fill: #12101b;
  }
  
  .doSymbol1,
  .doSymbol2,
  .doSymbol3,
  .doSymbol4,
  .doSymbol5,
  .doSymbol6 {
    animation: scale 6s infinite ease-in-out;
    transform-origin: center center;
  }
  
  .doSymbol1 {
    animation-delay: 0;
  }
  .doSymbol2 {
    animation-delay: 0.25s;
  }
  .doSymbol3 {
    animation-delay: 0.5s;
  }
  .doSymbol4 {
    animation-delay: 0.75s;
  }
  .doSymbol5 {
    animation-delay: 1s;
  }
  .doSymbol6 {
    animation-delay: 1.25s;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
  
  @keyframes scale {
    0% {
      transform: scale(1);
      opacity: 1;
      fill: #99ccff;
    }
    12.5% {
      transform: scale(0.25);
      opacity: 0.5;
      fill: #0080ff;
    }
    25% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
`;

const FoxesLoader = () => {
    return (
<Wrapper >
  <div className="Loader-ctl">
    <div className="doSymbol">
      <svg viewBox="0 0 94.31 95.69">
        <g data-name="Layer 2">
          <g fill="#99ccff;" data-name="Layer 1">
            <path
              className="doSymbol1"
              d="M94.31 60.47V33.83L71.23 20.5 49.15 33.25l35.72 20.62v12.05l9.44-5.45z"
            />
            <path
              className="doSymbol2"
              d="M81.67 13.32L58.59 0 35.51 13.32v25.49L71.23 18.2l10.44 6.02v-10.9z"
            />
            <path
              className="doSymbol3"
              d="M34.51.69L11.44 14.02v26.65l22.07 12.74V12.17l10.44-6.03L34.51.69z"
            />
            <path
              className="doSymbol4"
              d="M45.15 62.44L9.44 41.82V29.77L0 35.22v26.64l23.08 13.33 22.07-12.75z"
            />
            <path
              className="doSymbol5"
              d="M23.08 77.5l-10.44-6.03v10.9l23.08 13.32 23.07-13.32V56.88L23.08 77.5z"
            />
            <path
              className="doSymbol6"
              d="M50.36 89.55L59.79 95l23.08-13.33V55.02L60.79 42.28v41.24l-10.43 6.03z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
  </Wrapper>
    )
};

export default FoxesLoader;