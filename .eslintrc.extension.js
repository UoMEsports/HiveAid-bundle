module.exports = {
	parser: '@typescript-eslint/parser',
	"plugins": ["@typescript-eslint"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		'./.eslintrc.base.js'
	],
	rules: {
		"indent": ["off"],
		"@typescript-eslint/indent": ["error", 4],
		"@typescript-eslint/no-use-before-define": ["off", { "functions": false}]
	},
}
