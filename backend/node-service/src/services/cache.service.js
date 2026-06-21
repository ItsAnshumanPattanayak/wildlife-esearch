import NodeCache from 'node-cache';

class CacheService {
    constructor() {
        // Create in-memory cache with 10 minute default TTL
        this.cache = new NodeCache({ 
            stdTTL: 600,
            checkperiod: 120 
        });
        
        console.log('✅ Cache service initialized');
    }
    
    get(key) {
        return this.cache.get(key);
    }
    
    set(key, value, ttl = 600) {
        return this.cache.set(key, value, ttl);
    }
    
    del(key) {
        return this.cache.del(key);
    }
    
    flush() {
        return this.cache.flushAll();
    }
}

export default CacheService;