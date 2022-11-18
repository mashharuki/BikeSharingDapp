# BikeSharingDapp

React.js と Rust で構築する自転車シェアリング Dapp 開発用のリポジトリです。

### WebAssembly(WASM)とは

ブラウザでプログラムを高速実行するための、「ブラウザ上で動くバイナリコードの新しいフォーマット(仕様)」のこと。  
Google, Microsoft, Mozzila, Apple によって仕様が策定され開発が進められている。  
C/C++や Rust、Golang、TypeScript などからコンパイルが可能。

### NEAR が採用するストレージステーキングについて

コントラクトのアカウントはブロックチェーン上で使用するすべてのストレージをカバーするのに十分な残高(NEAR)を持っていなければならない。ユーザーが増えるとそのストレージコストが増えていくがこれをユーザーに支払ってもらおうという考えがストレージステーキングである。

### アカウント作成コマンド

```
near generate-key ft_mashharuki.testnet
```

### ローカルで作成したアカウントを NearWallet にインポートする方法

作成したアカウント ID と privatekey を埋め込んで URL を叩く

[https://wallet.testnet.near.org/auto-import-secret-key#YOUR_ACCOUNT_ID/YOUR_PRIVATE_KEY](https://wallet.testnet.near.org/auto-import-secret-key#YOUR_ACCOUNT_ID/YOUR_PRIVATE_KEY)

### サブアカウント作成コマンド

```cmd
export ID=ft_mashharuki.testnet
near create-account sub.$ID --masterAccount $ID --initialBalance 30
```

### 今回テスト用の作成したアカウント

1. ft_mashharuki.testnet
2. sub.ft_mashharuki.testnet(FT コントラクトデプロイ済み)

### 開発用の作成したアカウントのニーモニックコード(開発用なので本番では使用しないこと！！)

```
nothing aisle fade bid fashion furnace approve sentence frog exchange citizen advance
```

### FT のデプロイトランザクション

[https://explorer.testnet.near.org/transactions/EmqAZmPPgsgnZvgmpXQxYKvdaSr9yb2VbKe57tab5cmM](https://explorer.testnet.near.org/transactions/EmqAZmPPgsgnZvgmpXQxYKvdaSr9yb2VbKe57tab5cmM)

### 雛形生成コマンド

`npx create-near-app@3.1.0 --frontend=react --contract=rust near_bike_share_dapp`

### コンソールに表示される URL 情報

```cmd
see: https://explorer.testnet.near.org/accounts/mashharuki.testnet
App.js:187 see: https://explorer.testnet.near.org/accounts/dev-1664367873698-91420483511088
```

### スマートコントラクトのテストコマンド

`yarn test:unit`

```cmd
running 3 tests
test tests::check_default ... ok
test tests::check_inspecting_account ... ok
test tests::return_by_other_account - should panic ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests bike_share

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

✨  Done in 16.48s.
```

### スマートコントラクトの結合テストコマンド

`yarn test:integration:rs`

```cmd
    Finished dev [unoptimized + debuginfo] target(s) in 4.09s
     Running `target/debug/examples/integration-tests`
2022-10-02T03:42:05.442562Z DEBUG stats: EpochId(`11111111111111111111111111111111`) Orphans: 0 With missing chunks: 0 In processing 0
2022-10-02T03:42:15.425218Z DEBUG stats: EpochId(`11111111111111111111111111111111`) Orphans: 0 With missing chunks: 0 In processing 0
16 AquR2kK8j2PrZy68pLwafPRoHG5DoDCYKqbqXZPUC85i Processed in progress for 0ms   Chunks:(✔))
15 7bJvc1NMdUPH8PfQBTmdHXz7nj6tesBHUVeCQJWMma96 Processed in progress for 1ms   Chunks:(✔))
14 x9PgUYDZXjCiMGquFbC4AsFCwcGqMNRQztHdJjkcctG Processed in progress for 1ms   Chunks:(✔))
13 5djvxjYD1YYSpSKuT5HsYgtTjPTgK39P5nCXCuBmFTK9 Processed in progress for 0ms   Chunks:(✔))
12 3WU71KsLjf9CixYiFGXdazbLz5mKzams1Ykd4ZsHxvq3 Processed in progress for 1ms   Chunks:(✔))
11 GocWFY5kL4v4X4BoPkArMQKEdHvwyyRdjtDuf7Nn9Udh Processed in progress for 1ms   Chunks:(✔))
10 898opjWfcxfphbByYZCs15ug383ArsFX6ZLZGUVSKwtQ Processed in progress for 1ms   Chunks:(✔))
9 7RPMov1zS7EN1isXBHiGwUnLHqxjEZhsuspyfYjJhUzz Processed in progress for 0ms   Chunks:(✔))
8 AsofRiS4yW3uQY5ijMb72SsiYDVfKn3mmQJZsvqW3quo Processed in progress for 3ms   Chunks:(✔))
7 GbNKn2uSqfVUZ5TgxbrswitAAREha6u2xU61CPYVaci Processed in progress for 5ms   Chunks:(✔))
6 FL2D5nWLCK9xDZc5AY7qkWV1bVpZdm9gE6VJFeCWfUtK Processed in progress for 0ms   Chunks:(✔))
5 A8CzdMScNjKpuMTCoHavu4mt7rFqkcfCVS8EwjTMFk4i Processed in progress for 1ms   Chunks:(✔))
4 3TtnEewz1oRKovdHNcjU93Ld1X8FxNRQPd9gU5yQathW Processed in progress for 1ms   Chunks:(✔))
3 ezKtwaU2tmLMsTVkYVZuWoMx87yfZjd6TdFP8cN527z Processed in progress for 216ms   Chunks:(✔))
2 amxwM5JDU17C67GuVU8KmAAHSsQKjEGwGmwPtj9Rmcz Processed in progress for 20ms   Chunks:(✔))
1 DLiLGBKKNCDsrYK6kMCDeUaPeeKpZT2wHw7TtxdeYaaK Processed in progress for 123ms   Chunks:(X))
2022-10-02T03:42:25.427102Z DEBUG stats: EpochId(`11111111111111111111111111111111`) Orphans: 0 With missing chunks: 0 In processing 0
32 5juGQqxLTBB7LGmVM1ZTokPUEZ3MpydNBFmcHn1hPsaS Processed in progress for 1ms   Chunks:(✔))
31 3Gfb7Xzvd9t97tnrZNRyC7wfJGos85REUhynQ1FLyy6s Processed in progress for 0ms   Chunks:(✔))
30 yT7g6cY6P29qi7yRf4A2Vo3mewa76tkmNZvxFPw56mw Processed in progress for 1ms   Chunks:(✔))
29 G1skPfqqVX5CfpnQtkCQL2zmLq1khB1b72UCpQ32fyaE Processed in progress for 1ms   Chunks:(✔))
28 AG8rH89tsoyJymN1hivz4R9ZPH7bQ3WBasMvrgmHrbWp Processed in progress for 1ms   Chunks:(✔))
27 k6zDwbTabxD4uKKMUFW639s1sLjGUEWY5QkKHZdomFW Processed in progress for 1ms   Chunks:(✔))
26 94vecdseScEcQ7WSax7LxXVcvnfjkHDGKYgDvZSFS6Qq Processed in progress for 1ms   Chunks:(✔))
25 EEtzpAZmgGXA5JZ6ZReupCWEAukJoWSmgfByAabhjFHk Processed in progress for 2ms   Chunks:(✔))
24 BbNf9snRUyGwBeFNnBoJHBmQiMqRxqrDXc8gapWh65vy Processed in progress for 0ms   Chunks:(✔))
23 5DBXCq58wFcL1XAnt9fKNt7fZ6tqC74KxEp9dmsCeZ3D Processed in progress for 1ms   Chunks:(✔))
22 HyLom11XcHntotebZyw24wVNvp639o7YcN2gJsXncRv6 Processed in progress for 1ms   Chunks:(✔))
21 HHDjNYHkBa6Rnemec9H74v4JkQGphRqhiqJp8qo2PHiW Processed in progress for 11ms   Chunks:(✔))
20 Bxdk4dKrW51w4dUjZC6AEr6aYvpHxAzCpkUmrd3dhyhD Processed in progress for 0ms   Chunks:(✔))
19 3EAVj8eL5g62Ds9g5sJSobH5wMEQDKcyKpq73bPDmTpM Processed in progress for 1ms   Chunks:(✔))
18 5rRigaG7SGYJpPTgvwuVTJkQWSfDGXxDom3LkjWBXVTp Processed in progress for 93ms   Chunks:(✔))
17 AMh9n8V3bGjLuBat2FzkQWZPhGcHDcPZSEKcorDLhYaX Processed in progress for 0ms   Chunks:(✔))
16 AquR2kK8j2PrZy68pLwafPRoHG5DoDCYKqbqXZPUC85i Processed in progress for 0ms   Chunks:(✔))
15 7bJvc1NMdUPH8PfQBTmdHXz7nj6tesBHUVeCQJWMma96 Processed in progress for 1ms   Chunks:(✔))
14 x9PgUYDZXjCiMGquFbC4AsFCwcGqMNRQztHdJjkcctG Processed in progress for 1ms   Chunks:(✔))
13 5djvxjYD1YYSpSKuT5HsYgtTjPTgK39P5nCXCuBmFTK9 Processed in progress for 0ms   Chunks:(✔))
12 3WU71KsLjf9CixYiFGXdazbLz5mKzams1Ykd4ZsHxvq3 Processed in progress for 1ms   Chunks:(✔))
11 GocWFY5kL4v4X4BoPkArMQKEdHvwyyRdjtDuf7Nn9Udh Processed in progress for 1ms   Chunks:(✔))
10 898opjWfcxfphbByYZCs15ug383ArsFX6ZLZGUVSKwtQ Processed in progress for 1ms   Chunks:(✔))
9 7RPMov1zS7EN1isXBHiGwUnLHqxjEZhsuspyfYjJhUzz Processed in progress for 0ms   Chunks:(✔))
8 AsofRiS4yW3uQY5ijMb72SsiYDVfKn3mmQJZsvqW3quo Processed in progress for 3ms   Chunks:(✔))
7 GbNKn2uSqfVUZ5TgxbrswitAAREha6u2xU61CPYVaci Processed in progress for 5ms   Chunks:(✔))
6 FL2D5nWLCK9xDZc5AY7qkWV1bVpZdm9gE6VJFeCWfUtK Processed in progress for 0ms   Chunks:(✔))
5 A8CzdMScNjKpuMTCoHavu4mt7rFqkcfCVS8EwjTMFk4i Processed in progress for 1ms   Chunks:(✔))
4 3TtnEewz1oRKovdHNcjU93Ld1X8FxNRQPd9gU5yQathW Processed in progress for 1ms   Chunks:(✔))
3 ezKtwaU2tmLMsTVkYVZuWoMx87yfZjd6TdFP8cN527z Processed in progress for 216ms   Chunks:(✔))
2 amxwM5JDU17C67GuVU8KmAAHSsQKjEGwGmwPtj9Rmcz Processed in progress for 20ms   Chunks:(✔))
1 DLiLGBKKNCDsrYK6kMCDeUaPeeKpZT2wHw7TtxdeYaaK Processed in progress for 123ms   Chunks:(X))
2022-10-02T03:42:35.428868Z DEBUG stats: EpochId(`11111111111111111111111111111111`) Orphans: 0 With missing chunks: 0 In processing 0
48 ENN8fKHeGUwrNdiiPnvah7EBAarLmaty4eoXZ96ooBb1 Processed in progress for 1ms   Chunks:(✔))
47 EX9ud6HE1i24GY4hyCrzZiszUXALnXHUZCFoDqveBDkz Processed in progress for 2ms   Chunks:(✔))
46 DtgcVo61NQra5UNm7qpAdDWTMD4oo3dRvar2v3CF812b Processed in progress for 1ms   Chunks:(✔))
45 8n8naKCZvPP2x5JKDKBaUM6vm1RGDF7wRtA1eEhkmRem Processed in progress for 1ms   Chunks:(✔))
44 DdyXa1NYX4nT9mUjZRyCBHJgbysMoQtttUgZw3aN63eq Processed in progress for 1ms   Chunks:(✔))
43 Hc1mfKjmjRLAVwBkGtNrEGkpugnG4wfwq1jfR2nBhuBf Processed in progress for 1ms   Chunks:(✔))
42 2zBr2TMY7Qoev9uKPye7v4dBzaH4L8iscbTCNFKYMmw6 Processed in progress for 1ms   Chunks:(✔))
41 7Edos24Zry4BUMrQ63KYrDBKhTqGToLdvwt8eVSAXc5k Processed in progress for 1ms   Chunks:(✔))
40 DzHpJQHKfHgm74C1wVCxGjxE149PfNJGZvPEjPkXXgBR Processed in progress for 2ms   Chunks:(✔))
39 2fHQFAZxUJa7HQCTecZJEp5qQ8DZ4NHk76bYKsu9xz63 Processed in progress for 1ms   Chunks:(✔))
38 g4Rj23gzp2WetE5AST9Rgf8kAGrEedmyeHZKT44xAfe Processed in progress for 1ms   Chunks:(✔))
37 Esq4j5bBcdmWLLXEWwDSMxRErpRTyKJkkbWywYbag7NU Processed in progress for 1ms   Chunks:(✔))
36 CTgvEAJBUaknMgZu67gLoHswUhNfntLXGBc4DUe8Qa7Z Processed in progress for 1ms   Chunks:(✔))
35 GXnkVoXjGgT5p8wo4vwA2UZFqdfXvRsmVu17g95bakKt Processed in progress for 0ms   Chunks:(✔))
34 FM4f4kUM4qj7Xmh4JecVxaXnRimdcnytLnkufVVujEMQ Processed in progress for 1ms   Chunks:(✔))
33 Hgu7sbkLh2rLD8xFsQEUoNXurxqB6UYANqB7461mUjR2 Processed in progress for 1ms   Chunks:(✔))
32 5juGQqxLTBB7LGmVM1ZTokPUEZ3MpydNBFmcHn1hPsaS Processed in progress for 1ms   Chunks:(✔))
31 3Gfb7Xzvd9t97tnrZNRyC7wfJGos85REUhynQ1FLyy6s Processed in progress for 0ms   Chunks:(✔))
30 yT7g6cY6P29qi7yRf4A2Vo3mewa76tkmNZvxFPw56mw Processed in progress for 1ms   Chunks:(✔))
29 G1skPfqqVX5CfpnQtkCQL2zmLq1khB1b72UCpQ32fyaE Processed in progress for 1ms   Chunks:(✔))
28 AG8rH89tsoyJymN1hivz4R9ZPH7bQ3WBasMvrgmHrbWp Processed in progress for 1ms   Chunks:(✔))
27 k6zDwbTabxD4uKKMUFW639s1sLjGUEWY5QkKHZdomFW Processed in progress for 1ms   Chunks:(✔))
26 94vecdseScEcQ7WSax7LxXVcvnfjkHDGKYgDvZSFS6Qq Processed in progress for 1ms   Chunks:(✔))
25 EEtzpAZmgGXA5JZ6ZReupCWEAukJoWSmgfByAabhjFHk Processed in progress for 2ms   Chunks:(✔))
24 BbNf9snRUyGwBeFNnBoJHBmQiMqRxqrDXc8gapWh65vy Processed in progress for 0ms   Chunks:(✔))
23 5DBXCq58wFcL1XAnt9fKNt7fZ6tqC74KxEp9dmsCeZ3D Processed in progress for 1ms   Chunks:(✔))
22 HyLom11XcHntotebZyw24wVNvp639o7YcN2gJsXncRv6 Processed in progress for 1ms   Chunks:(✔))
21 HHDjNYHkBa6Rnemec9H74v4JkQGphRqhiqJp8qo2PHiW Processed in progress for 11ms   Chunks:(✔))
20 Bxdk4dKrW51w4dUjZC6AEr6aYvpHxAzCpkUmrd3dhyhD Processed in progress for 0ms   Chunks:(✔))
19 3EAVj8eL5g62Ds9g5sJSobH5wMEQDKcyKpq73bPDmTpM Processed in progress for 1ms   Chunks:(✔))
18 5rRigaG7SGYJpPTgvwuVTJkQWSfDGXxDom3LkjWBXVTp Processed in progress for 93ms   Chunks:(✔))
17 AMh9n8V3bGjLuBat2FzkQWZPhGcHDcPZSEKcorDLhYaX Processed in progress for 0ms   Chunks:(✔))
16 AquR2kK8j2PrZy68pLwafPRoHG5DoDCYKqbqXZPUC85i Processed in progress for 0ms   Chunks:(✔))
15 7bJvc1NMdUPH8PfQBTmdHXz7nj6tesBHUVeCQJWMma96 Processed in progress for 1ms   Chunks:(✔))
14 x9PgUYDZXjCiMGquFbC4AsFCwcGqMNRQztHdJjkcctG Processed in progress for 1ms   Chunks:(✔))
13 5djvxjYD1YYSpSKuT5HsYgtTjPTgK39P5nCXCuBmFTK9 Processed in progress for 0ms   Chunks:(✔))
12 3WU71KsLjf9CixYiFGXdazbLz5mKzams1Ykd4ZsHxvq3 Processed in progress for 1ms   Chunks:(✔))
11 GocWFY5kL4v4X4BoPkArMQKEdHvwyyRdjtDuf7Nn9Udh Processed in progress for 1ms   Chunks:(✔))
10 898opjWfcxfphbByYZCs15ug383ArsFX6ZLZGUVSKwtQ Processed in progress for 1ms   Chunks:(✔))
9 7RPMov1zS7EN1isXBHiGwUnLHqxjEZhsuspyfYjJhUzz Processed in progress for 0ms   Chunks:(✔))
8 AsofRiS4yW3uQY5ijMb72SsiYDVfKn3mmQJZsvqW3quo Processed in progress for 3ms   Chunks:(✔))
7 GbNKn2uSqfVUZ5TgxbrswitAAREha6u2xU61CPYVaci Processed in progress for 5ms   Chunks:(✔))
6 FL2D5nWLCK9xDZc5AY7qkWV1bVpZdm9gE6VJFeCWfUtK Processed in progress for 0ms   Chunks:(✔))
5 A8CzdMScNjKpuMTCoHavu4mt7rFqkcfCVS8EwjTMFk4i Processed in progress for 1ms   Chunks:(✔))
4 3TtnEewz1oRKovdHNcjU93Ld1X8FxNRQPd9gU5yQathW Processed in progress for 1ms   Chunks:(✔))
3 ezKtwaU2tmLMsTVkYVZuWoMx87yfZjd6TdFP8cN527z Processed in progress for 216ms   Chunks:(✔))
2 amxwM5JDU17C67GuVU8KmAAHSsQKjEGwGmwPtj9Rmcz Processed in progress for 20ms   Chunks:(✔))
1 DLiLGBKKNCDsrYK6kMCDeUaPeeKpZT2wHw7TtxdeYaaK Processed in progress for 123ms   Chunks:(X))
Passed ✅ test_transfer_ft_to_user_inspected_bike
2022-10-02T03:42:45.429826Z DEBUG stats: EpochId(`11111111111111111111111111111111`) Orphans: 0 With missing chunks: 0 In processing 0
65 8EvoAeCrdXGVPLjaWKAJbkbWaKHfrWTbsrcf96ThmjaL Processed in progress for 1ms   Chunks:(✔))
64 3XT5PHQfWCzrz8dimry1EyXCEaR3XCmqZsXgTpUDP3UQ Processed in progress for 0ms   Chunks:(✔))
63 CkQQfCNav3gd29uy5v7DrHVcXt9ZCWjYiK9R4FW8fVXy Processed in progress for 0ms   Chunks:(✔))
62 9C21sdAU2wdsnG431LmjBuKMvWBhtmQBbDkGsAnBhitJ Processed in progress for 1ms   Chunks:(✔))
61 31fmvseLVDVjVGvAykRHUu2qyKfid8ESdFguHArTxWz7 Processed in progress for 0ms   Chunks:(✔))
60 6Wr8CMEJTvAGHCDTZQmftnkL3fHrzJnGuNQHTkEj7zDE Processed in progress for 1ms   Chunks:(✔))
59 28unnkSU2Z5m1LDebTXgRDsccE65SzvTbbjvtZxwoeUY Processed in progress for 1ms   Chunks:(✔))
58 7sTbpzdjoELUTpxqKUw6BXHf6TY4ArUsPaB4cEW6zMFV Processed in progress for 2ms   Chunks:(✔))
57 CY7UCRtbmruuQSocibMJJS8Y6tHdj2R5hdbX4X89bXrp Processed in progress for 1ms   Chunks:(✔))
56 G2UmBvAMTwpGxLXqAip2RraxKBkv1Hh1uaUyR4dy5TLh Processed in progress for 1ms   Chunks:(✔))
55 8BN7oJMUzqW3vFyzTok1Uona83Eix7MqAxGNvr9VzbSi Processed in progress for 1ms   Chunks:(✔))
54 AGgPXJV2qpKELBTGcGqZsDKfrMiV3NbiiDR5QzwFk8Ag Processed in progress for 0ms   Chunks:(✔))
53 G4x424in1Frov1aUiQn9vzLrmw56sNTzZ52qwefxyTrf Processed in progress for 0ms   Chunks:(✔))
52 EAzANTvJEYSm55ybdfpXga7h2WVsxMVonfYykj9W5vTt Processed in progress for 1ms   Chunks:(✔))
51 22PYbwgx1HNqqbChr2jJdUmr1etWA7soxbQbSGy3yJnv Processed in progress for 1ms   Chunks:(✔))
50 4JMomcvQmTmnvY6GZCXXQbcY1Qz4Qco8bjD9JAUBKUYG Processed in progress for 1ms   Chunks:(✔))
49 BFWZSLkDmEv6LjvEakBj5EY4mudNzoykxBGEyDiQJNW1 Processed in progress for 2ms   Chunks:(✔))
48 ENN8fKHeGUwrNdiiPnvah7EBAarLmaty4eoXZ96ooBb1 Processed in progress for 1ms   Chunks:(✔))
47 EX9ud6HE1i24GY4hyCrzZiszUXALnXHUZCFoDqveBDkz Processed in progress for 2ms   Chunks:(✔))
46 DtgcVo61NQra5UNm7qpAdDWTMD4oo3dRvar2v3CF812b Processed in progress for 1ms   Chunks:(✔))
45 8n8naKCZvPP2x5JKDKBaUM6vm1RGDF7wRtA1eEhkmRem Processed in progress for 1ms   Chunks:(✔))
44 DdyXa1NYX4nT9mUjZRyCBHJgbysMoQtttUgZw3aN63eq Processed in progress for 1ms   Chunks:(✔))
43 Hc1mfKjmjRLAVwBkGtNrEGkpugnG4wfwq1jfR2nBhuBf Processed in progress for 1ms   Chunks:(✔))
42 2zBr2TMY7Qoev9uKPye7v4dBzaH4L8iscbTCNFKYMmw6 Processed in progress for 1ms   Chunks:(✔))
41 7Edos24Zry4BUMrQ63KYrDBKhTqGToLdvwt8eVSAXc5k Processed in progress for 1ms   Chunks:(✔))
40 DzHpJQHKfHgm74C1wVCxGjxE149PfNJGZvPEjPkXXgBR Processed in progress for 2ms   Chunks:(✔))
39 2fHQFAZxUJa7HQCTecZJEp5qQ8DZ4NHk76bYKsu9xz63 Processed in progress for 1ms   Chunks:(✔))
38 g4Rj23gzp2WetE5AST9Rgf8kAGrEedmyeHZKT44xAfe Processed in progress for 1ms   Chunks:(✔))
37 Esq4j5bBcdmWLLXEWwDSMxRErpRTyKJkkbWywYbag7NU Processed in progress for 1ms   Chunks:(✔))
36 CTgvEAJBUaknMgZu67gLoHswUhNfntLXGBc4DUe8Qa7Z Processed in progress for 1ms   Chunks:(✔))
35 GXnkVoXjGgT5p8wo4vwA2UZFqdfXvRsmVu17g95bakKt Processed in progress for 0ms   Chunks:(✔))
34 FM4f4kUM4qj7Xmh4JecVxaXnRimdcnytLnkufVVujEMQ Processed in progress for 1ms   Chunks:(✔))
33 Hgu7sbkLh2rLD8xFsQEUoNXurxqB6UYANqB7461mUjR2 Processed in progress for 1ms   Chunks:(✔))
32 5juGQqxLTBB7LGmVM1ZTokPUEZ3MpydNBFmcHn1hPsaS Processed in progress for 1ms   Chunks:(✔))
31 3Gfb7Xzvd9t97tnrZNRyC7wfJGos85REUhynQ1FLyy6s Processed in progress for 0ms   Chunks:(✔))
30 yT7g6cY6P29qi7yRf4A2Vo3mewa76tkmNZvxFPw56mw Processed in progress for 1ms   Chunks:(✔))
29 G1skPfqqVX5CfpnQtkCQL2zmLq1khB1b72UCpQ32fyaE Processed in progress for 1ms   Chunks:(✔))
28 AG8rH89tsoyJymN1hivz4R9ZPH7bQ3WBasMvrgmHrbWp Processed in progress for 1ms   Chunks:(✔))
27 k6zDwbTabxD4uKKMUFW639s1sLjGUEWY5QkKHZdomFW Processed in progress for 1ms   Chunks:(✔))
26 94vecdseScEcQ7WSax7LxXVcvnfjkHDGKYgDvZSFS6Qq Processed in progress for 1ms   Chunks:(✔))
25 EEtzpAZmgGXA5JZ6ZReupCWEAukJoWSmgfByAabhjFHk Processed in progress for 2ms   Chunks:(✔))
24 BbNf9snRUyGwBeFNnBoJHBmQiMqRxqrDXc8gapWh65vy Processed in progress for 0ms   Chunks:(✔))
23 5DBXCq58wFcL1XAnt9fKNt7fZ6tqC74KxEp9dmsCeZ3D Processed in progress for 1ms   Chunks:(✔))
22 HyLom11XcHntotebZyw24wVNvp639o7YcN2gJsXncRv6 Processed in progress for 1ms   Chunks:(✔))
21 HHDjNYHkBa6Rnemec9H74v4JkQGphRqhiqJp8qo2PHiW Processed in progress for 11ms   Chunks:(✔))
20 Bxdk4dKrW51w4dUjZC6AEr6aYvpHxAzCpkUmrd3dhyhD Processed in progress for 0ms   Chunks:(✔))
19 3EAVj8eL5g62Ds9g5sJSobH5wMEQDKcyKpq73bPDmTpM Processed in progress for 1ms   Chunks:(✔))
18 5rRigaG7SGYJpPTgvwuVTJkQWSfDGXxDom3LkjWBXVTp Processed in progress for 93ms   Chunks:(✔))
17 AMh9n8V3bGjLuBat2FzkQWZPhGcHDcPZSEKcorDLhYaX Processed in progress for 0ms   Chunks:(✔))
16 AquR2kK8j2PrZy68pLwafPRoHG5DoDCYKqbqXZPUC85i Processed in progress for 0ms   Chunks:(✔))
15 7bJvc1NMdUPH8PfQBTmdHXz7nj6tesBHUVeCQJWMma96 Processed in progress for 1ms   Chunks:(✔))
2022-10-02T03:42:55.430917Z DEBUG stats: EpochId(`11111111111111111111111111111111`) Orphans: 0 With missing chunks: 0 In processing 0
81 BgP1HA6cAyTf6iMmHh6gCfYRheJQn7i2upv5ztKrDJXz Processed in progress for 0ms   Chunks:(✔))
80 GvkbDxpx3oGTbnpdYfpAhrLj9rxgrAEsZ64acy1b6EAw Processed in progress for 1ms   Chunks:(✔))
79 95sb9yjxzschXd6vfALgwrsizu8k9XhqMuzQ7okq6SkN Processed in progress for 2ms   Chunks:(✔))
78 HDuUBrwPZfRMSNh117y7nqsGMoSG8mScqdMDeTuNEk1D Processed in progress for 1ms   Chunks:(✔))
77 3THR5aNXbXsgD9VDJYD5mogSWWc3xU7QfBrAWV3p8Gd5 Processed in progress for 0ms   Chunks:(✔))
76 CsH3cyepJZq4sBQ4QbqLbySYZbEU6moZMz4qUz9UrtwV Processed in progress for 1ms   Chunks:(✔))
75 H7EChPZU3noRCc1nMAz33eCwZQpMMb4s7Sbhx3Mah61f Processed in progress for 2ms   Chunks:(✔))
74 A479dVpCriH9tW3hEcMfKdNUk79vmcUT5J3c7tdRLB5q Processed in progress for 0ms   Chunks:(✔))
73 HvrXABRvx37Fi1B38xJ6kLze1DH883uoKn4TJmetQ942 Processed in progress for 1ms   Chunks:(✔))
72 8eNEEVTbAUpri1KDCXVYCb2yxyN3cVkA7bnPwm6KCmMD Processed in progress for 1ms   Chunks:(✔))
71 EUgrb5nyXwqcNrbNiXhN5yNAPAdUGk5kaixFAPjPpKVN Processed in progress for 4ms   Chunks:(✔))
70 2k7iEoKaRjqd6M8pDKLPAmPvpzWSbdta652orRMcR5DZ Processed in progress for 2ms   Chunks:(✔))
69 C9nDm4osBo31diTrpdfGgWGUZ2FBAAdrMEbDcn7nU62P Processed in progress for 2ms   Chunks:(✔))
68 J1j59dsK6i2qfxWjLsepy6Y1LEytKMu6SxtHkVAEAhds Processed in progress for 0ms   Chunks:(✔))
67 AYf9YiEc3zfs4bsFzF2QXqSj2RwHisqQmvsYjyP86Hs2 Processed in progress for 1ms   Chunks:(✔))
66 8yFxHWMyA7uPoMMmimtnoKEbqiDFdgkXV4Uund7ZwKTX Processed in progress for 1ms   Chunks:(✔))
65 8EvoAeCrdXGVPLjaWKAJbkbWaKHfrWTbsrcf96ThmjaL Processed in progress for 1ms   Chunks:(✔))
64 3XT5PHQfWCzrz8dimry1EyXCEaR3XCmqZsXgTpUDP3UQ Processed in progress for 0ms   Chunks:(✔))
63 CkQQfCNav3gd29uy5v7DrHVcXt9ZCWjYiK9R4FW8fVXy Processed in progress for 0ms   Chunks:(✔))
62 9C21sdAU2wdsnG431LmjBuKMvWBhtmQBbDkGsAnBhitJ Processed in progress for 1ms   Chunks:(✔))
61 31fmvseLVDVjVGvAykRHUu2qyKfid8ESdFguHArTxWz7 Processed in progress for 0ms   Chunks:(✔))
60 6Wr8CMEJTvAGHCDTZQmftnkL3fHrzJnGuNQHTkEj7zDE Processed in progress for 1ms   Chunks:(✔))
59 28unnkSU2Z5m1LDebTXgRDsccE65SzvTbbjvtZxwoeUY Processed in progress for 1ms   Chunks:(✔))
58 7sTbpzdjoELUTpxqKUw6BXHf6TY4ArUsPaB4cEW6zMFV Processed in progress for 2ms   Chunks:(✔))
57 CY7UCRtbmruuQSocibMJJS8Y6tHdj2R5hdbX4X89bXrp Processed in progress for 1ms   Chunks:(✔))
56 G2UmBvAMTwpGxLXqAip2RraxKBkv1Hh1uaUyR4dy5TLh Processed in progress for 1ms   Chunks:(✔))
55 8BN7oJMUzqW3vFyzTok1Uona83Eix7MqAxGNvr9VzbSi Processed in progress for 1ms   Chunks:(✔))
54 AGgPXJV2qpKELBTGcGqZsDKfrMiV3NbiiDR5QzwFk8Ag Processed in progress for 0ms   Chunks:(✔))
53 G4x424in1Frov1aUiQn9vzLrmw56sNTzZ52qwefxyTrf Processed in progress for 0ms   Chunks:(✔))
52 EAzANTvJEYSm55ybdfpXga7h2WVsxMVonfYykj9W5vTt Processed in progress for 1ms   Chunks:(✔))
51 22PYbwgx1HNqqbChr2jJdUmr1etWA7soxbQbSGy3yJnv Processed in progress for 1ms   Chunks:(✔))
50 4JMomcvQmTmnvY6GZCXXQbcY1Qz4Qco8bjD9JAUBKUYG Processed in progress for 1ms   Chunks:(✔))
49 BFWZSLkDmEv6LjvEakBj5EY4mudNzoykxBGEyDiQJNW1 Processed in progress for 2ms   Chunks:(✔))
48 ENN8fKHeGUwrNdiiPnvah7EBAarLmaty4eoXZ96ooBb1 Processed in progress for 1ms   Chunks:(✔))
47 EX9ud6HE1i24GY4hyCrzZiszUXALnXHUZCFoDqveBDkz Processed in progress for 2ms   Chunks:(✔))
46 DtgcVo61NQra5UNm7qpAdDWTMD4oo3dRvar2v3CF812b Processed in progress for 1ms   Chunks:(✔))
45 8n8naKCZvPP2x5JKDKBaUM6vm1RGDF7wRtA1eEhkmRem Processed in progress for 1ms   Chunks:(✔))
44 DdyXa1NYX4nT9mUjZRyCBHJgbysMoQtttUgZw3aN63eq Processed in progress for 1ms   Chunks:(✔))
43 Hc1mfKjmjRLAVwBkGtNrEGkpugnG4wfwq1jfR2nBhuBf Processed in progress for 1ms   Chunks:(✔))
42 2zBr2TMY7Qoev9uKPye7v4dBzaH4L8iscbTCNFKYMmw6 Processed in progress for 1ms   Chunks:(✔))
41 7Edos24Zry4BUMrQ63KYrDBKhTqGToLdvwt8eVSAXc5k Processed in progress for 1ms   Chunks:(✔))
40 DzHpJQHKfHgm74C1wVCxGjxE149PfNJGZvPEjPkXXgBR Processed in progress for 2ms   Chunks:(✔))
39 2fHQFAZxUJa7HQCTecZJEp5qQ8DZ4NHk76bYKsu9xz63 Processed in progress for 1ms   Chunks:(✔))
38 g4Rj23gzp2WetE5AST9Rgf8kAGrEedmyeHZKT44xAfe Processed in progress for 1ms   Chunks:(✔))
37 Esq4j5bBcdmWLLXEWwDSMxRErpRTyKJkkbWywYbag7NU Processed in progress for 1ms   Chunks:(✔))
36 CTgvEAJBUaknMgZu67gLoHswUhNfntLXGBc4DUe8Qa7Z Processed in progress for 1ms   Chunks:(✔))
35 GXnkVoXjGgT5p8wo4vwA2UZFqdfXvRsmVu17g95bakKt Processed in progress for 0ms   Chunks:(✔))
34 FM4f4kUM4qj7Xmh4JecVxaXnRimdcnytLnkufVVujEMQ Processed in progress for 1ms   Chunks:(✔))
33 Hgu7sbkLh2rLD8xFsQEUoNXurxqB6UYANqB7461mUjR2 Processed in progress for 1ms   Chunks:(✔))
32 5juGQqxLTBB7LGmVM1ZTokPUEZ3MpydNBFmcHn1hPsaS Processed in progress for 1ms   Chunks:(✔))
31 3Gfb7Xzvd9t97tnrZNRyC7wfJGos85REUhynQ1FLyy6s Processed in progress for 0ms   Chunks:(✔))
Passed ✅ test_transfer_call_to_use_bike
✨  Done in 61.40s.
```

#### account_id のストレージの使用状況を表すデータ構造を取得するコマンド

`near view sub.dev-1660204085773-49134722844982 storage_balance_of '{"account_id": "'mashharuki.testnet'"}'`

```zsh
View call: sub.dev-1660204085773-49134722844982.storage_balance_of({"account_id": "mashharuki.testnet"})
{ total: '1250000000000000000000', available: '0' }
```

#### トークンを発行する

```zsh
near call sub23.mashharuki2.testnet new '{"owner_id": "'mashharuki2.testnet'", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "My First Token", "symbol": "MYFT", "decimals": 8 }}' --accountId mashharuki2.testnet
```

### トークンのやり取りを行うために受け取り側のアドレスを FT コントラクトに登録する

```zsh
 near call sub23.mashharuki2.testnet storage_deposit '' --accountId dev-1666503589999-87468235150551 --amount 0.00125
```

```zsh
near call sub23.mashharuki2.testnet ft_transfer '{"receiver_id": "dev-1666503589999-87468235150551", "amount": "19"}' --accountId mashharuki2.testnet --amount 0.000000000000000000000001
```

```zsh
near view sub23.mashharuki2.testnet ft_balance_of '{"account_id": "dev-1666503589999-87468235150551"}'
```

### 参考文献

1.  [Near Workspaces](https://github.com/near/workspaces-rs)
2.  [Gitpod](https://gitpod.io/workspaces)
3.  [Near Docs](https://docs.near.org/api/rpc/contracts)
4.  [NEP-141 Fungible Token](https://nomicon.io/Standards/Tokens/FungibleToken/Core#reference-level-explanation)
5.  [Storage Management](https://nomicon.io/Standards/StorageManagement)
