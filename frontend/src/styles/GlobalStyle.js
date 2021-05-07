import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 16px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

	:focus {
		outline: 0 !important;
	}
	
	::after,
	::before {
		box-sizing: border-box;
	}
	
	::-webkit-scrollbar {
		width: 5px;
		background-color: #F5F5F5;
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}

	::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #12101b;
	}

	::selection {
		background: rgb(46, 212, 234);
	}

	.Toastify__toast--dark, .Toastify__toast--default {
		background: #12101b !important;
		color: #20ebf0 !important;
		box-shadow: 2px 1px 0 0 #20ebf0 !important;
		border: 2px solid !important;
		border-radius: 5px !important;
		text-align: center;
	}
	.video-js {
		border: 2px solid #009ad0;
	}
	.switch-wrapper {
		position: relative;
	}
	.switch-wrapper > div {
		position: absolute;
	}
	body {
		font-size: 1rem;
		font-family: ${(props) => props.theme.font}, sans-serif;
		color: ${(props) => props.theme.primaryColor};
		background-color: ${(props) => props.theme.bg};
		line-height: 1.8;
		background: #12101b !important;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: 'Exo', sans-serif;
		line-height: 1.28571429em;
		margin: calc(2rem - .14285714em) 0 1rem;
		font-weight: 700;
		padding: 0;
		font-weight: 500;
		letter-spacing: 1px;
	}

	h3 {
		margin: calc(0.2rem - .04285714em) 0 0.1rem !important;
	}

	a {
		text-decoration: none;
		color: inherit;
		font-weight: 500;
        letter-spacing: 2px;
		outline: 0;

	}

	input, textarea {
		font-family: ${(props) => props.theme.font}, sans-serif;
		font-size: 1rem;
	}

	.customLoaderFoxes {
		position: fixed;
		bottom: 50px;
		left: 50px;
		right: 9px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: block;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		width: 9%;
		z-index: 99999;
	}
	.userID-width {
		width: 150px;
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: -ms-inline-flexbox;
		display: inline-flex;
		overflow: hidden;
		position: relative;
		left: 0;
		top: -3px;
		vertical-align: middle;
	}

	.sky-connect-wtih {
		text-align: center;
		width: 100%;
	}

	.foxesBtn {
		cursor: pointer !important;
		position: relative !important;
		display: inline-block !important;
		background: #20ebf0 !important;
		color: #12101b !important;
		font-weight: 700 !important;
		transition: border-color .1s linear 0s, background-color .1s linear 0s !important;
		border-color: transparent !important;
		padding: 0.5538rem 0.9231rem !important;
		min-width: 14.6154rem !important;
		text-transform: capitalize !important;
		box-shadow: none !important;
		letter-spacing: 3px !important;
	}

	.foxesBtn::before {
		content: "";
		box-sizing: content-box;
		display: block;
		position: absolute;
		background-color: rgb(48 49 58);
		border-style: none;
		border-width: 2px;
		border-color: #fff;
		transition: transform .4s ease-in-out 0s, border-color .4s linear 0s, background-color .4s linear 0s;
		transform-origin: center center;
	}
	
	.foxesBtn::before {
		top: -32px;
		left: -32px;
		width: 30px;
		height: 30px;
		overflow: visible !important;
		border-radius: 3px;
	}

	.foxesBtn::after {
		content: "";
		box-sizing: content-box;
		display: block;
		position: absolute;
		border-width: 2px;
		border-color: #fff;
		transition: transform .4s ease-in-out 0s, border-color .4s linear 0s, background-color .4s linear 0s;
		transform-origin: center center;
	}

	.foxesBtn::after {
		bottom: -32px;
		right: -32px;
		width: 30px;
		height: 30px;
		overflow: visible !important;
		border-radius: 3px;
	}

	.foxesBtn::after {
		content: "";
    	box-sizing: content-box;
    	display: block;
    	position: absolute;
    	border-width: 2px;
    	border-color: #fff;
    	transition: transform .4s ease-in-out 0s, border-color .4s linear 0s, background-color .4s linear 0s;
    	transform-origin: center center;
	}

	.foxesBtn:hover::before {
		-webkit-transform: translateX(20px) rotate(-180deg);
		-moz-transform: translateX(20px) rotate(-180deg);
		-ms-transform: translateX(20px) rotate(-180deg);
		-o-transform: translateX(20px) rotate(-180deg);
		transform: translateX(20px) rotate(-180deg);
		color: #2d2d2d;
		background-color: #20ebf0;
		transition: transform .4s ease-in-out 0s, border-color .4s linear 0s, background-color .4s linear 0s;
		transform-origin: center center;
	}

	.foxesBtn:hover::after {
		-webkit-transform: translateX(-20px) rotate(180deg);
	    -moz-transform: translateX(-20px) rotate(180deg);
		-ms-transform: translateX(-20px) rotate(180deg);
		-o-transform: translateX(-20px) rotate(180deg);
		transform: translateX(-20px) rotate(180deg);
		color: #2d2d2d;
		background-color: #20ebf0;
		transition: transform .4s ease-in-out 0s, border-color .4s linear 0s, background-color .4s linear 0s;
		transform-origin: center center;
	}

	.foxeslogo {
		width: 300px;
    	height: 200px;
    	position: relative;
    	left: 50%;
    	top: 50%;
    	transform: translate(-50%, -10%);
    	text-align: center;
	}

	.tpmin1 {
		width: 2em;
		height: 1.5em;
		left: 0;
		margin-right: 0.2rem !important;
	}

	input:focus, textarea:focus, button:focus, video:focus {
			outline: none;
	}

	button {
		font-family: 'Exo', sans-serif;
		font-size: 1rem;
		cursor: pointer;
	}

	textarea {
		resize: none;
	}

	svg, .pointer {
		cursor: pointer;
	}

	.secondary {
		color: ${(props) => props.theme.secondaryColor};
	}

	.tpmin16 {
		top: -12px;
		position: relative;
		width: 130px;
		height: 25px;
	}

	.avatar {
		height: 22px;
		width: 22px;
		border-radius: 10px;
		object-fit: cover;
	}


	.md {
		height: 50px;
		width: 50px;
		border-radius: 25px;
	}

	.small {
		font-size: 0.9rem;
	}

	.lg {
		height: 60px;
		width: 60px;
		border-radius: 30px;
	}

	.flex-row {
		display: flex;
		align-items: center;
	}

	.flex-row img, .flex-row svg {
		margin-right: 0.8rem;
	}

	.ruler {
		height: 1px;
		background: ${(props) => props.theme.darkGrey};
		margin: 1rem 0;
	}

	.Toastify__toast {
		font-family: ${(props) => props.theme.font}, sans-serif;
		border-radius: 4px;
	}

	.Toastify__toast--error {
		background: ${(props) => props.theme.darkGrey};
	}

	.Toastify__toast--dark, .Toastify__toast--default {
		background: ${(props) => props.theme.purple};
    color: #fff;
	}
	


	@media screen and (max-width: 530px) {
		body {
			font-size: 0.95rem;
		}

		button {
			font-size: 0.9rem;
	  }
	  
	}
	@media screen and (max-width: 500px) {

	.customLoaderFoxes {
		bottom: 66px;
    	background: #12101b;
    	width: 100%;
    	text-align: center;
    	line-height: 3;
    	left: 0;
    	right: 0;
    	height: 60px;
    	font-size: 12px;
    	border: 2px solid #009ad0;
	  }
	  
	}
`;

export default GlobalStyle;
