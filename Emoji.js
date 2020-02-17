import React, { memo } from 'react'
import twemoji from 'twemoji'

const Twemoji = ({ emoji }) => (
	<span
		css={`
			.emoji {
				display: inline-block;
				width: auto;
				height: 1.2em;
				vertical-align: -0.2rem;
			}
		`}
		dangerouslySetInnerHTML={{
			__html: twemoji.parse(emoji, {
				folder: 'svg',
				ext: '.svg'
			})
		}}
	/>
)

export default memo(Twemoji)
