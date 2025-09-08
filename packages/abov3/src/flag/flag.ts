export namespace Flag {
  export const ABOV3_AUTO_SHARE = truthy("ABOV3_AUTO_SHARE")
  export const ABOV3_DISABLE_WATCHER = truthy("ABOV3_DISABLE_WATCHER")
  export const ABOV3_CONFIG = process.env["ABOV3_CONFIG"]
  export const ABOV3_CONFIG_CONTENT = process.env["ABOV3_CONFIG_CONTENT"]
  export const ABOV3_DISABLE_AUTOUPDATE = truthy("ABOV3_DISABLE_AUTOUPDATE")
  export const ABOV3_PERMISSION = process.env["ABOV3_PERMISSION"]
  export const ABOV3_DISABLE_DEFAULT_PLUGINS = truthy("ABOV3_DISABLE_DEFAULT_PLUGINS")
  export const ABOV3_DISABLE_LSP_DOWNLOAD = truthy("ABOV3_DISABLE_LSP_DOWNLOAD")

  function truthy(key: string) {
    const value = process.env[key]?.toLowerCase()
    return value === "true" || value === "1"
  }
}
