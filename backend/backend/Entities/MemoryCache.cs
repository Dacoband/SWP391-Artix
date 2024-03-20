using StackExchange.Redis;
using Newtonsoft.Json;
using System;

namespace backend.Entities
{
    public class CacheManager
    {
        private static readonly Lazy<ConnectionMultiplexer> lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
        {
            // Change connection string here if needed
            return ConnectionMultiplexer.Connect("locallhost:7233");
        });

        private static ConnectionMultiplexer Connection => lazyConnection.Value;

        public static IDatabase GetDatabase()
        {
            return Connection.GetDatabase();
        }

        public static T Get<T>(string key)
        {
            var db = Connection.GetDatabase();
            var value = db.StringGet(key);
            return value.IsNull ? default : JsonConvert.DeserializeObject<T>(value);
        }

        public static void Set(string key, object value, TimeSpan expiry)
        {
            var db = Connection.GetDatabase();
            db.StringSet(key, JsonConvert.SerializeObject(value), expiry);
        }
    }
}
