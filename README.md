<p align="center">
  <a href="https://github.com/fajardofahad/abov3-genesis-codeforger">
    <picture>
      <source srcset="packages/web/src/assets/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/web/src/assets/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/web/src/assets/logo-ornate-light.svg" alt="ABOV3 logo">
    </picture>
  </a>
</p>
<p align="center">ABOV3: Genesis CodeForger — AI coding agent, built for the terminal.</p>
<p align="center">
  <a href="https://github.com/fajardofahad/abov3-genesis-codeforger"><img alt="Repo" src="https://img.shields.io/badge/repo-abov3-blue?style=flat-square" /></a>
</p>

[![abov3 Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://abov3.ai)

---

### Installation

```bash
# YOLO
curl -fsSL https://abov3.ai/install | bash

# Package managers
npm i -g abov3-ai@latest        # or bun/pnpm/yarn
brew install sst/tap/abov3      # macOS and Linux
paru -S abov3-bin               # Arch Linux
```

> [!TIP]
> Remove versions older than 0.1.x before installing.

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$ABOV3_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if exists or can be created)
4. `$HOME/.abov3/bin` - Default fallback

```bash
# Examples
ABOV3_INSTALL_DIR=/usr/local/bin curl -fsSL https://abov3.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://abov3.ai/install | bash
```

### Documentation

For more info on how to configure abov3 [**head over to our docs**](https://abov3.ai/docs).

### Contributing

abov3 is an opinionated tool so any fundamental feature needs to go through a
design process with the core team.

> [!IMPORTANT]
> We do not accept PRs for core features.

However we still merge a ton of PRs - you can contribute:

- Bug fixes
- Improvements to LLM performance
- Support for new providers
- Fixes for env specific quirks
- Missing standard behavior
- Documentation

Take a look at the git history to see what kind of PRs we end up merging.

> [!NOTE]
> If you do not follow the above guidelines we might close your PR.

To run abov3 locally you need.

- Bun
- Golang 1.24.x

And run.

```bash
$ bun install
$ bun dev
```

#### Development Notes

**API Client**: After making changes to the TypeScript API endpoints in `packages/abov3/src/server/server.ts`, you will need the abov3 team to generate a new stainless sdk for the clients.

### FAQ

#### How is this different than Claude Code?

It's very similar to Claude Code in terms of capability. Here are the key differences:

- 100% open source
- Not coupled to any provider. Although Anthropic is recommended, abov3 can be used with OpenAI, Google or even local models. As models evolve the gaps between them will close and pricing will drop so being provider-agnostic is important.
- A focus on TUI. abov3 is built by neovim users and the creators of [terminal.shop](https://terminal.shop); we are going to push the limits of what's possible in the terminal.
  - A client/server architecture. This for example can allow ABOV3 to run on your computer, while you can drive it remotely from a mobile app. Meaning that the TUI frontend is just one of the possible clients.

#### What's the other repo?

The other confusingly named repo has no relation to this one. You can [read the story behind it here](https://x.com/thdxr/status/1933561254481666466).

---

**Join our community** [Discord](https://discord.gg/opencode) | [YouTube](https://www.youtube.com/c/sst-dev) | [X.com](https://x.com/anomaly_inv)
