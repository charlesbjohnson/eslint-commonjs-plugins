const Case = require('./');
const Options = require('../options');

describe('Case', () => {
	describe('.validate', () => {
		test('disable option', () => {
			const result = Case.validate(
				'_',
				'lodash',
				Options.merge(Options.disabled(), {disable: ['^lodash$']})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});

		test('type', () => {
			const result = Case.validate(
				'not_camel_case',
				'not-camel-case',
				Options.disabled()
			);

			expect(result.equal).toBe(false);
			expect(result.error).not.toBeNull();
		});

		test('type option', () => {
			const result = Case.validate(
				'PascalCase',
				'pascal-case',
				Options.merge(Options.disabled(), {type: 'pascal'})
			);

			expect(result.equal).toBe(true);
			expect(result.error).toBeNull();
		});
	});
});
