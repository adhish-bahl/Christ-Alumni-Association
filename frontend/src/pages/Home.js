import React from 'react'
import Carousel from '../components/ImageCarousel'
import '../style/Home.css'
import Cloud from '../images/cloudComputing.jpeg'
import Job from '../images/jobHunt.jpeg'
import Money from '../images/moneyInvestment.jpeg'

function Home() {

	return (
		<div className='home'>

			<Carousel />

			<marquee className="marqueeText">Registrations for all alumni 2024 are now open! Fill the Form as soon as possible.</marquee>

			<div className="upcoming">
				<h1 className='heading'>Upcoming Programs by our Alumni</h1>

				<div className="progCont">

					<div className="prog prog1">
						<h3 className='eventHeading'>Let' talk about Cloud Computing</h3>
						<h5 className='eventBy'>By Mukesh Tiwari</h5>
						<div className='imageCont'>
							<img src={Cloud} alt="Cloud Computing" className='eventImage' />
						</div>
						<div className="desc">
							Event will bring together industry leaders, tech innovators, and cloud enthusiasts. The event will feature keynote speeches, panel discussions, and hands-on workshops focused on the latest trends and advancements in cloud technology, AI integration, and cybersecurity. Attendees will have the opportunity to network with professionals from top tech companies and gain insights into emerging cloud solutions.
						</div>
						<div className="date">Date: 26 June 2024</div>
						<div className="venue">Venue: Google Meet</div>
					</div>

					<div className="prog prog2">
						<h3 className='eventHeading'>How to Hunt Job in 2024?</h3>
						<h5 className='eventBy'>By Sandeep Jain</h5>
						<div className='imageCont'>
							<img src={Job} alt="Job Hunt" className='eventImage' />
						</div>
						<div className="desc">
							This one-day expo will feature numerous employers, including Fortune 500 companies and innovative startups, offering a range of job opportunities. Attendees can participate in resume workshops, interview coaching sessions, and networking mixers. It's an excellent chance for job hunters to connect with potential employers and advance their careers.
						</div>
						<div className="date">Date: 28 June 2024</div>
						<div className="venue">Venue: Christ (Deemed to be University)</div>
					</div>

					<div className="prog prog3">
						<h3 className='eventHeading'>Money Investment Tips and Tricks</h3>
						<h5 className='eventBy'>By Mohit Agrawal</h5>
						<div className='imageCont'>
							<img src={Money} alt="Money Investment" className='eventImage' />
						</div>
						<div className="desc">
							The conference will cover a wide array of topics, from stock market strategies and real estate investment to cryptocurrency and sustainable finance. With sessions led by top financial experts and successful investors, participants will gain valuable insights into market trends and investment opportunities. The event also offers networking opportunities with peers and industry leaders.
						</div>
						<div className="date">Date: 05 July 2024</div>
						<div className="venue">Venue: Google Meet</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Home
