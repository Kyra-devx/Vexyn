# Vexyn — Code Editor for Android

<p align="center">
  <img src='res/logo_1.png' width='250'>
</p>

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/vVxVWYUAWD?style=flat)](https://discord.gg/vVxVWYUAWD)

## • Overview

Welcome to Vexyn, a community-maintained code editor and web IDE for Android, based on the Acode codebase. Whether you're working on HTML, CSS, JavaScript, or other programming languages, Vexyn aims to make coding on the go practical and extensible.

## • Features

- Edit and create websites, and instantly preview them in a browser.
- Seamlessly modify source files for various languages like Python, Java, JavaScript, and more.
- Built-in javascript console
- S/FTP and SSH terminal integration
- Built-in terminal(Alpine)
- Enjoy multi-language editing support with easy management tools.
- Enjoy a large collections of community plugins to enhance your coding experience.

## • Installation

Vexyn is not yet published through an official app store. Build from source using CONTRIBUTING.md; upstream Acode store packages are not Vexyn releases.
 

## • Project Structure

<pre>
Vexyn/
|
|- src/   - Core code and language files
|
|- www/   - Public documents, compiled files, and HTML templates
|
|- utils/ - CLI tools for building, string manipulation, and more
|
|- codemirror-lsp-client/ - Git submodule providing @codemirror/lsp-client (clone with --recurse-submodules)
</pre>

## • Multi-language Support

Enhance Vexyn's capabilities by adding new languages easily. Just create a file with the language code (e.g., en-us for English) in [`src/lang/`](https://github.com/Kyra-devx/Vexyn/tree/main/src/lang) and include it in [`src/lib/lang.js`](https://github.com/Kyra-devx/Vexyn/blob/main/src/lib/lang.js). Manage strings across languages effortlessly using utility commands:

```shell
pnpm run lang add
pnpm run lang remove
pnpm run lang search
pnpm run lang update
```

## • Contributing & Building the Application

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## • Contributors

<a href="https://github.com/Kyra-devx/Vexyn/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kyra-devx/Vexyn" />
</a>

## • Developing a Plugin

For comprehensive documentation on creating plugins for the upstream-compatible plugin system, visit the [repository](https://github.com/Acode-Foundation/acode-plugin).

For plugin development information, refer to: [Plugin Documentation](https://docs.acode.app/)

## Star History

<a href="https://star-history.com/#Kyra-devx/Vexyn&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Kyra-devx/Vexyn&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Kyra-devx/Vexyn&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Acode-Foundation/Acode&type=Date" />
 </picture>
</a>
