type Resolver<T> = (item: T) => any;

type Indexer<T> = number | keyof T | symbol;

type ValueResolver<T> = Indexer<T> | Resolver<T>;

export {};

declare global {
    interface Array<T> {
        uniqueBy(valueResolver?: ValueResolver<T>): T[];
    }
}

if (typeof Array.prototype.uniqueBy !== 'function')
    Object.defineProperty(Array.prototype, 'uniqueBy', {
        writable: true,
        configurable: true,
        value: function <T>(this: T[], valueResolver?: ValueResolver<T>) {
            if (!(valueResolver != null)) return [...new Set(this)];

            const key = typeof valueResolver !== 'function' && valueResolver,
                map = new Map<any, T>();

            valueResolver = key
                ? (item: Record<Indexer<T>, any>) => item?.[key] ?? item
                : valueResolver;

            for (const item of this) {
                const key = (valueResolver as Resolver<T>)(item);

                if (!map.has(key)) map.set(key, item);
            }

            return [...map.values()];
        }
    });
