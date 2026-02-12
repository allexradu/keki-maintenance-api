export interface CacheOptions {
    ttlSeconds?: number
}

export async function getFromCache<T>(
    kv: KVNamespace,
    key: string,
): Promise<T | null> {
    return await kv.get<T>(key, 'json')
}

export async function setInCache<T>(
    kv: KVNamespace,
    key: string,
    value: T,
    ttl?: number,
) {
    if (ttl && ttl > 0) {
        await kv.put(key, JSON.stringify(value), { expirationTtl: ttl })
    } else {
        await kv.put(key, JSON.stringify(value))
    }
}

export async function deleteFromCache(kv: KVNamespace, key: string) {
    await kv.delete(key)
}
