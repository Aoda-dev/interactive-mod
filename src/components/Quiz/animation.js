import * as wrongJson from '../../assets/json/wrong.json'
import * as correctJson from '../../assets/json/done.json'
import * as quizEndBackgroundJson from '../../assets/json/quizEndBackground.json'
import * as timeEndJson from '../../assets/json/timeend.json'

export const wrongOptions = {
	loop: true,
	autoplay: true,
	animationData: wrongJson,
}

export const correctOptions = {
	loop: true,
	autoplay: true,
	animationData: correctJson,
}

export const quizEndBackgroundOptions = {
	loop: true,
	autoplay: true,
	animationData: quizEndBackgroundJson,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
}

export const timeEndOptions = {
	loop: true,
	autoplay: true,
	animationData: timeEndJson,
}
