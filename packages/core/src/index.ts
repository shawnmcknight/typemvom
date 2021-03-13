import 'reflect-metadata';

function Decorator(): PropertyDecorator;

function Decorator(type: 'string'): PropertyDecorator;

function Decorator(type?: any): PropertyDecorator {
	console.log(type);
	return (target: any, key: string | symbol) => {
		const t = Reflect.getMetadata('design:type', target, key);
		const isArray = t === Array;
		console.log(`${String(key)} = ${t}`, `isArray = ${isArray}`);

		Object.defineProperty(target, key, {
			value: 'foo',
		});
	};
}

class Foo {
	@Decorator()
	public foo!: string;

	@Decorator('string')
	public bar!: string[];
}

const foo = new Foo();
