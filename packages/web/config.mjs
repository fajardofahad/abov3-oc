const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production"
    ? "https://abov3.ai"
    : `https://${stage}.abov3.ai`,
  console: stage === "production"
    ? "https://abov3.ai/auth"
    : `https://${stage}.abov3.ai/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/fajardofahad/abov3-genesis-codeforger",
  discord: "https://abov3.ai/discord",
  headerLinks: [
    { name: "Home", url: "/" },
    { name: "Docs", url: "/docs/" },
  ],
}
