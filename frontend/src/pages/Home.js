import React from 'react'
import Carousel from '../components/ImageCarousel'
import '../style/Home.css'
import UpcomingEvents from '../components/UpcomingEvents'

function Home() {

	return (
		<div className='home'>

			<Carousel />
			
			<UpcomingEvents />

		</div>
	)
}

export default Home
