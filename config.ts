export default {
    dev: import.meta.env?.DEV || process.env.PRODUCTION_SERVER !== "true",
    multiplayer: {
        port: "2567"
    }
}