# Advent of Code 2023

## Typescript

Setup

```sh
npm install
```

Run

```sh
npx ts-node ./1/ts/part1.ts
```

## Rust

Using template from https://github.com/ChristopherBiscardi/advent-of-code/tree/main/2023/rust

Install

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

Setup

```sh
cargo install just
cargo install cargo-watch
cargo install cargo-generate
cargo install flamegraph
curl -LsSf https://get.nexte.st/latest/linux | tar zxf - -C ${CARGO_HOME:-~/.cargo}/bin
# flamegraph dependencies
sudo apt linux-tools-generic install linux-tools-common
# or if using wsl (check your own kernel version)
sudo apt install linux-tools-5.15.0-91-generic linux-tools-common
sudo mv /usr/bin/perf /usr/bin/perf.bk
sudo ln -s /usr/lib/linux-tools/5.15.0-91-generic/perf /usr/bin/perf
```

```sh
# solve ->> error: toolchain 'nightly-x86_64-unknown-linux-gnu' is not installed
rustup toolchain install nightly
rustup component add rustfmt --toolchain nightly
```

VScode setting

```json
{
  "[rust]": {
    "editor.defaultFormatter": "rust-lang.rust-analyzer"
  },
  "rust-analyzer.rustfmt.extraArgs": ["+nightly"]
}
```
