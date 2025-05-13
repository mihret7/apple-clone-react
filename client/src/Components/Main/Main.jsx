// import React from 'react';

import './Main.css'

import Alert from '../Alert/Alert.jsx'
import FirstSection from './First-Section/FirstSection'
import SecondSection from './Second-Section/SecondSection'
import ThirdSection from './Third-Section/ThirdSection'
import FourthSection from './Fourth-Section/FourthSection'
import FifthSection from './Fifth-Section/FifthSection'
import SixSection from './Six-Section/SixSection'
import YouTube from '../YouTube/YouTube.jsx'

function Main() {
  return (
    <>
    <Alert />
    <FirstSection/>
	  <SecondSection/>
	  <ThirdSection/>
	  <FourthSection/>
	  <FifthSection/>
	  <SixSection/>
    <YouTube />
    </>
  )
}


export default Main





