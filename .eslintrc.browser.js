module.exports = {
	extends: [
		'plugin:vue/recommended',
		'./.eslintrc.base.js'
	],
	rules: {
		"vue/html-self-closing": ["error", {
			"html": {
				"component": "never"
			}
		}]
	}
}