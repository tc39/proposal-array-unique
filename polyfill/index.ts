type Resolver<T> = (item: T) => any;

type ValueResolver<T> = number | string | symbol | Resolver<T>;

interface Array<T> {
    unique(valueResolver?: ValueResolver<T>): T[];
}

if (typeof Array.prototype.unique !== 'function')
    Object.defineProperty(Array.prototype, 'unique', {
        writable: true,
        configurable: true,
        value: function <T>(this: T[], valueResolver?: ValueResolver<T>) {
            if (!(valueResolver != null)) return [...new Set(this)];

            const key = typeof valueResolver !== 'function' && valueResolver,
                map = new Map<any, T>();

            valueResolver = key ? item => item[key] : valueResolver;

            for (const item of this)
                map.set((valueResolver as Resolver<T>)(item), item);

            return [...map.values()];
        }
    });
