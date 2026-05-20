export default {
    dev: import.meta.env?.DEV || process.env.PRODUCTION_SERVER !== "true",
    multiplayer: {
        port: "2567",
        sessionTokenExperationTime: 1000 * 60* 10 // 10 minutes (not the final value)
    }
};