const Item = require('./item');
const Items = require('./items');

describe('Items', () => {
	describe('.instance', () => {
		test('names', () => {
			const names = ['moduleName', 'module.name', 'module-name', 'module_name'];

			for (const name of names) {
				const instance = Items.instance(name);

				expect(instance.length()).toBe(2);
				expect(instance.index(0).value).toBe('module');
				expect(instance.index(1).value).toBe('name');
				expect([...instance].every(item => item.namespace)).toBe(false);
			}
		});

		test('namespaces', () => {
			const instance = Items.instance('nameSpace/moduleName');

			expect(instance.length()).toBe(4);
			expect(instance.index(0).value).toBe('name');
			expect(instance.index(1).value).toBe('space');
			expect(instance.index(2).value).toBe('module');
			expect(instance.index(3).value).toBe('name');
			expect([...instance].slice(0, 2).every(item => item.namespace)).toBe(
				true
			);
			expect([...instance].slice(2, 4).every(item => item.namespace)).toBe(
				false
			);
		});

		test('empty', () => {
			expect(Items.instance('').length()).toBe(0);
			expect(Items.instance().length()).toBe(0);
		});
	});

	describe('#[Symbol.iterator]', () => {
		test('iterable', () => {
			const instance = Items.instance('module/name');
			let i = 0;

			for (const item of instance) {
				expect(item).toEqual(instance.index(i));
				i++;
			}
		});
	});

	describe('#clone', () => {
		test('shallow', () => {
			const instance = Items.instance('module/name');
			const clone = instance.clone();

			expect(instance).not.toBe(clone);
			expect([...instance]).toEqual([...clone]);
			expect(instance.index(0)).toBe(clone.index(0));
		});
	});

	describe('#indexOf', () => {
		test('left compare each right', () => {
			expect(
				Items.instance('module/name').indexOf({
					left: Item.instance('name', false)
				})
			).toBe(1);
		});

		test('right compare each left', () => {
			expect(
				Items.instance('module/name').indexOf({
					right: Item.instance('module', true)
				})
			).toBe(0);
		});

		test('neither', () => {
			expect(Items.instance('module/name').indexOf(null)).toBe(-1);
		});
	});

	describe('#index', () => {
		test('item', () => {
			const instance = Items.instance('module/name');
			expect(instance.index(0).value).toBe('module');
			expect(instance.index(1).value).toBe('name');
		});
	});

	describe('#length', () => {
		test('items count', () => {
			expect(Items.instance('module/name').length()).toBe(2);
			expect(Items.instance('space/name/thing').length()).toBe(3);
		});
	});

	describe('#names', () => {
		test('non namespace items', () => {
			const instance = Items.instance('module/name');
			const names = instance.names();

			expect(names).not.toBe(instance);
			expect(names.length()).toBe(1);
			expect(names.index(0)).toBe(instance.index(1));
		});
	});

	describe('#pullAt', () => {
		test('without item', () => {
			const instance = Items.instance('module/name');
			const pulled = instance.pullAt(0);

			expect(pulled).not.toBe(instance);
			expect(pulled.length()).toBe(1);
			expect(pulled.index(0)).toBe(instance.index(1));
		});
	});

	describe('#reverse', () => {
		test('items reversed', () => {
			const instance = Items.instance('module/name');
			const reversed = instance.reverse();

			expect(reversed).not.toBe(instance);
			expect(reversed.length()).toBe(instance.length());
			expect(reversed.index(0)).toBe(instance.index(1));
			expect(reversed.index(1)).toBe(instance.index(0));
		});
	});

	describe('#sort', () => {
		test('item compare', () => {
			const instance = Items.instance('space/thing/name');
			const sorted = instance.sort();

			expect(sorted).not.toBe(instance);
			expect(sorted.length()).toBe(instance.length());
			expect(sorted.index(0)).toBe(instance.index(2));
			expect(sorted.index(1)).toBe(instance.index(0));
			expect(sorted.index(2)).toBe(instance.index(1));
		});
	});
});
