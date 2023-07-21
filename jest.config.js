// eslint-disable-next-line import/no-anonymous-default-export
export default {
	preset: 'react-scripts',
	transform: {
	  '^.+\\.jsx?$': 'babel-jest',
	},
	transformIgnorePatterns: [
	  '/node_modules/(?!(axios)/)'
	],
  };
  
  