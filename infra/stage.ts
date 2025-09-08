export const domain = (() => {
  if ($app.stage === "production") return "abov3.ai"
  if ($app.stage === "dev") return "dev.abov3.ai"
  return `${$app.stage}.dev.abov3.ai`
})()
