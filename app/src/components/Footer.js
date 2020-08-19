import React from 'react'

import './Footer.css';
import rdaLogo from '../images/RDA-Primary-Logo.png'
import daughertyLogo from '../images/Daugherty_Logo.png'

const Footer = (props) => {

  return (
    <footer style={{margin: 0}}>
      <section className='support-wrapper'>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. Gravida arcu ac tortor dignissim convallis aenean et. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Netus et malesuada fames ac turpis egestas integer. Neque egestas congue quisque egestas. In metus vulputate eu scelerisque felis imperdiet proin. Sit amet aliquam id diam. Diam volutpat commodo sed egestas. At lectus urna duis convallis. Ut tellus elementum sagittis vitae et leo. Libero justo laoreet sit amet cursus sit amet dictum sit. Ultricies tristique nulla aliquet enim. Ipsum consequat nisl vel pretium lectus quam id. Ante metus dictum at tempor commodo ullamcorper. Nullam ac tortor vitae purus faucibus ornare. Viverra vitae congue eu consequat. Aliquam nulla facilisi cras fermentum odio eu feugiat. Aliquam eleifend mi in nulla posuere.
        </p>
        <img src={rdaLogo} width="220" height='120' style={{ marginLeft: '20px' }} alt='Regional Data Alliance Logo' />
        <img src={daughertyLogo} width="200" height='130' style={{ marginLeft: '20px' }} alt='Daugherty Business Solutions Logo' />
      </section>
    </footer>
  )
}

export default Footer