const crypto = require('crypto')

const algorithm = 'aes-256-cbc' // AESアルゴリズム[256ビット, CBCモード：Cipher Block Chaining mode (暗号ブロック連鎖モード)]
const password = "";
const salt = ''
const iv = Buffer.from("")

/**
 * 暗号化処理
 * password、salt、ivは事前に用意して下さい。
 * ・password、salt
 * 　32桁ランダム英数字記号
 * ・iv
 * 　16桁ランダム英数字
 * 
 * @param {*} data　暗号化文字列
 * @return {*} 
 */
const getDecipheredData = () => {
  console.log("---暗号化処理開始---");
  const data = process.argv[2];

  const inputEncoding = 'utf8'
  const outputEncoding = 'hex' // hexadecimal(16進数)

  const key = crypto.scryptSync(password, salt, 32)
  const cipher = crypto.createCipheriv(algorithm, key, iv)      // 暗号化用インスタンス
  const decipher = crypto.createDecipheriv(algorithm, key, iv)  // 復号用インスタンス

  // 暗号化
  let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
  cipheredData += cipher.final(outputEncoding)
  console.log(`「${data}」を暗号化\n→ ${cipheredData}\n`)
  // 復号
  let decipheredData = decipher.update(cipheredData, outputEncoding, inputEncoding)
  decipheredData += decipher.final(inputEncoding)
  console.log(`「${cipheredData}」を復号\n→ ${decipheredData}\n`)

  console.log("---暗号化処理終了---");
}

getDecipheredData();