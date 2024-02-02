import main from "@/core/cmd/wasm/main.go"

export const foo = async () => {
  console.log(await main.invokeAction("foo", ["toto"], {PluginConfig: {Repos: ["/"]}}))
}
