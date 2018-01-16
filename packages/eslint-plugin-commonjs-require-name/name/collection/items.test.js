const Items = require('./items');

describe('Items', () => {
	describe('.instance', () => {
		test('name value', () => {
			const instance = Items.instance('name');

			expect(instance.value).toHaveLength(1);
			expect(instance.value[0].value).toBe('name');
			expect(instance.value[0].namespace).toBe(false);
		});

		test('name values', () => {
			const names = ['moduleName', 'module.name', 'module-name', 'module_name'];

			for (const name of names) {
				const instance = Items.instance(name);

				expect(instance.value).toHaveLength(2);
				expect(instance.value[0].value).toBe('module');
				expect(instance.value[1].value).toBe('name');
				expect(instance.value.every(item => item.namespace)).toBe(false);
			}
		});

		test('namespace values', () => {
			const instance = Items.instance('nameSpace/moduleName');

			expect(instance.value).toHaveLength(4);
			expect(instance.value[0].value).toBe('name');
			expect(instance.value[1].value).toBe('space');
			expect(instance.value[2].value).toBe('module');
			expect(instance.value[3].value).toBe('name');
			expect(instance.value.slice(0, 2).every(item => item.namespace)).toBe(
				true
			);
			expect(instance.value.slice(2, 4).every(item => item.namespace)).toBe(
				false
			);
		});

		test('empty value', () => {
			expect(Items.instance('').value).toHaveLength(0);
		});
	});

	describe('#equals', () => {
		test('non collection', () => {
			expect(Items.instance('foo').equals('bar')).toBe(false);
		});

		test('collection', () => {
			expect(Items.instance('foo').equals(Items.instance('bar'))).toBe(true);
		});
	});

	describe('#values', () => {
		test('names', () => {
			expect(Items.instance('nameSpace/moduleName').values()).toEqual([
				'name',
				'space',
				'module',
				'name'
			]);
		});
	});
});
