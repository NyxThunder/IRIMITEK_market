module.exports = {
    apps: [
      {
        name: "irmitek_frontend",
        script: "npm",
        args: "start",
        env: {
          NODE_OPTIONS: "--openssl-legacy-provider"
        }
      }
    ]
  };