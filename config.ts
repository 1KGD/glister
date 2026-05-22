export default {
    dev: import.meta.env?.DEV || process.env.PRODUCTION_SERVER !== "true",
    multiplayer: {
        port: "2567",
        sessionTokenExperationTime: 1000 * 60 * 10, // 10 minutes (not the final value)
        roomTimeout: 10000, //How long until an empty room is disposed of. Should be long enough that a client can connect to a room after creating it (>1000).
    }
};