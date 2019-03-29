module.exports = {
	extends: [
		'plugin:vue/recommended',
		'./.eslintrc.base.js'
	],
	rules: {
		"vue/html-self-closing": ["error", {
			"html": {
				"component": "never",
				"normal": "never"
			}
		}],
		"vue/attribute-hyphenation": ["off"],
		"vue/html-indent": ["error", 4],
		"vue/max-attributes-per-line": ["warn", {
			"singleline": 3
		}]
	}
}