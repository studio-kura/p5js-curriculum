## Token ID

IDが大きすぎる整数で普通のintに入らないので、JavaScriptで用意されているBigIntクラスを使います。BigIntに渡すのは文字列になった数値です。文字列ならfloatみたいに概数にならなくて安心です。（概数にされたら、一致しなくなるのでIDの意味が無くなります。）

```js
// OpenSea URL:
// https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/66944570731711987735845020825364593806926065595037873500763412727051124211713
// Token IDはURLの最後の部分（最後のスラッシュから）
const tokenId = BigInt(
  "66944570731711987735845020825364593806926065595037873500763412727051124211713"
);
```

## TokenのJSONメタデータへのURI

OpenSeaのAPIを使ってJSONを取得するため、まずは目的地であるJSONへのアドレスを組み立てます。

このNFTのJSONが欲しいので、このNFTのToken IDを入れる必要があります。しかも、今回は整数であるToken IDを16進にして入れなければなりません。

```js
// できたJSONへのURI（HTML版）:
// https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/0x940148C721C7A0FF2F28668D56E52A8D3DD6832B000000000000080000000001
const tokenIdHex = "0x" + tokenId.toString(16);
const jsonUri = "https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/" +
    tokenIdHex +
    "?format=json"
```

## JSONを読み込む

loadJSON関数を使います。引数は:

1. 読み込みたいJSONドキュメントのURI
1. 帰ってきたJSONオブジェクトを処理する関数の名前

処理する関数は、自分で用意します。

```js
loadJSON(
  jsonUri,
  processJson // 読み込んだデータを処理する関数（下で定義）
);

const processJson = (data) => {
  console.log(data)
}
```

## OpenSeaで指定したLevelsプロパティを取得する

JSONを処理する関数で例のAttackなどのプロパティを取得したいですね。
しかし `data.traits` はオブジェクトの配列になっていて、その扱いに慣れていない方がいるかもしれないのでここで説明します。

その `data.traits` がこのようになっているかもしれません:

```json
[
    {
        "trait_type": "Attack",
        "value": "3",
        "display_type": null,
        "max_value": 5.0,
        "trait_count": 0,
        "order": null
    },
    {
        "trait_type": "Defense",
        "value": "3",
        "display_type": null,
        "max_value": 5.0,
        "trait_count": 0,
        "order": null
    }
]
```

今回興味あるのは各プロパティの名前となる `trait_type` と、その値となる `value` です。まずは `"Attack"` という `trait_type` をもつ配列の要素だけをフィルタリングしましょうか。

`data.traits` という配列の `filter` 関数を使います（全ての配列についている関数です）。

`filter` に渡す引数は、配列の各要素に適用される関数です。その関数が `true` と返した配列の要素のみ `filter` の返り値に含まれます。

```js
const processJson = (data) => {
  const attackTraits = data.traits.filter(
    (trait) => trait.trait_type == "Attack"
  );
  console.log(attackTraits);
};
```

この場合は、 `data.traits` の各要素の `trait_type` を `"Attack"` という文字列と比較して、それは `true` となればその要素は `filter` の返り値に含まれる仕組みです。返り値はこのようになるはずだと思います。

```json
[
    {
        "trait_type": "Attack",
        "value": "3",
        "display_type": null,
        "max_value": 5.0,
        "trait_count": 0,
        "order": null
    }
]
```

要注意なのは、 `true` と帰った要素が1つだけでも配列が返ってくることです。

今回は要素1つだけの配列になりましたが、空っぽの配列が返ってくることもあり得ますので、その可能性に備えたいと思います。下記ではやっと `3` とだけconsoleに出力されるはずだと思います。

```js
const processJson = (data) => {
  const attackTraits = data.traits.filter(
    (trait) => trait.trait_type == "Attack"
  );
  if (attackTraits.length > 0) console.log(attackTraits[0].value);
};
```

## ソースコード全面

[ソースコードは本家エディタで公開中です](https://editor.p5js.org/alecrem/sketches/PT95TLBn_)。
