'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const AOSInit = () => {
	useEffect(() => {
		AOS.init({
			once: true,
			// disable: 'phone',
			duration: 700,
			easing: 'ease-out-cubic',
		})
	}, [])

	return null;
}


